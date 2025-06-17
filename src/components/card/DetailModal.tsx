import { Rating, Star } from "@smastrom/react-rating";
import {
  FaGlobe,
  FaHotel,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaStar,
  FaTimes,
} from "react-icons/fa";

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
  link_website?: string;
}

interface Airline {
  name: string;
  link_website?: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "hotel" | "airport" | "airline";
  data: Hotel | Airport | Airline | null;
}

// Definisi warna dan keterangan untuk setiap tingkat rating
const ratingLabels: { [key: number]: { label: string; color: string } } = {
  1: { label: "Buruk", color: "#FF5252" },
  2: { label: "Kurang", color: "#FF9800" },
  3: { label: "Cukup", color: "#FFC107" },
  4: { label: "Sangat Baik", color: "#8BC34A" },
  5: { label: "Luar Biasa", color: "#4CAF50" },
};

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  type,
  data,
}) => {
  if (!isOpen || !data) return null;

  const renderHotelContent = (hotel: Hotel) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-blue-100 p-3">
          <FaHotel className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
          <p className="text-gray-600">{hotel.city}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            <FaStar className="mr-2 h-4 w-4 text-yellow-500" />
            <span className="font-semibold">Rating</span>
          </div>
          <div className="text-gray-700">
            {hotel.rating ? (
              <div className="mt-1 flex flex-col space-y-1">
                {/* Tampilkan rating dalam bentuk bintang */}
                <Rating
                  style={{ maxWidth: 100 }}
                  value={parseFloat(hotel.rating) || 0}
                  itemStyles={{
                    itemShapes: Star,
                    activeFillColor:
                      ratingLabels[Math.round(parseFloat(hotel.rating) || 0)]
                        ?.color || "#FFC107",
                    inactiveFillColor: "#f0f0f0",
                  }}
                  readOnly={true}
                />

                {/* Tampilkan keterangan rating dengan warna sesuai */}
                <div className="flex items-center">
                  <div
                    className="mr-1 h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        ratingLabels[Math.round(parseFloat(hotel.rating) || 0)]
                          ?.color || "#FFC107",
                    }}
                  ></div>
                  <span className="text-xs">
                    {hotel.rating} -{" "}
                    {ratingLabels[Math.round(parseFloat(hotel.rating) || 0)]
                      ?.label || ""}
                  </span>
                </div>
              </div>
            ) : (
              <span style={{ color: "gray" }}>404 Not Found</span>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 h-4 w-4 text-red-500" />
            <span className="font-semibold">Lokasi</span>
          </div>
          <div className="text-gray-700 hover:underline">
            <a
              href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                hotel.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title={hotel.location}
              style={{ color: "black" }}
            >
              {hotel.location}
            </a>
          </div>
        </div>
      </div>

      {hotel.description && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold">Deskripsi</h4>
          <p className="text-gray-700">{hotel.description}</p>
        </div>
      )}

      {hotel.latitude && hotel.longitude && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold">Koordinat</h4>
          <p className="text-gray-700">
            Lat: {hotel.latitude}, Long: {hotel.longitude}
          </p>
        </div>
      )}
    </div>
  );

  const renderAirportContent = (airport: Airport) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-green-100 p-3">
          <FaMapMarkerAlt className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{airport.name}</h3>
          <p className="text-gray-600">Kode: ({airport.code})</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 h-4 w-4 text-red-500" />
            <span className="font-semibold">Lokasi</span>
          </div>
          <div className="text-gray-700 hover:underline">
            <a
              href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                airport.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title={airport.location}
              style={{ color: "black" }}
            >
              {airport.location}
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            <span className="font-semibold">Kode Bandara</span>
          </div>
          <p className="font-mono text-lg text-gray-700">({airport.code})</p>
        </div>
      </div>

      {airport.link_website && (
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            <FaGlobe className="mr-2 h-4 w-4 text-blue-500" />
            <span className="font-semibold">Website</span>
          </div>
          <a
            href={airport.link_website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            {airport.link_website}
          </a>
        </div>
      )}

      {airport.description && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold">Deskripsi</h4>
          <p className="text-gray-700">{airport.description}</p>
        </div>
      )}

      {airport.latitude && airport.longitude && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold">Koordinat</h4>
          <p className="text-gray-700">
            Lat: {airport.latitude}, Long: {airport.longitude}
          </p>
        </div>
      )}
    </div>
  );

  const renderAirlineContent = (airline: Airline) => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-purple-100 p-3">
          <FaPlaneDeparture className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{airline.name}</h3>
          <p className="text-gray-600">Maskapai Penerbangan</p>
        </div>
      </div>

      {airline.link_website && (
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center">
            <FaGlobe className="mr-2 h-4 w-4 text-blue-500" />
            <span className="font-semibold">Website</span>
          </div>
          <a
            href={airline.link_website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline"
          >
            {airline.link_website}
          </a>
        </div>
      )}

      <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 font-semibold">Informasi</h4>
        <p className="text-gray-700">
          {airline.name} adalah maskapai yang digunakan untuk penerbangan umrah
          ini. Pastikan untuk memeriksa persyaratan bagasi dan dokumen
          perjalanan yang diperlukan.
        </p>
      </div>
    </div>
  );

  const getTitle = () => {
    switch (type) {
      case "hotel":
        return "Detail Hotel";
      case "airport":
        return "Detail Bandara";
      case "airline":
        return "Detail Maskapai";
      default:
        return "Detail";
    }
  };

  return (
    <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-[#222636] p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <FaTimes className="h-5 w-5 text-[#222636]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === "hotel" && renderHotelContent(data as Hotel)}
          {type === "airport" && renderAirportContent(data as Airport)}
          {type === "airline" && renderAirlineContent(data as Airline)}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-6">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#222636] px-6 py-2 text-white transition-colors hover:bg-[#2E3650]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
