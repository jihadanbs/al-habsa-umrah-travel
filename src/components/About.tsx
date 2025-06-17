import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div
      id="About"
      className="mx-auto max-w-6xl bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-24"
    >
      <div className="flex flex-col items-center justify-between gap-6 md:gap-8 lg:flex-row lg:gap-12">
        <div className="relative w-full lg:w-1/2">
          {/* Background dekoratif - Hide on mobile for cleaner look */}
          <div className="absolute top-1/2 -left-[60%] z-0 hidden h-[140%] w-[140%] -translate-y-1/2 transform sm:block sm:h-[140%] sm:w-[140%] lg:h-[160%] lg:w-[160%]">
            <img
              src="/img/brand-circles.png"
              alt="Dekorasi"
              className="h-full w-full translate-x-6 transform object-contain brightness-0 hue-rotate-[220deg] saturate-100 sepia filter sm:translate-x-0"
            />
          </div>

          {/* Gambar utama */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="transform overflow-hidden rounded-lg border border-gray-100 shadow-md transition-transform duration-300 hover:shadow-xl md:rounded-xl md:shadow-lg">
              <img
                src="/img/tentang-kami.jpg"
                alt="Kaabah at Masjidil Haram"
                className="h-auto w-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Bagian Kanan - Text Content */}
        <div className="mt-6 w-full lg:mt-0 lg:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 inline-block rounded-full bg-[#222636] px-3 py-1 text-xs font-medium text-white sm:text-sm">
              Tentang Kami
            </div>
            <h2 className="mb-3 text-2xl leading-tight font-bold text-gray-800 sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
              Memberikan Pelayanan Umrah Yang{" "}
              <span className="text-[#B49164] underline">Terbaik</span> Untuk
              Para Jamaah
            </h2>

            <div className="mt-4 space-y-3 text-gray-600 sm:mt-6 sm:space-y-4">
              <p className="text-md leading-relaxed sm:text-base md:text-lg">
                Berdiri sejak tahun 2019,{" "}
                <span className="font-semibold">PT. ALHABSA MABRURO TOUR</span>{" "}
                memiliki pengalaman di bidang pelayanan jasa Tour & Travel,
                khususnya di pelayanan jasa UMRAH. Kualitas pelayanan dan
                kepercayaan jamaah menjadi prioritas utama kami dari awal
                berdiri sampai saat ini, dan akan terus meningkatkan kualitas
                pelayanan.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <a
                href="/img/company-profile.pdf"
                download="Company Profile - Al Habsa.pdf"
                className="inline-flex transform items-center justify-center gap-2 rounded-lg bg-[#222636] px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#2E3650] hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="xs:inline hidden">Unduh Profile Al Habsa</span>
                <span className="xs:hidden">Unduh Profile</span>
              </a>
              <a
                href="/contact"
                className="inline-flex transform items-center justify-center gap-2 rounded-lg border border-[#222636] bg-white px-4 py-2.5 text-sm font-medium text-[#222636] shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-lg sm:px-6 sm:py-3 sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tambahan Fakta Singkat */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative mt-8 sm:mt-10 md:mt-12"
      >
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {/* Kartu fakta singkat */}
          <div className="rounded-lg border border-gray-100 bg-white p-3 text-center shadow-md sm:p-4 md:rounded-xl md:p-6">
            <div className="text-2xl font-bold text-[#222636] sm:text-3xl md:text-4xl">
              2019
            </div>
            <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm md:text-base">
              Tahun Berdiri
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-3 text-center shadow-md sm:p-4 md:rounded-xl md:p-6">
            <div className="text-2xl font-bold text-[#222636] sm:text-3xl md:text-4xl">
              1000+
            </div>
            <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm md:text-base">
              Jamaah Terlayani
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-3 text-center shadow-md sm:p-4 md:rounded-xl md:p-6">
            <div className="text-2xl font-bold text-[#222636] sm:text-3xl md:text-4xl">
              50+
            </div>
            <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm md:text-base">
              Mitra Kerjasama
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-3 text-center shadow-md sm:p-4 md:rounded-xl md:p-6">
            <div className="text-2xl font-bold text-[#222636] sm:text-3xl md:text-4xl">
              100%
            </div>
            <div className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm md:text-base">
              Kepuasan Jamaah
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
