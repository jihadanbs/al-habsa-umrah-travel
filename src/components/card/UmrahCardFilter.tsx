import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaDownload,
  FaHotel,
  FaInstagram,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { FaPlaneCircleCheck } from "react-icons/fa6";
import { RiFilterLine } from "react-icons/ri";
import { toast, Toaster } from "sonner";
import DetailModal from "./DetailModal";

// Interface untuk data yang diterima dari controller
interface UmrahPackageData {
  0: string; // title
  1: string; // category name
  2: string; // airline name
  3: string; // airport name
  4: string; // airport code
  5: string; // formatted price
  6: string; // hotel makkah name
  7: string; // hotel madinah name
  8: string; // type name
  9: string; // formatted date
  10: string; // seat available text
  11: string; // image
  12: number; // raw price
  13: string; // hotel makkah city
  14: string; // hotel makkah rating
  15: string; // hotel makkah location
  16: string; // hotel makkah latitude
  17: string; // hotel makkah longitude
  18: string; // hotel makkah description
  19: string; // hotel madinah city
  20: string; // hotel madinah rating
  21: string; // hotel madinah location
  22: string; // hotel madinah latitude
  23: string; // hotel madinah longitude
  24: string; // hotel madinah description
  25: string; // airport location
  26: string; // airport latitude
  27: string; // airport longitude
  28: string; // airport description
  29: string; // airline link website
}

// Interface untuk data yang sudah diformat untuk tampilan
interface Property {
  id: number;
  title: string;
  builder: string;
  category: string;
  status: string;
  availability: string;
  image: string;
  harga: string;
  date: string;
  sisaSeat: string;
  priceValue: number;
  // Data lengkap untuk modal
  hotelMakkahData?: Hotel;
  hotelMadinahData?: Hotel;
  airportData?: Airport;
  airlineData?: Airline;
  // Nama untuk tampilan
  hotelMakkah: string;
  hotelMadinah: string;
  airport: string;
  airline: string;
}

// Interface untuk modal detail
interface Hotel {
  name: string;
  city: string;
  rating: string;
  location: string;
  latitude?: string;
  longitude?: string;
  description?: string;
}

interface Airport {
  name: string;
  code: string;
  location: string;
  latitude?: string;
  longitude?: string;
  description?: string;
}

interface Airline {
  name: string;
  link_website?: string;
}

interface FilterState {
  category: string;
  availability: string;
  airline: string;
  priceRange: {
    min: number;
    max: number;
  };
}

interface UmrahCardFilterProps {
  umrahPackages: UmrahPackageData[];
}

