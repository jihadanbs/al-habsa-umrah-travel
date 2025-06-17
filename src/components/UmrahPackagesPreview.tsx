import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuAsterisk } from "react-icons/lu";
import type { BookingPackageData } from "@/types";

interface UmrahPackagesPreviewProps {
  umrahPackages: BookingPackageData[];
}

export default function UmrahPackagesPreview({
  umrahPackages,
}: UmrahPackagesPreviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);
  const handlePesanSekarang = (umrahPackage: BookingPackageData) => {
    const phoneNumber = "6281329196100";
    const message = `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Saya tertarik dengan paket umrah yang Al Habsa tawarkan dan ingin mendapatkan informasi lebih lanjut mengenai:

📋 *Detail Paket:*
• Nama Paket: ${umrahPackage[0]}
• Kategori: ${umrahPackage[1]}
• Tanggal Keberangkatan: ${umrahPackage[9]}
• Harga: ${umrahPackage[5]}

✈️ *Detail Penerbangan:*
• Maskapai: ${umrahPackage[2]}
• Bandara: ${umrahPackage[3]}

🏨 *Detail Akomodasi:*
• Hotel Makkah: ${umrahPackage[6]}
• Hotel Madinah: ${umrahPackage[7]}

📊 *Ketersediaan:*
• ${umrahPackage[10]}

Mohon dapat dijelaskan lebih detail mengenai:
1. Fasilitas yang termasuk dalam paket
2. Rundown perjalanan ibadah umrah
3. Persyaratan dan dokumen yang diperlukan
4. Proses pembayaran dan cicilan (jika ada)

Terima kasih atas perhatian dan pelayanannya. Saya menunggu informasi lebih lanjut dari Bapak/Ibu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const cardsPerPage = isMobile ? 2 : 4;
  const maxPage = Math.ceil(umrahPackages.length / cardsPerPage) - 1;

  const scrollLeft = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollRight = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const visibleUmrahPackage = umrahPackages.slice(
    currentPage * cardsPerPage,
    Math.min(currentPage * cardsPerPage + cardsPerPage, umrahPackages.length)
  );

  if (!umrahPackages || umrahPackages.length === 0) {
    return (
      <main className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-start">
          <h2 className="text-2xl font-semibold whitespace-nowrap text-gray-900">
            Harga Spesial Untuk Paket Umrah
          </h2>
          <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
        </div>
        <div className="py-8 text-center">
          <p className="text-lg text-gray-500">
            Maaf, saat ini tidak ada paket umrah yang tersedia di Al Habsa.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Silakan cek kembali nanti atau hubungi kami untuk informasi lebih
            lanjut.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-start">
        <h2 className="text-2xl font-semibold whitespace-nowrap text-gray-900">
          Harga Spesial Untuk Paket Umrah
        </h2>
        <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
      </div>

      <div className="relative">
        {!isMobile && currentPage > 0 && (
          <button
            aria-label="Scroll left"
            className="absolute top-1/3 -left-5 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#222636] text-white hover:bg-[#2E3650] focus:outline-none"
            onClick={scrollLeft}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <div
          className={`grid ${
            isMobile ? "grid-cols-2" : "grid-cols-4"
          } gap-4 md:gap-6`}
        >
          {visibleUmrahPackage.map((umrahPackage, index) => (
            <article
              key={`package-${index}-${umrahPackage[0]}`} // Menggunakan kombinasi index dan nama paket sebagai key
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-md">
                <img
                  alt={`Package Umrah image for ${umrahPackage[0]}`} // index 0 untuk namaPaket
                  className="h-48 w-full rounded-2xl object-cover md:h-64"
                  src={umrahPackage[11]} // index 11 untuk image
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/img/no-image.jpg";
                  }}
                />
                <span
                  className="absolute top-3 left-3 rounded-full bg-black/30 px-2 py-1 font-medium text-white md:px-3 md:py-1"
                  style={{ fontSize: "10px" }}
                >
                  {umrahPackage[1]} {/* index 1 untuk paket */}
                </span>

                <div
                  className={`absolute inset-0 flex flex-col justify-between rounded-2xl bg-[#222636]/90 p-3 text-white transition-transform duration-300 ease-in-out md:p-4 ${
                    hoveredIndex === index
                      ? "translate-y-0"
                      : "translate-y-full"
                  }`}
                >
                  <div>
                    {isMobile ? (
                      <h4 className="mb-2 text-[10px] font-bold">
                        {umrahPackage[8]} | {umrahPackage[9]}{" "}
                        {/* tipePaket | tanggal */}
                      </h4>
                    ) : (
                      <h4 className="mb-2 text-base font-bold">
                        {umrahPackage[8]} | {umrahPackage[9]}{" "}
                        {/* tipePaket | tanggal */}
                      </h4>
                    )}

                    {isMobile ? (
                      <>
                        <p className="mb-2 text-[10px]">
                          {umrahPackage[3].length > 30 // airport
                            ? `${umrahPackage[3].substring(0, 30)}...`
                            : umrahPackage[3]}{" "}
                          ({umrahPackage[4]}) {/* codeAirport */}
                        </p>

                        <div className="my-2 border-t border-white/80"></div>

                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
                          <div className="text-[10px] text-gray-300">
                            Sisa Seat
                          </div>
                          <div className="text-[10px] font-semibold">
                            {umrahPackage[10].replace(" Tersedia", "")}{" "}
                            {/* sisaSeat */}
                          </div>

                          <div className="text-[10px] text-gray-300">
                            Hotel Makkah
                          </div>
                          <div className="text-[10px] leading-tight font-semibold">
                            {umrahPackage[6].length > 20 // hotelMakkah
                              ? `${umrahPackage[6].substring(0, 20)}...`
                              : umrahPackage[6]}
                          </div>

                          <div className="text-[10px] text-gray-300">
                            Hotel Madinah
                          </div>
                          <div className="text-[10px] leading-tight font-semibold">
                            {umrahPackage[7].length > 20 // hotelMadinah
                              ? `${umrahPackage[7].substring(0, 20)}...`
                              : umrahPackage[7]}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-3 text-xs">
                          {umrahPackage[3]} ({umrahPackage[4]})
                        </p>{" "}
                        {/* airport (codeAirport) */}
                        <div className="my-2 border-t border-white/80"></div>
                        <div className="grid grid-cols-2 gap-y-2 text-xs">
                          <div className="text-gray-300">Sisa Seat</div>
                          <div className="font-semibold">
                            {umrahPackage[10]}
                          </div>{" "}
                          {/* sisaSeat */}
                          <div className="text-gray-300">Hotel Makkah</div>
                          <div className="font-semibold">
                            {umrahPackage[6].length > 25 // hotelMakkah
                              ? `${umrahPackage[6].substring(0, 25)}...`
                              : umrahPackage[6]}
                          </div>
                          <div className="text-gray-300">Hotel Madinah</div>
                          <div className="font-semibold">
                            {umrahPackage[7].length > 25 // hotelMadinah
                              ? `${umrahPackage[7].substring(0, 25)}...`
                              : umrahPackage[7]}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handlePesanSekarang(umrahPackage)}
                    className={`rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#222636] transition-colors hover:bg-gray-100 md:px-4 md:py-2 md:text-sm ${
                      isMobile ? "mt-2" : "mt-4"
                    }`}
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-base leading-tight font-semibold text-gray-900 md:mt-4 md:text-lg md:leading-5">
                {umrahPackage[0]} {/* namaPaket */}
              </h3>
              <p className="mt-1 text-xs text-gray-500 md:mt-2 md:text-sm">
                {umrahPackage[2]} {/* airline */}
              </p>
              <p className="md:text-md mt-1 flex items-center text-sm font-semibold text-[#2E3650] md:mt-2">
                {umrahPackage[5]}
                <LuAsterisk className="text-md" /> {/* price */}
              </p>
            </article>
          ))}
        </div>

        {!isMobile && currentPage < maxPage && (
          <button
            aria-label="Scroll right"
            className="absolute top-1/3 -right-5 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#222636] text-white hover:bg-[#2E3650] focus:outline-none"
            onClick={scrollRight}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        <p className="mt-4 text-left text-xs text-gray-500">
          *Syarat dan ketentuan berlaku
        </p>

        {isMobile && maxPage > 0 && (
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: maxPage + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                aria-label={`Halaman ${index + 1}`}
                className={`h-3 w-3 rounded-full ${
                  currentPage === index ? "bg-[#222636]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/umrah-packages"
          className="rounded-md bg-[#222636] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E3650] focus:outline-none"
          type="button"
        >
          LEBIH BANYAK
        </Link>
      </div>
    </main>
  );
}
