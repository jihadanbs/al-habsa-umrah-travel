import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import ModalUmrahJourney from "../components/modal/ModalUmrahJourney";

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
}

interface UmrahJourneyProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "Ihram di Miqat",
    description:
      "Menuju Miqat yang telah ditentukan, ucapkan niat (Niyyah), dan masuk ke dalam keadaan suci Ihram dengan mengenakan pakaian yang sesuai.",
    imageSrc: "/img/perjalanan-umrah/01.png",
    altText: "Jamaah Umrah mengenakan pakaian Ihram di titik Miqat",
  },
  {
    id: 2,
    title: "Tawaf Qudum",
    description:
      "Setibanya di Makkah, laksanakan Tawaf Qudum (Tawaf Kedatangan) dengan mengelilingi Ka'bah Suci sebanyak tujuh kali dengan penuh khusyuk.",
    imageSrc: "/img/perjalanan-umrah/02.png",
    altText: "Jamaah Umrah melakukan Tawaf mengelilingi Ka'bah",
  },
  {
    id: 3,
    title: "Pelaksanaan Sa'i",
    description:
      "Lakukan Sa'i dengan berjalan dan berlari kecil sebanyak tujuh kali antara bukit Safa dan Marwah, mengenang pencarian air oleh Siti Hajar.",
    imageSrc: "/img/perjalanan-umrah/03.png",
    altText: "Jamaah Umrah melakukan Sa'i di area Mas'a",
  },
  {
    id: 4,
    title: "Halq atau Taqsir",
    description:
      "Selesaikan rangkaian Umrah Anda dengan melakukan Halq (mencukur habis rambut bagi pria) atau Taqsir (memotong sebagian rambut).",
    imageSrc: "/img/perjalanan-umrah/04.png",
    altText: "Seorang jamaah pria sedang melakukan Halq (cukur rambut)",
  },
];

// Varian animasi untuk setiap langkah
const stepVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Varian animasi untuk nomor
const numberVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.1,
    },
  },
};

// Varian animasi untuk konten teks
const contentVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

// Varian animasi untuk gambar
const imageVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

// Varian animasi untuk garis dan titik yang terpadu
const unifiedLineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.15,
    },
  },
};