const UmrahCardFilter: React.FC<UmrahCardFilterProps> = ({ umrahPackages }) => {
  const [viewMode, setViewMode] = useState("grid");

  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    availability: "all",
    airline: "all",
    priceRange: { min: 0, max: 100000000 },
  });

  // Sorting state
  const [sortBy, setSortBy] = useState<string>("default");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(
    []
  );

  // State untuk data yang sudah diformat
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  // Share menu state
  const [showShareMenu, setShowShareMenu] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    if (umrahPackages && umrahPackages.length > 0) {
      const formattedData: Property[] = umrahPackages.map(
        (packageData, index) => {
          const availability = packageData[10].includes("Seat Tersedia")
            ? "Tersedia"
            : "Habis";

          return {
            id: index + 1,
            title: packageData[0],
            builder: packageData[8],
            category: packageData[1],
            status: "Unfurnished",
            availability: availability,
            image: packageData[11],
            harga: packageData[5],
            date: packageData[9],
            sisaSeat: packageData[10],
            hotelMakkah: packageData[6],
            hotelMadinah: packageData[7],
            airport: packageData[3],
            airline: packageData[2],
            priceValue: packageData[12],

            // Data lengkap untuk modal
            hotelMakkahData: {
              name: packageData[6],
              city: packageData[13],
              rating: packageData[14],
              location: packageData[15],
              latitude: packageData[16],
              longitude: packageData[17],
              description: packageData[18],
            },
            hotelMadinahData: {
              name: packageData[7],
              city: packageData[19],
              rating: packageData[20],
              location: packageData[21],
              latitude: packageData[22],
              longitude: packageData[23],
              description: packageData[24],
            },
            airportData: {
              name: packageData[3],
              code: packageData[4],
              location: packageData[25],
              latitude: packageData[26],
              longitude: packageData[27],
              description: packageData[28],
            },
            airlineData: {
              name: packageData[2],
              link_website: packageData[29],
            },
          };
        }
      );
      setAllProperties(formattedData);
    }
  }, [umrahPackages]);

  // Extract unique values for filter options
  const categoryOptions = [
    ...new Set(allProperties.map((item) => item.category)),
  ];
  const availabilityOptions = [
    ...new Set(allProperties.map((item) => item.availability)),
  ];
  const airlineOptions = [
    ...new Set(allProperties.map((item) => item.airline)),
  ];

  // Filter and sort function
  useEffect(() => {
    let result = [...allProperties];

    // Apply filters
    if (filters.category && filters.category !== "all") {
      result = result.filter((item) => item.category === filters.category);
    }

    if (filters.availability && filters.availability !== "all") {
      result = result.filter(
        (item) => item.availability === filters.availability
      );
    }

    if (filters.airline && filters.airline !== "all") {
      result = result.filter((item) => item.airline === filters.airline);
    }

    // Apply price range filter
    result = result.filter(
      (item) =>
        item.priceValue >= filters.priceRange.min &&
        item.priceValue <= filters.priceRange.max
    );

    // Apply sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === "date-asc") {
      result.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else if (sortBy === "date-desc") {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    setFilteredProperties(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, sortBy, allProperties]);

  // Calculate pagination
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setDisplayedProperties(
      filteredProperties.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [currentPage, itemsPerPage, filteredProperties]);

  // Handle filter changes
  const handleFilterChange = (
    filterName: keyof FilterState,
    value: string
  ): void => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle price range changes
  const handlePriceRangeChange = (type: "min" | "max", value: string): void => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: parseInt(value) || (type === "min" ? 0 : 100000000),
      },
    }));
  };

  // Handle reset filters
  const resetFilters = (): void => {
    setFilters({
      category: "all",
      availability: "all",
      airline: "all",
      priceRange: { min: 0, max: 100000000 },
    });
    setSortBy("default");
  };

  // Pagination controls
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Price formatter
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Toggle share menu
  const toggleShareMenu = (propertyId: number): void => {
    setShowShareMenu((prev) => ({ ...prev, [propertyId]: !prev[propertyId] }));
  };

  // Share handlers
  const websiteUrl = "https://alhabsa.com/umrah-packages";

  const generateShareText = (property: Property): string => {
    return (
      `🌟 Paket Umrah Terbaik!\n\n` +
      `🕌 ${property.title}\n` +
      `📅 Keberangkatan: ${property.date}\n` +
      `💰 Harga: ${property.harga}\n` +
      `🏨 Hotel Makkah: ${property.hotelMakkah}\n` +
      `🏨 Hotel Madinah: ${property.hotelMadinah}\n\n` +
      `🔗 Info lengkap & pendaftaran:\n${websiteUrl}`
    );
  };

  const shareToWhatsApp = (property: Property): void => {
    const text = generateShareText(property);
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
    toggleShareMenu(property.id);
  };

  const shareToInstagram = (property: Property): void => {
    const caption = generateShareText(property);
    navigator.clipboard
      .writeText(caption)
      .then(() => {
        toast.success(
          "Caption berhasil disalin! Buka Instagram dan tempelkan saat membuat postingan"
        );
      })
      .catch((err) => {
        toast.error("Gagal menyalin caption.");
        console.error("Error copying to clipboard", err);
      });
    toggleShareMenu(property.id);
  };

  const shareToTikTok = (property: Property): void => {
    const caption = generateShareText(property);
    navigator.clipboard
      .writeText(caption)
      .then(() => {
        toast.success(
          "Caption berhasil disalin! Buka TikTok dan tempelkan saat membuat postingan"
        );
      })
      .catch((err) => {
        toast.error("Gagal menyalin caption.");
        console.error("Error copying to clipboard", err);
      });
    toggleShareMenu(property.id);
  };

  const downloadImage = (property: Property): void => {
    const link = document.createElement("a");
    link.href = property.image;
    link.download = `${property.title.replace(/\s+/g, "_")}.jpg`; // Sanitize filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toggleShareMenu(property.id);
  };

  // Handle pesan sekarang
  const handlePesanSekarang = (property: Property): void => {
    const waAdminNumber = "6281329196100";
    const websiteUrl = "https://alhabsa.com/umrah-packages";
    const message = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Saya tertarik dengan paket Umrah berikut dari Alhabsa Tour & Travel:

- Paket: ${property.title}
- Tanggal Keberangkatan: ${property.date}
- Harga: ${property.harga}
- Hotel Makkah: ${property.hotelMakkah}
- Hotel Madinah: ${property.hotelMadinah}
- Maskapai: ${property.airline}

Mohon informasi lebih lanjut mengenai ketersediaan dan cara pendaftaran.
Jazakumullah Khairan Katsiran.

Info Lengkap Paket: ${websiteUrl} (Ref: ${property.id})
`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${waAdminNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "hotel" | "airport" | "airline" | null;
    data: Hotel | Airport | Airline | null;
  }>({ isOpen: false, type: null, data: null });

  const openModal = (
    type: "hotel" | "airport" | "airline",
    data: Hotel | Airport | Airline
  ) => {
    setModalState({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  const renderShareMenu = (property: Property) => (
    <div className="absolute top-full right-0 z-10 mt-1 w-40 rounded-lg bg-white shadow-lg">
      <ul className="py-1">
        <li>
          <button
            onClick={() => shareToWhatsApp(property)}
            className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaWhatsapp className="mr-2 h-4 w-4 text-green-500" /> WhatsApp
          </button>
        </li>
        <li>
          <button
            onClick={() => shareToInstagram(property)}
            className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaInstagram className="mr-2 h-4 w-4 text-pink-600" /> Instagram
          </button>
        </li>
        <li>
          <button
            onClick={() => shareToTikTok(property)}
            className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaTiktok className="mr-2 h-4 w-4 text-black" /> TikTok
          </button>
        </li>
        <li>
          <button
            onClick={() => downloadImage(property)}
            className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaDownload className="mr-2 h-4 w-4 text-blue-500" /> Download
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
            Paket Umrah Terbaik
          </h2>
          <p className="font-medium text-gray-600">
            Fasilitas lengkap & harga bersahabat
          </p>
        </div>
      </div>

      <Toaster position="top-right" richColors />

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        {/* Mobile Filter Toggle */}
        <div className="mb-4 lg:hidden">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex w-full items-center justify-center rounded-lg bg-[#222636] px-4 py-3 text-white"
          >
            <RiFilterLine className="mr-2" />
            {isFilterOpen ? "Tutup Filter" : "Buka Filter"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* Sidebar Filter - Desktop */}
          <div className="hidden w-80 flex-shrink-0 lg:block">
            <div className="sticky top-6 rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center text-lg font-semibold text-gray-800">
                  <RiFilterLine className="mr-2" /> Filter Paket
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-[#2E3650] hover:text-blue-800"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-6">
                {/* Kategori Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kategori
                  </label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      handleFilterChange("category", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categoryOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Ketersediaan
                  </label>
                  <Select
                    value={filters.availability}
                    onValueChange={(value) =>
                      handleFilterChange("availability", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      {availabilityOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Airline Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Maskapai
                  </label>
                  <Select
                    value={filters.airline}
                    onValueChange={(value) =>
                      handleFilterChange("airline", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Semua Maskapai" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Maskapai</SelectItem>
                      {airlineOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rentang Harga: {formatPrice(filters.priceRange.min)} -{" "}
                    {formatPrice(filters.priceRange.max)}
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Harga Minimum
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100000000"
                        step="500000"
                        value={filters.priceRange.min}
                        onChange={(e) =>
                          handlePriceRangeChange("min", e.target.value)
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-gray-500">
                        Harga Maksimum
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100000000"
                        step="500000"
                        value={filters.priceRange.max}
                        onChange={(e) =>
                          handlePriceRangeChange("max", e.target.value)
                        }
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {isFilterOpen && (
            <div className="mb-6 lg:hidden">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center text-lg font-semibold text-gray-800">
                    <RiFilterLine className="mr-2" /> Filter Paket
                  </h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-[#2E3650] hover:text-blue-800"
                  >
                    Reset
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Kategori Filter */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) =>
                        handleFilterChange("category", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Semua Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kategori</SelectItem>
                        {categoryOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Availability Filter */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Ketersediaan
                    </label>
                    <Select
                      value={filters.availability}
                      onValueChange={(value) =>
                        handleFilterChange("availability", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Semua Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        {availabilityOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Airline Filter */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Maskapai
                    </label>
                    <Select
                      value={filters.airline}
                      onValueChange={(value) =>
                        handleFilterChange("airline", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Semua Maskapai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Maskapai</SelectItem>
                        {airlineOptions.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Urutkan (Sort By) - untuk Mobile Filter Panel */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Urutkan:
                    </label>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Default" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-asc">
                          Harga: Rendah ke Tinggi
                        </SelectItem>
                        <SelectItem value="price-desc">
                          Harga: Tinggi ke Rendah
                        </SelectItem>
                        <SelectItem value="date-asc">
                          Tanggal: Terdekat
                        </SelectItem>
                        <SelectItem value="date-desc">
                          Tanggal: Terjauh
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Price Range Filter */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Rentang Harga: {formatPrice(filters.priceRange.min)} -{" "}
                      {formatPrice(filters.priceRange.max)}
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Harga Minimum
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100000000"
                          step="500000"
                          value={filters.priceRange.min}
                          onChange={(e) =>
                            handlePriceRangeChange("min", e.target.value)
                          }
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-gray-500">
                          Harga Maksimum
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100000000"
                          step="500000"
                          value={filters.priceRange.max}
                          onChange={(e) =>
                            handlePriceRangeChange("max", e.target.value)
                          }
                          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="min-w-0 flex-1">
            {/* Controls Bar - MODIFIED for layout and desktop sort */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                {" "}
                {/* flex-wrap dan gap-y untuk mobile */}
                {/* Grup Kiri: Tampilkan, Urutkan (Desktop), Jumlah Paket */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  {" "}
                  {/* flex-wrap dan gap-y untuk mobile */}
                  {/* Tampilkan */}
                  <div className="flex items-center gap-x-1">
                    <label className="text-sm whitespace-nowrap text-gray-600">
                      Tampilkan:
                    </label>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => setItemsPerPage(Number(value))}
                    >
                      <SelectTrigger className="w-auto min-w-[4rem] sm:min-w-[4.5rem]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Urutkan (Sort By) - HANYA untuk Desktop (sm ke atas) */}
                  <div className="hidden items-center gap-x-1 sm:flex">
                    <label className="text-sm whitespace-nowrap text-gray-600">
                      Urutkan:
                    </label>
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value)}
                    >
                      <SelectTrigger className="w-auto min-w-[8rem] md:min-w-[10rem]">
                        <SelectValue placeholder="Default" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="price-asc">
                          Harga: Rendah ke Tinggi
                        </SelectItem>
                        <SelectItem value="price-desc">
                          Harga: Tinggi ke Rendah
                        </SelectItem>
                        <SelectItem value="date-asc">
                          Tanggal: Terdekat
                        </SelectItem>
                        <SelectItem value="date-desc">
                          Tanggal: Terjauh
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Jumlah Paket */}
                  <p className="text-sm whitespace-nowrap text-gray-600">
                    {displayedProperties.length} dari{" "}
                    {filteredProperties.length} paket
                  </p>
                </div>
                {/* Grup Kanan: View Toggle (Grid/List) */}
                <div className="flex items-center rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-md p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-[#222636] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-md p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-[#222636] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Property Cards */}
            {displayedProperties.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {displayedProperties.map((property, index) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
                      viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                    }`}
                  >
                    {/* Header Card (Judul & Share) - Hanya untuk Grid View atau List View Mobile */}
                    <div
                      className={`flex items-center justify-between bg-[#222636] p-3 ${
                        viewMode === "list" ? "sm:hidden" : ""
                      }`}
                    >
                      <h3 className="truncate text-lg font-bold text-white">
                        {property.title}
                      </h3>
                      <div className="relative">
                        <button
                          onClick={() => toggleShareMenu(property.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#222636] text-white transition-colors duration-300"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        {showShareMenu[property.id] &&
                          renderShareMenu(property)}
                      </div>
                    </div>

                    {/* Image Section */}
                    <div
                      className={`relative ${
                        viewMode === "list"
                          ? "sm:w-80 sm:flex-shrink-0"
                          : "h-48"
                      } overflow-hidden`}
                    >
                      <div
                        onClick={() => setZoomImage(property.image)}
                        className="h-full cursor-zoom-in"
                      >
                        <img
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/img/no-image.jpg";
                          }}
                        />
                        {property.sisaSeat === "Seat Habis" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <span className="text-xl font-bold text-white">
                              S O L D
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 left-3 rounded-full bg-white px-2 py-1 shadow-sm">
                        <span className="text-xs font-semibold text-[#2E3650]">
                          {property.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div
                      className={`flex-1 p-4 ${
                        viewMode === "list" ? "flex flex-col" : ""
                      }`}
                    >
                      {/* Title & Share for List View when Dark Header is hidden (desktop) or for alternative mobile list title */}
                      {viewMode === "list" && (
                        <>
                          {/* Desktop List View Title & Share (Dark Header is hidden here) */}
                          <div className="mb-3 hidden items-start justify-between sm:flex">
                            <h3 className="text-xl font-bold text-gray-800">
                              {property.title}
                            </h3>
                            <div className="relative">
                              <button
                                onClick={() => toggleShareMenu(property.id)}
                                className="ml-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600"
                              >
                                <Share2 className="h-4 w-4" />
                              </button>
                              {showShareMenu[property.id] &&
                                renderShareMenu(property)}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Builder and Availability (Common for Grid Content and List Content) */}
                      <div
                        className={`mb-3 flex items-start justify-between ${
                          viewMode === "grid" && property.title && "pt-2"
                        } `}
                      >
                        <div>
                          <p className="text-sm text-gray-600">
                            {property.builder}
                          </p>
                          <span
                            className={`inline-block ${
                              property.availability === "Tersedia"
                                ? "bg-blue-100 text-[#2E3650]"
                                : "bg-red-100 text-red-800"
                            } mt-1 rounded px-2 py-1 text-xs font-semibold`}
                          >
                            {property.availability}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`mb-4 grid gap-3 ${
                          viewMode === "list"
                            ? "grid-cols-2 sm:grid-cols-3"
                            : "grid-cols-2"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 shrink-0 rounded-full bg-blue-100 p-2">
                            <FaCalendarAlt className="h-3 w-3 text-[#2E3650]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Tanggal</p>
                            <p className="truncate text-xs font-semibold">
                              {property.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-2 shrink-0 rounded-full bg-blue-100 p-2">
                            <FaPlaneCircleCheck className="h-3 w-3 text-[#2E3650]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Sisa Seat</p>
                            <p className="text-xs font-semibold">
                              {property.sisaSeat}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex cursor-pointer items-center"
                          onClick={() =>
                            property.hotelMakkahData &&
                            openModal("hotel", property.hotelMakkahData)
                          }
                        >
                          <div className="mr-2 shrink-0 rounded-full bg-blue-100 p-2">
                            <FaHotel className="h-3 w-3 text-[#2E3650]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">
                              Hotel Makkah
                            </p>
                            <p className="truncate text-xs font-semibold hover:underline">
                              {property.hotelMakkah}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex cursor-pointer items-center"
                          onClick={() =>
                            property.hotelMadinahData &&
                            openModal("hotel", property.hotelMadinahData)
                          }
                        >
                          <div className="mr-2 shrink-0 rounded-full bg-blue-100 p-2">
                            <FaHotel className="h-3 w-3 text-[#2E3650]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">
                              Hotel Madinah
                            </p>
                            <p className="truncate text-xs font-semibold hover:underline">
                              {property.hotelMadinah}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex cursor-pointer items-center"
                          onClick={() =>
                            property.airportData &&
                            openModal("airport", property.airportData)
                          }
                        >
                          <div className="mr-2 shrink-0 rounded-full bg-blue-100 p-2">
                            <FaMapMarkerAlt className="h-3 w-3 text-[#2E3650]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Bandara</p>
                            <p className="truncate text-xs font-semibold hover:underline">
                              {property.airport}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex cursor-pointer items-center"
                          onClick={() =>
                            property.airlineData &&
                            openModal("airline", property.airlineData)
                          }
                        >
                          <div className="mr-2 shrink-0 rounded-full bg-blue-100 p-2">
                            <FaPlaneDeparture className="h-3 w-3 text-[#2E3650]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Maskapai</p>
                            <p className="truncate text-xs font-semibold hover:underline">
                              {property.airline}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${viewMode === "list" ? "mt-auto" : ""}`}
                      >
                        <div
                          className={`mb-3 rounded-lg bg-gray-50 p-3 ${
                            viewMode === "list"
                              ? "flex items-center justify-between"
                              : "text-center"
                          }`}
                        >
                          <div>
                            <p className="text-sm text-gray-500">
                              Harga mulai dari
                            </p>
                            <p className="text-xl font-bold text-rose-500">
                              {property.harga}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handlePesanSekarang(property)} // IMPLEMENTED
                          className={`w-full rounded-lg px-4 py-2 font-medium transition-colors duration-300 ${
                            property.sisaSeat === "Seat Habis"
                              ? "cursor-not-allowed bg-gray-400 text-white opacity-70"
                              : "bg-[#222636] text-white hover:bg-[#2E3650]"
                          }`}
                          disabled={property.sisaSeat === "Seat Habis"}
                        >
                          {property.sisaSeat === "Seat Habis"
                            ? "Seat Habis"
                            : "Pesan Sekarang"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="mb-4 text-lg text-gray-500">
                  Tidak ada paket umrah yang sesuai dengan filter yang dipilih.
                </p>
                <button
                  onClick={resetFilters}
                  className="rounded-lg bg-[#2E3650] px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-[#2a3d66]"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-center text-sm text-gray-700 sm:text-left">
                  Menampilkan{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  hingga{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredProperties.length
                    )}
                  </span>{" "}
                  dari{" "}
                  <span className="font-medium">
                    {filteredProperties.length}
                  </span>{" "}
                  data
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`rounded-lg px-3 py-2 ${
                              currentPage === page
                                ? "bg-[#222636] text-white"
                                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        (page === currentPage - 3 && currentPage > 3) ||
                        (page === currentPage + 3 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <span key={page} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }
                  )}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Modal - Perbaikan Error TypeScript dengan Conditional Render */}
            {modalState.isOpen && modalState.type && modalState.data && (
              <DetailModal
                isOpen={true}
                onClose={closeModal}
                type={modalState.type}
                data={modalState.data}
              />
            )}

            {/* Image Zoom Modal */}
            {zoomImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative">
                  <img
                    src={zoomImage}
                    alt="Preview"
                    className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
                  />
                  <button
                    onClick={() => setZoomImage(null)}
                    className="absolute top-2 right-2 rounded-full bg-white p-1 shadow transition hover:bg-gray-100"
                    aria-label="Tutup Zoom"
                  >
                    ❌
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmrahCardFilter;
