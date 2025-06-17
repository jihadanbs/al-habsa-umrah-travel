import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faHeart,
  faHome,
  faList,
  faClipboardList,
  faBalanceScale,
  faStar,
  faPaperPlane,
  faCircleInfo,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const stepsTop = [
  {
    icon: (
      <span className="fa-layers fa-fw relative text-2xl md:text-4xl">
        <FontAwesomeIcon icon={faGlobe} />
        <FontAwesomeIcon icon={faHeart} transform="shrink-8 up-6 right-6" />
      </span>
    ),
    step: "01",
    label: "BUKA WEBSITE AL HABSA",
  },
  {
    icon: <FontAwesomeIcon icon={faHome} className="text-2xl md:text-4xl" />,
    step: "02",
    label: "JELAJAHI HALAMAN UTAMA",
  },
  {
    icon: <FontAwesomeIcon icon={faList} className="text-2xl md:text-4xl" />,
    step: "03",
    label: "MASUK KE DAFTAR PAKET UMRAH",
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faClipboardList}
        className="text-2xl md:text-4xl"
      />
    ),
    step: "04",
    label: "LIHAT OPSI PAKET YANG TERSEDIA",
  },
  {
    icon: (
      <span className="fa-layers fa-fw relative text-2xl md:text-4xl">
        <FontAwesomeIcon icon={faBalanceScale} />
        <FontAwesomeIcon icon={faHeart} transform="shrink-8 up-6 right-6" />
      </span>
    ),
    step: "05",
    label: "BANDINGKAN FASILITAS DAN JADWAL",
  },
];

const stepsBottom = [
  {
    icon: (
      <span className="fa-layers fa-fw relative text-2xl md:text-4xl">
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faHeart} transform="shrink-8 up-6 right-6" />
      </span>
    ),
    step: "06",
    label: "PILIH PAKET YANG SESUAI",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faPaperPlane} className="text-2xl md:text-4xl" />
    ),
    step: "07",
    label: "KLIK TOMBOL PESAN",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faWhatsapp} className="text-2xl md:text-4xl" />
    ),
    step: "08",
    label: "PESAN OTOMATIS KE WHATSAPP",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faCircleInfo} className="text-2xl md:text-4xl" />
    ),
    step: "09",
    label: "TERIMA BALASAN DAN\nINFO LENGKAP",
  },
  {
    icon: (
      <span className="fa-layers fa-fw text-2xl md:text-4xl">
        <FontAwesomeIcon icon={faCheckCircle} />
        <FontAwesomeIcon icon={faHeart} transform="shrink-8 up-6 right-6" />
      </span>
    ),
    step: "10",
    label: "LANJUTKAN PEMESANAN",
  },
];

