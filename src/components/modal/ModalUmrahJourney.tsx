import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepId: number;
  title: string;
}

interface StepDetail {
  procedures: string[];
  doa: {
    arabic: string;
    latin: string;
    meaning: string;
  }[];
  tips: string[];
}

const stepDetails: Record<number, StepDetail> = {
  1: {
    procedures: [
      "Mandi besar (janabah) dan berwudhu dengan sempurna",
      "Mengenakan pakaian ihram (2 lembar kain putih tidak berjahit untuk pria)",
      "Berniat untuk umrah dengan hati yang ikhlas",
      "Membaca talbiyah hingga tiba di Makkah",
    ],
    doa: [
      {
        arabic: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
        latin: "Labbaika Allahumma umratan",
        meaning: "Ya Allah, aku penuhi panggilan-Mu untuk umrah",
      },
      {
        arabic:
          "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيْكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لاَ شَرِيْكَ لَكَ",
        latin:
          "Labbaika Allahumma labbaik, labbaika laa syariika laka labbaik, innal hamda wan ni'mata laka wal mulka laa syariika lak",
        meaning:
          "Aku penuhi panggilan-Mu ya Allah, aku penuhi panggilan-Mu. Aku penuhi panggilan-Mu, tidak ada sekutu bagi-Mu, aku penuhi panggilan-Mu. Sesungguhnya segala puji, nikmat, dan kerajaan adalah milik-Mu, tidak ada sekutu bagi-Mu",
      },
    ],
    tips: [
      "Gunakan sandal yang mudah dilepas dan dipakai",
      "Bawa pakaian ganti untuk setelah ihram",
      "Jangan gunakan wewangian atau sabun beraroma",
      "Hindari mencukur rambut atau memotong kuku",
    ],
  },
  2: {
    procedures: [
      "Mulai dari Hajar Aswad (sudut tenggara Ka'bah)",
      "Keliling Ka'bah berlawanan arah jarum jam sebanyak 7 kali",
      "Istilam (menyentuh/mencium) Hajar Aswad jika memungkinkan",
      "Berdoa sambil mengelilingi Ka'bah dengan khusyuk",
      "Shalat 2 rakaat di Maqam Ibrahim setelah selesai",
    ],
    doa: [
      {
        arabic: "بِسْمِ اللهِ وَاللهُ أَكْبَرُ",
        latin: "Bismillahi wallahu akbar",
        meaning: "Dengan nama Allah dan Allah Maha Besar",
      },
      {
        arabic:
          "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbana aatina fi dunya hasanatan wa fil akhirati hasanatan wa qina adzab an-naar",
        meaning:
          "Ya Tuhan kami, berikanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari siksa api neraka",
      },
    ],
    tips: [
      "Mulai dan akhiri setiap putaran di Hajar Aswad",
      "Jika tidak bisa menyentuh Hajar Aswad, cukup menghadap dan mengangkat tangan",
      "Berjalanlah dengan tenang, tidak perlu terburu-buru",
      "Perbanyak doa dan dzikir selama tawaf",
    ],
  },
  3: {
    procedures: [
      "Dimulai dari bukit Safa menuju Marwah",
      "Berjalan biasa dari Safa hingga tanda hijau pertama",
      "Berlari kecil (sa'i) antara dua tanda hijau",
      "Berjalan biasa lagi dari tanda hijau kedua hingga Marwah",
      "Ulangi hingga 7 kali (Safa-Marwah = 1 kali)",
      "Berakhir di bukit Marwah",
    ],
    doa: [
      {
        arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللهِ",
        latin: "Inna ash-shafa wal marwata min sya'a'irillah",
        meaning:
          "Sesungguhnya Safa dan Marwah adalah sebagian dari syiar-syiar Allah",
      },
      {
        arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ الْأَعَزُّ الْأَكْرَمُ",
        latin: "Rabbi ghfir warham wa antal a'azz al-akram",
        meaning:
          "Ya Tuhanku, ampunilah dan rahmatilah, dan Engkau adalah Yang Maha Mulia lagi Maha Pemurah",
      },
    ],
    tips: [
      "Sa'i hanya dilakukan di area yang ditandai dengan lampu hijau",
      "Wanita tidak perlu berlari kecil, cukup berjalan biasa",
      "Boleh minum air zamzam selama sa'i",
      "Berdoa dengan khusyuk, terutama di atas bukit Safa dan Marwah",
    ],
  },
  4: {
    procedures: [
      "Halq: Mencukur habis seluruh rambut kepala (untuk pria)",
      "Taqsir: Memotong rambut sepanjang 1 ruas jari (pria/wanita)",
      "Dilakukan setelah selesai sa'i",
      "Boleh dilakukan di Makkah atau Madinah",
      "Setelah ini, ihram telah selesai dan boleh berpakaian biasa",
    ],
    doa: [
      {
        arabic:
          "اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا وَذَنْبًا مَغْفُورًا وَسَعْيًا مَشْكُورًا",
        latin:
          "Allahumma aj'alhu hajjan mabruuran wa dzanban maghfuuran wa sa'yan masykuuran",
        meaning:
          "Ya Allah, jadikanlah ini haji yang mabrur, dosa yang diampuni, dan sa'i yang diterima",
      },
      {
        arabic:
          "الْحَمْدُ لِلَّهِ الَّذِي هَدَانِي لِهَذَا وَمَا كُنْتُ لِأَهْتَدِيَ لَوْلَا أَنْ هَدَانِيَ اللَّهُ",
        latin:
          "Alhamdulillahil ladzi hadani li hadza wa ma kuntu li ahtadiya lau laa an hadanillah",
        meaning:
          "Segala puji bagi Allah yang telah menunjukkan aku kepada ini, dan aku tidak akan mendapat petunjuk sekiranya Allah tidak menunjukkan aku",
      },
    ],
    tips: [
      "Pilih tempat yang bersih dan terpercaya",
      "Halq lebih utama daripada taqsir untuk pria",
      "Wanita cukup memotong ujung rambut sedikit saja",
      "Setelah ini boleh memakai wewangian dan pakaian berjahit",
    ],
  },
};