const UmrahJourney: React.FC<UmrahJourneyProps> = ({ onModalStateChange }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    stepId: 0,
    title: "",
  });

  // Ini akan memberitahu komponen induk setiap kali modalState.isOpen berubah
  useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(modalState.isOpen);
    }
  }, [modalState.isOpen, onModalStateChange]);

  const handleTitleClick = (stepId: number, title: string) => {
    setModalState({
      isOpen: true,
      stepId,
      title,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      stepId: 0,
      title: "",
    });
  };

  return (
    <>
      <section className="overflow-hidden bg-white py-8 md:py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center md:mb-12"
          >
            <h2 className="mb-6 text-4xl font-bold text-black md:text-5xl lg:text-6xl">
              Perjalanan Umrah
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Pahami setiap rukun dan tahapan penting dalam ibadah Anda. Ikuti
              langkah-langkah berikut untuk menjalankan Umrah dengan sempurna.
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Garis Vertikal Tengah */}
            <div className="absolute top-0 bottom-0 left-1/2 z-0 hidden w-[2px] -translate-x-1/2 transform bg-gray-300 md:block"></div>

            {/* Journey Steps */}
            <div className="space-y-8 md:space-y-12 lg:space-y-16">
              {journeySteps.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={step.id}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative"
                  >
                    {/* Mobile Layout */}
                    <div className="space-y-6 md:hidden">
                      {/* Nomor */}
                      <motion.div
                        variants={numberVariants}
                        className="text-center"
                      >
                        <div className="text-5xl font-black text-black opacity-20">
                          {step.id.toString().padStart(2, "0")}
                        </div>
                      </motion.div>

                      {/* Gambar */}
                      <motion.div
                        variants={imageVariants}
                        className="flex justify-center"
                      >
                        <img
                          src={step.imageSrc}
                          alt={step.altText}
                          className="h-auto max-h-[250px] w-full max-w-sm object-cover"
                          loading="lazy"
                        />
                      </motion.div>

                      {/* Konten Teks */}
                      <motion.div
                        variants={contentVariants}
                        className="text-center"
                      >
                        <h3
                          className="mb-3 cursor-pointer text-2xl font-bold text-black underline transition-colors duration-200 hover:text-[#2E3650]"
                          onClick={() => handleTitleClick(step.id, step.title)}
                        >
                          {step.title}
                        </h3>
                        <p className="text-base leading-relaxed text-gray-600">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden items-center gap-8 md:grid md:grid-cols-12 lg:gap-12">
                      {isLeft ? (
                        <>
                          {/* Konten Kiri */}
                          <div className="relative col-span-5">
                            {/* Garis Horizontal sampai ke tengah */}
                            <motion.div
                              variants={unifiedLineVariants}
                              className="absolute top-8 right-0 z-10 h-[2px] w-full origin-left bg-black"
                            ></motion.div>

                            {/* Nomor di atas garis */}
                            <motion.div
                              variants={numberVariants}
                              className="absolute -top-6 right-4 text-4xl font-black text-black opacity-30 lg:text-5xl"
                            >
                              {step.id.toString().padStart(2, "0")}
                            </motion.div>

                            {/* Konten di bawah garis */}
                            <motion.div
                              variants={contentVariants}
                              className="pt-12 text-right"
                            >
                              <h3
                                className="mb-4 cursor-pointer text-2xl font-bold text-black transition-colors duration-200 hover:text-[#2E3650] hover:underline lg:text-3xl xl:text-4xl"
                                onClick={() =>
                                  handleTitleClick(step.id, step.title)
                                }
                              >
                                {step.title}
                              </h3>
                              <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                                {step.description}
                              </p>
                            </motion.div>
                          </div>

                          {/* Spacer untuk titik tengah */}
                          <div className="col-span-2 flex justify-center">
                            <motion.div
                              variants={unifiedLineVariants}
                              className="z-20 h-4 w-4 rounded-full border-2 border-black bg-white shadow-md"
                            ></motion.div>
                          </div>

                          {/* Gambar Kanan */}
                          <motion.div
                            variants={imageVariants}
                            className="col-span-5 flex justify-start"
                          >
                            <img
                              src={step.imageSrc}
                              alt={step.altText}
                              className="h-auto max-h-[300px] w-full max-w-md object-cover transition-transform duration-300 lg:max-h-[350px]"
                              loading="lazy"
                            />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          {/* Gambar Kiri */}
                          <motion.div
                            variants={imageVariants}
                            className="col-span-5 flex justify-end"
                          >
                            <img
                              src={step.imageSrc}
                              alt={step.altText}
                              className="h-auto max-h-[300px] w-full max-w-md object-cover transition-transform duration-300 lg:max-h-[350px]"
                              loading="lazy"
                            />
                          </motion.div>

                          {/* Spacer untuk titik tengah */}
                          <div className="col-span-2 flex justify-center">
                            <motion.div
                              variants={unifiedLineVariants}
                              className="z-20 h-4 w-4 rounded-full border-2 border-black bg-white shadow-md"
                            ></motion.div>
                          </div>

                          {/* Konten Kanan */}
                          <div className="relative col-span-5">
                            {/* Garis Horizontal sampai ke tengah */}
                            <motion.div
                              variants={unifiedLineVariants}
                              className="absolute top-8 left-0 z-10 h-[2px] w-full origin-right bg-black"
                            ></motion.div>

                            {/* Nomor di atas garis */}
                            <motion.div
                              variants={numberVariants}
                              className="absolute -top-6 left-4 text-4xl font-black text-black opacity-30 lg:text-5xl"
                            >
                              {step.id.toString().padStart(2, "0")}
                            </motion.div>

                            {/* Konten di bawah garis */}
                            <motion.div
                              variants={contentVariants}
                              className="pt-12 text-left"
                            >
                              <h3
                                className="mb-4 cursor-pointer text-2xl font-bold text-black transition-colors duration-200 hover:text-[#2E3650] hover:underline lg:text-3xl xl:text-4xl"
                                onClick={() =>
                                  handleTitleClick(step.id, step.title)
                                }
                              >
                                {step.title}
                              </h3>
                              <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
                                {step.description}
                              </p>
                            </motion.div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center md:mt-12"
          >
            <p className="mx-auto max-w-3xl text-lg text-gray-500 md:text-xl">
              Semoga perjalanan ibadah Umrah Anda diterima Allah SWT dan menjadi
              amal yang berkah.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <ModalUmrahJourney
        isOpen={modalState.isOpen}
        onClose={closeModal}
        stepId={modalState.stepId}
        title={modalState.title}
      />
    </>
  );
};

export default UmrahJourney;