const ProcessSteps = () => {
  // Gabungkan semua steps untuk mobile (vertikal) dengan urutan yang benar
  const allSteps = [...stepsTop, ...stepsBottom];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#222636] via-[#22292f] to-[#222636] p-4">
      <div className="relative w-full max-w-[1200px]">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Connecting Lines dengan animasi mengular */}
          {/* Line horizontal atas (kiri ke kanan) */}
          <motion.div
            className="absolute top-[12px] right-[115px] left-[120px] z-10 h-[1.5px] bg-white"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Curve melengkung dari atas ke bawah */}
          <motion.svg
            className="pointer-events-none absolute z-10"
            style={{
              top: "8px",
              right: "-55px",
              width: "173px",
              height: "350px",
            }}
            viewBox="0 0 172 340"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,1c94.5,0,170.9,72.3,170.9,162.8c0,90.5-76.3,163.8-170.9,163.8"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 2.5 }}
            />
          </motion.svg>

          {/* Line horizontal bawah (kanan ke kiri) */}
          <motion.div
            className="absolute right-[115px] left-[120px] z-10 h-[1.5px] bg-white"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 4.5 }}
            style={{ transformOrigin: "right", top: "calc(100% - 240px)" }}
          />

          {/* Top Row - Desktop */}
          <div className="relative z-30 flex items-start justify-between px-8">
            {stepsTop.map((item, idx) => (
              <motion.div
                className="relative flex flex-col items-center"
                key={idx}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: idx * 0.5,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="dot z-20 h-5 w-5 shrink-0 rounded-full border border-white bg-white shadow-[0_0_12px_4px_rgba(191,163,111,0.5)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: idx * 0.5 + 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.2 }}
                />

                <motion.div
                  className="mt-8 flex w-[180px] cursor-pointer flex-col items-center gap-4 rounded-md border border-white py-8 text-center text-white"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(191, 163, 111, 0.3)",
                    borderColor: "#fff",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-3xl font-semibold">{item.step}</div>
                  <div className="text-xs leading-tight tracking-wide whitespace-pre-line">
                    {item.label}
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-8 h-1 w-full rounded bg-gradient-to-r from-white to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: idx * 0.5 + 0.8, duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - Desktop */}
          <div className="relative z-30 mt-18 flex items-start justify-between px-8">
            {[...stepsBottom].reverse().map((item, idx) => (
              <motion.div
                className="relative flex flex-col items-center"
                key={idx}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 4.2 + (stepsBottom.length - 1 - idx) * 0.2,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="dot z-20 h-5 w-5 shrink-0 rounded-full border border-white bg-white shadow-[0_0_12px_6px_rgba(191,163,111,0.4)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: 4.2 + (stepsBottom.length - 1 - idx) * 0.2,
                  }}
                  whileHover={{ scale: 1.2 }}
                />

                <motion.div
                  className="mt-8 flex w-[180px] cursor-pointer flex-col items-center gap-4 rounded-md border border-white py-8 text-center text-white"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(191, 163, 111, 0.3)",
                    borderColor: "#fff",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="text-3xl font-semibold">{item.step}</div>
                  <div className="text-xs leading-tight tracking-wide whitespace-pre-line">
                    {item.label}
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-8 h-1 w-full rounded bg-gradient-to-l from-white to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 5 + idx * 0.5 + 0.8, duration: 0.5 }}
                  style={{ transformOrigin: "right" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          {/* Vertical connecting line untuk mobile */}
          <motion.div
            className="absolute top-0 bottom-0 left-1/2 z-10 w-[1.5px] -translate-x-1/2 transform bg-white"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 3, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Mobile Steps - Vertikal */}
          <div className="relative z-30 flex flex-col items-center space-y-8 px-4 py-8">
            {allSteps.map((item, idx) => (
              <motion.div
                className="relative flex w-full items-center"
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Layout kiri-kanan bergantian */}
                <div
                  className={`flex w-full items-center ${
                    idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <motion.div
                    className="flex w-[140px] cursor-pointer flex-col items-center gap-2 rounded-md border border-white px-3 py-4 text-center text-white"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(191, 163, 111, 0.3)",
                      borderColor: "#fff",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="text-xl font-semibold">{item.step}</div>
                    <div className="text-[10px] leading-tight tracking-wide whitespace-pre-line">
                      {item.label}
                    </div>
                  </motion.div>

                  {/* Spacer untuk dot di tengah */}
                  <div className="flex flex-1 justify-center">
                    <motion.div
                      className="dot z-20 h-4 w-4 rounded-full border-2 border-white bg-white shadow-[0_0_10px_3px_rgba(191,163,111,0.5)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: idx * 0.2 + 0.3, duration: 0.3 }}
                      whileHover={{ scale: 1.3 }}
                    />
                  </div>

                  {/* Spacer untuk balance layout */}
                  <div className="w-[140px]"></div>
                </div>

                {/* Progress indicator samping */}
                <motion.div
                  className={`absolute top-1/2 h-0.5 w-16 rounded ${
                    idx % 2 === 0
                      ? "left-[140px] bg-gradient-to-r from-white to-transparent"
                      : "right-[140px] bg-gradient-to-l from-white to-transparent"
                  }`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: idx * 0.2 + 0.6, duration: 0.4 }}
                  style={{ transformOrigin: idx % 2 === 0 ? "left" : "right" }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating particles untuk efek tambahan */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
