import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Calendar, Plane, Star, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../components/ui/animated-modal";

// Tipe data paket
type UmrahPackageData = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  number
];

// Definisikan tipe untuk props yang akan diterima komponen Book
interface BookProps {
  umrahPackages: UmrahPackageData[];
}

// Definisi konstanta untuk setiap indeks agar kode mudah dibaca
const TITLE_INDEX = 0;
const TYPE_INDEX = 8;
const DEPARTURE_FORMATTED_INDEX = 9;

// Helper untuk mengubah nama bulan Indonesia ke angka agar bisa diurutkan
const monthMap: { [key: string]: number } = {
  Januari: 0,
  Februari: 1,
  Maret: 2,
  April: 3,
  Mei: 4,
  Juni: 5,
  Juli: 6,
  Agustus: 7,
  September: 8,
  Oktober: 9,
  November: 10,
  Desember: 11,
};

// Definisi tipe untuk state penumpang
interface PassengersType {
  adults: number;
  children: number;
}

const Book: React.FC<BookProps> = ({ umrahPackages }) => {
  // State untuk form
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [passengers, setPassengers] = useState<PassengersType>({
    adults: 1,
    children: 0,
  });
  const [showPassengerDropdown, setShowPassengerDropdown] =
    useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px adalah breakpoint 'md' di Tailwind
    };
    // Cek saat komponen pertama kali dimuat
    checkScreenSize();
    // Tambahkan listener untuk event resize
    window.addEventListener("resize", checkScreenSize);
    // Hapus listener saat komponen di-unmount untuk mencegah memory leak
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Dapatkan jenis perjalanan unik (Umrah Reguler, Umrah Plus, dll) dari data
  const travelTypes = useMemo(() => {
    if (!umrahPackages) return [];
    const types = new Set(umrahPackages.map((pkg) => pkg[TYPE_INDEX]));
    return Array.from(types);
  }, [umrahPackages]);

  // Dapatkan bulan keberangkatan unik, lalu urutkan secara kronologis
  const availableMonths = useMemo(() => {
    // Jangan tampilkan apa-apa jika tipe belum dipilih
    if (!selectedType || !umrahPackages) return [];

    // Filter dulu paket berdasarkan tipe yang dipilih
    const packagesByType = umrahPackages.filter(
      (pkg) => pkg[TYPE_INDEX] === selectedType
    );

    const monthSet = new Set<string>();
    packagesByType.forEach((pkg) => {
      const dateParts = pkg[DEPARTURE_FORMATTED_INDEX].split(" ");
      const monthYear = `${dateParts[1]} ${dateParts[2]}`;
      monthSet.add(monthYear);
    });

    return Array.from(monthSet).sort((a, b) => {
      const [monthA, yearA] = a.split(" ");
      const [monthB, yearB] = b.split(" ");
      const dateA = new Date(parseInt(yearA), monthMap[monthA]);
      const dateB = new Date(parseInt(yearB), monthMap[monthB]);
      return dateA.getTime() - dateB.getTime();
    });
  }, [umrahPackages, selectedType]);

  // Dapatkan opsi judul paket berdasarkan jenis dan bulan yang dipilih
  const packageOptions = useMemo(() => {
    if (!selectedType || !selectedMonth || !umrahPackages) return [];
    return umrahPackages
      .filter((pkg) => {
        const dateParts = pkg[DEPARTURE_FORMATTED_INDEX].split(" ");
        const monthYear = `${dateParts[1]} ${dateParts[2]}`;
        return pkg[TYPE_INDEX] === selectedType && monthYear === selectedMonth;
      })
      .map((pkg) => pkg[TITLE_INDEX]);
  }, [selectedType, selectedMonth, umrahPackages]);

  // Efek untuk mereset pilihan
  useEffect(() => {
    // Reset bulan dan paket jika tipe berubah
    setSelectedMonth("");
    setSelectedPackage("");
  }, [selectedType]);

  useEffect(() => {
    // Reset paket jika bulan berubah
    setSelectedPackage("");
  }, [selectedMonth]);

  useEffect(() => {
    if (travelTypes.length > 0 && !selectedType) {
      setSelectedType(travelTypes[0]);
    }
  }, [travelTypes, selectedType]);

  // Validasi form
  const isFormValid = selectedType && selectedMonth && selectedPackage;

  // Fungsi untuk mengubah jumlah penumpang
  const updatePassengers = (
    type: keyof PassengersType,
    action: "increase" | "decrease"
  ): void => {
    setPassengers((prev) => {
      if (action === "increase") {
        return { ...prev, [type]: prev[type] + 1 };
      } else if (
        action === "decrease" &&
        prev[type] > (type === "adults" ? 1 : 0)
      ) {
        return { ...prev, [type]: prev[type] - 1 };
      }
      return prev;
    });
  };

  // Fungsi untuk mengirim pesan ke WhatsApp
  const sendToWhatsApp = (): void => {
    if (!isFormValid) {
      alert("Silakan lengkapi form terlebih dahulu");
      return;
    }
    const message = `*Permintaan Informasi Keberangkatan*

Assalamu'alaikum warahmatullahi wabarakatuh,

Bismillahirrahmanirrahim,

Saya ingin mengajukan permintaan informasi terkait perjalanan yang direncanakan sebagai berikut:

Jenis Perjalanan: ${selectedType}
Bulan Keberangkatan: ${selectedMonth}
Jenis Paket: ${selectedPackage}
Jumlah Penumpang: ${passengers.adults} Dewasa, ${passengers.children} Anak
${promoCode ? `Kode Promo: ${promoCode}` : ""}

Mohon kiranya dapat memberikan informasi lebih lanjut terkait ketersediaan dan harga untuk paket perjalanan ini. Jazakumullahu khairan atas perhatian dan bantuannya.

Wassalamu'alaikum warahmatullahi wabarakatuh.`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6281329196100";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const typeThreshold = isMobile ? 2 : 4;
  const shouldShowDropdownForType = travelTypes.length > typeThreshold;

  return (
    <div
      id="Book"
      className="relative z-20 mx-6 mt-[-170px] max-w-5xl rounded-sm bg-white p-4 shadow-md shadow-slate-500 md:p-6 lg:mx-auto"
    >
      <div className="mb-8 flex items-center justify-start">
        <h2 className="text-2xl font-semibold whitespace-nowrap text-gray-900">
          PEMESANAN
        </h2>
        <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
      </div>

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 font-medium">
          <Star className="h-4 w-4 text-gray-600" />
          <span className="text-sm md:text-base">Jenis Perjalanan</span>
        </label>
        {shouldShowDropdownForType ? (
          // Tampilan Dropdown jika item melebihi batas
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Jenis Perjalanan" />
            </SelectTrigger>
            <SelectContent>
              {travelTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          // Tampilan Radio Button jika item di bawah batas
          <RadioGroup
            value={selectedType}
            onValueChange={setSelectedType}
            className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2"
          >
            {travelTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={type}
                  id={type}
                  className="relative h-4 w-4 rounded-full border-2 border-gray-300 before:absolute before:inset-1 before:rounded-full before:bg-white before:opacity-0 before:content-[''] data-[state=checked]:border-[#222636] data-[state=checked]:bg-[#222636] data-[state=checked]:before:opacity-100"
                />
                <label
                  htmlFor={type}
                  className="cursor-pointer text-sm md:text-base"
                >
                  {type}
                </label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-1 md:col-span-1">
          <label className="mb-2 flex items-center gap-2 font-medium">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-sm md:text-base">Keberangkatan</span>
          </label>
          <Select
            value={selectedMonth}
            onValueChange={setSelectedMonth}
            disabled={!selectedType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Bulan" />
            </SelectTrigger>
            <SelectContent>
              {availableMonths.length > 0 ? (
                availableMonths.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-data" disabled>
                  Tidak Tersedia
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1 md:col-span-1">
          <label className="mb-2 flex items-center gap-2 font-medium">
            <Plane className="h-4 w-4 text-gray-600" />
            <span className="text-sm md:text-base">Jenis Paket</span>
          </label>
          <Select
            value={selectedPackage}
            onValueChange={setSelectedPackage}
            disabled={!selectedMonth}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Paket" />
            </SelectTrigger>
            <SelectContent>
              {packageOptions.length > 0 ? (
                packageOptions.map((pkgTitle) => (
                  <SelectItem key={pkgTitle} value={pkgTitle}>
                    {pkgTitle}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-data" disabled>
                  Tidak Tersedia
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="relative col-span-1 md:col-span-1">
          <label className="mb-2 flex items-center gap-2 font-medium">
            <Users className="h-4 w-4 text-gray-600" />
            <span className="text-sm md:text-base">Pax</span>
          </label>
          <div
            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            className="w-full cursor-pointer rounded border p-2 text-sm md:text-base"
          >
            {passengers.adults} Dewasa, {passengers.children} Anak
          </div>
          {showPassengerDropdown && (
            <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-lg border bg-white p-4 shadow-lg">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold md:text-base">
                      Dewasa
                    </h3>
                    <p className="text-xs text-gray-500 md:text-sm">
                      12 tahun ke atas
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers("adults", "decrease");
                      }}
                      disabled={passengers.adults <= 1}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        passengers.adults > 1
                          ? "bg-gray-200 text-black hover:bg-gray-300"
                          : "cursor-not-allowed bg-gray-100 text-gray-400"
                      }`}
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-sm">
                      {passengers.adults}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers("adults", "increase");
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222636] text-sm text-white hover:bg-[#2E3650]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold md:text-base">Anak</h3>
                    <p className="text-xs text-gray-500 md:text-sm">
                      Umur 2-11 tahun
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers("children", "decrease");
                      }}
                      disabled={passengers.children <= 0}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                        passengers.children > 0
                          ? "bg-gray-200 text-black hover:bg-gray-300"
                          : "cursor-not-allowed bg-gray-100 text-gray-400"
                      }`}
                    >
                      -
                    </button>
                    <span className="w-4 text-center text-sm">
                      {passengers.children}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers("children", "increase");
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222636] text-sm text-white hover:bg-[#2E3650]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex w-full flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex w-full items-center md:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-[#222636]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-[#222636] md:text-base">
              Tambahkan kode promo
            </span>
          </div>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Masukkan kode promo"
            className="w-full flex-grow rounded border p-2 text-sm md:w-auto md:text-base"
          />
          {isFormValid ? (
            <Modal>
              <ModalTrigger className="group/modal-btn flex cursor-pointer justify-center bg-black text-white dark:bg-white dark:text-black">
                <span className="text-center transition duration-500 group-hover/modal-btn:translate-x-50">
                  Cari Keberangkatan
                </span>
                <div className="absolute inset-0 z-20 flex -translate-x-40 items-center justify-center text-white transition duration-500 group-hover/modal-btn:translate-x-0">
                  ✈️
                </div>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <p className="text-sm md:text-base">
                    Apakah Anda yakin ingin mengirim permintaan ini?
                  </p>
                </ModalContent>
                <ModalFooter>
                  <button
                    onClick={sendToWhatsApp}
                    className="rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-green-600 md:text-base"
                  >
                    Kirim ke WhatsApp
                  </button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          ) : (
            <button
              className="flex cursor-not-allowed justify-center rounded bg-gray-400 px-4 py-2 text-sm text-white transition-all duration-300 md:text-base"
              disabled
              onClick={(e) => {
                e.preventDefault();
                alert("Silakan lengkapi form terlebih dahulu");
              }}
            >
              Lengkapi Form Dahulu
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-left text-xs text-gray-500">
        *Syarat dan ketentuan berlaku
      </p>
    </div>
  );
};

export default Book;