const ModalUmrahJourney: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  stepId,
  title,
}) => {
  const detail = stepDetails[stepId];

  if (!detail) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          >
            <div className="max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 rounded-t-xl border-b border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-black md:text-2xl">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1.5 transition-colors hover:bg-gray-100"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6 p-4">
                {/* Tata Cara */}
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-bold text-black">
                    <span className="mr-2 h-2 w-2 rounded-full bg-black"></span>
                    Tata Cara
                  </h3>
                  <div className="space-y-2">
                    {detail.procedures.map((procedure, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-gray-700">
                          {procedure}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doa-doa */}
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-bold text-black">
                    <span className="mr-2 h-2 w-2 rounded-full bg-black"></span>
                    Doa-doa
                  </h3>
                  <div className="space-y-4">
                    {detail.doa.map((doa, index) => (
                      <div key={index} className="rounded-lg bg-gray-50 p-4">
                        <div className="mb-3 text-right">
                          <p className="font-arabic text-lg leading-relaxed text-black">
                            {doa.arabic}
                          </p>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm leading-relaxed text-gray-700 italic">
                            {doa.latin}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs leading-relaxed text-gray-600">
                            <span className="font-medium text-black">
                              Artinya:
                            </span>{" "}
                            {doa.meaning}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="mb-3 flex items-center text-lg font-bold text-black">
                    <span className="mr-2 h-2 w-2 rounded-full bg-black"></span>
                    Tips Penting
                  </h3>
                  <div className="space-y-2">
                    {detail.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 rounded-lg bg-blue-50 p-2"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                        <p className="text-xs leading-relaxed text-gray-700">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="rounded-b-xl border-t border-gray-200 bg-gray-50 px-4 py-3">
                <p className="text-center text-xs text-gray-500">
                  Semoga Allah SWT menerima ibadah Umrah Anda
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalUmrahJourney;
