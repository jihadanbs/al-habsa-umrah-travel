import { Rating, Star } from "@smastrom/react-rating";
import {
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Hotel,
  Menu,
  MessageCircle,
  Moon,
  Plane,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface TabunganData {
  targetBiaya: number;
  tabunganAwal: number;
  tabunganBulanan: number;
  targetWaktu: number;
  jenisUmrah: string;
  perkiraanInflasi?: number;
}

interface HasilSimulasi {
  totalTabungan: number;
  waktuCapai: number;
  kekurangan: number;
  rekomendasi: string;
  jadwalTabungan: Array<{
    bulan: number;
    setoran: number;
    saldo: number;
    progress: number;
    tambahan: number;
    totalSetelahTambahan: number;
  }>;
  targetBiayaAkhir: number;
}

interface PaketUmrah {
  title: string;
  category: string;
  airline: string;
  airport: string;
  airportCode: string;
  price: string;
  rawPrice: number;
  hotelMakkah: string;
  hotelMadinah: string;
  type: string;
  departureDate: string;
  seatAvailable: string;
  image: string;
  hotelMakkahRating: string;
  hotelMadinahRating: string;
}

interface TabunganUmrahSimulatorProps {
  umrahPackages?: any[][];
}

const TabunganUmrahSimulator: React.FC<TabunganUmrahSimulatorProps> = ({
  umrahPackages = [],
}) => {
  const [activeTab, setActiveTab] = useState<"simulator" | "paket" | "tips">(
    "simulator"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<TabunganData>({
    targetBiaya: 30000000,
    tabunganAwal: 0,
    tabunganBulanan: 1000000,
    targetWaktu: 24,
    jenisUmrah: "reguler",
    perkiraanInflasi: 1.5,
  });
  const [hasil, setHasil] = useState<HasilSimulasi | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Convert backend data format to frontend format
  const paketUmrah: PaketUmrah[] = umrahPackages.map((pkg) => ({
    title: pkg[0] || "PAKET UMRAH",
    category: pkg[1] || "Paket Umrah Reguler",
    airline: pkg[2] || "Airline",
    airport: pkg[3] || "Airport",
    airportCode: pkg[4] || "Airport Code",
    price: pkg[5] || "IDR 0",
    rawPrice: pkg[12] || 0,
    hotelMakkah: pkg[6] || "Hotel Makkah",
    hotelMadinah: pkg[7] || "Hotel Madinah",
    type: pkg[8] || "Umrah Reguler",
    departureDate: pkg[9] || "",
    seatAvailable: pkg[10] || "0 Seat Tersedia",
    image: pkg[11] || "/img/no-image.jpg",
    hotelMakkahRating: pkg[14] || "4",
    hotelMadinahRating: pkg[20] || "4",
  }));

  // Filter paket berdasarkan budget hasil simulasi
  const getFilteredPackages = (): PaketUmrah[] => {
    if (!hasil) return [];

    const budget = hasil.totalTabungan;
    const tolerance = budget * 0.1;

    return paketUmrah
      .filter((paket) => {
        const hargaPaket = paket.rawPrice;
        return (
          hargaPaket <= budget + tolerance &&
          hargaPaket >= budget - tolerance * 2
        );
      })
      .sort((a, b) => {
        const selisihA = Math.abs(a.rawPrice - budget);
        const selisihB = Math.abs(b.rawPrice - budget);
        return selisihA - selisihB;
      });
  };

  const filteredPackages = getFilteredPackages();

  const formatRupiah = (angka: number): string => {
    return `Rp ${angka.toLocaleString("id-ID")}`;
  };

  const hitungSimulasi = (): void => {
    const {
      targetBiaya,
      tabunganAwal,
      tabunganBulanan,
      targetWaktu,
      perkiraanInflasi,
    } = formData;

    // Hitung target biaya setelah inflasi
    const inflasiRateDecimal = (perkiraanInflasi || 0) / 100; // Konversi persen ke desimal
    const targetBiayaSetelahInflasi =
      targetBiaya * Math.pow(1 + inflasiRateDecimal, targetWaktu / 12);

    let saldoSaatIni = tabunganAwal;
    const jadwalTabungan = [];

    // Total tabungan adalah apa yang akan terkumpul berdasarkan rencana saat ini
    const totalTabunganDiAkhirPeriode =
      tabunganAwal + tabunganBulanan * targetWaktu;

    // Kekurangan dihitung terhadap target biaya setelah inflasi
    const kekurangan = Math.max(
      0,
      targetBiayaSetelahInflasi - totalTabunganDiAkhirPeriode
    );
    // Tambahan per bulan yang direkomendasikan jika ada kekurangan
    const tambahanPerBulan =
      kekurangan > 0 ? Math.ceil(kekurangan / targetWaktu) : 0;

    for (let bulan = 1; bulan <= targetWaktu; bulan++) {
      saldoSaatIni += tabunganBulanan;
      // Progress dihitung terhadap target biaya setelah inflasi
      const progress =
        saldoSaatIni > 0 && targetBiayaSetelahInflasi > 0
          ? (saldoSaatIni / targetBiayaSetelahInflasi) * 100
          : 0;

      jadwalTabungan.push({
        bulan,
        setoran: tabunganBulanan,
        saldo: saldoSaatIni,
        progress: Math.min(progress, 100),
        tambahan: tambahanPerBulan,
        totalSetelahTambahan: saldoSaatIni + tambahanPerBulan * (bulan - 1),
      });
    }

    // Penyesuaian untuk jadwalTabungan.totalSetelahTambahan
    let saldoDenganTambahan = tabunganAwal;
    for (let i = 0; i < jadwalTabungan.length; i++) {
      saldoDenganTambahan += tabunganBulanan + jadwalTabungan[i].tambahan;
      jadwalTabungan[i].totalSetelahTambahan = saldoDenganTambahan;
    }

    let waktuCapaiFinal;
    if (kekurangan === 0 && tabunganBulanan > 0) {
      // Target tercapai DENGAN rencana saat ini DALAM atau SEBELUM targetWaktu
      waktuCapaiFinal = Math.max(
        1,
        Math.ceil((targetBiayaSetelahInflasi - tabunganAwal) / tabunganBulanan)
      );
    } else if (
      kekurangan === 0 &&
      tabunganBulanan === 0 &&
      tabunganAwal >= targetBiayaSetelahInflasi
    ) {
      waktuCapaiFinal = 0; // Sudah tercapai dengan tabungan awal
    } else {
      // Target TIDAK tercapai DENGAN rencana saat ini dalam targetWaktu.
      // Rekomendasi adalah untuk menambah agar tercapai DALAM targetWaktu.
      waktuCapaiFinal = targetWaktu;
    }

    let rekomendasi = "";
    if (kekurangan > 0) {
      rekomendasi = `Target biaya setelah inflasi menjadi ${formatRupiah(
        targetBiayaSetelahInflasi
      )}. Anda disarankan menambah tabungan sebesar ${formatRupiah(
        tambahanPerBulan
      )} per bulan untuk mencapai target dalam ${targetWaktu} bulan.`;
    } else {
      rekomendasi = `Selamat! Target biaya setelah inflasi (${formatRupiah(
        targetBiayaSetelahInflasi
      )}) realistis dan dapat dicapai dalam ${waktuCapaiFinal} bulan dengan rencana Anda saat ini.`;
    }

    setHasil({
      totalTabungan: totalTabunganDiAkhirPeriode, // Apa yang akan dimiliki pengguna
      waktuCapai: waktuCapaiFinal,
      kekurangan, // Kekurangan terhadap target biaya setelah inflasi
      rekomendasi,
      jadwalTabungan,
      targetBiayaAkhir: targetBiayaSetelahInflasi, // Target biaya yang sudah memperhitungkan inflasi
    });
  };

  useEffect(() => {
    hitungSimulasi();
  }, [formData]);

  const handleInputChange = (
    field: keyof TabunganData,
    value: number | string
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaketChange = (harga: number, nama: string): void => {
    setFormData((prev) => ({
      ...prev,
      targetBiaya: harga,
      jenisUmrah: nama.toLowerCase().replace(" ", "_"),
    }));
    setActiveTab("simulator");
  };

  const handleWhatsAppContact = (paket: PaketUmrah): void => {
    const message = `Halo, saya tertarik dengan ${paket.title} seharga ${paket.price}. Mohon informasi lebih lanjut.`;
    const whatsappUrl = `https://wa.me/6281329196100?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const TabButton = ({
    tab,
    icon: Icon,
    label,
  }: {
    tab: string;
    icon: any;
    label: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(tab as any);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
        activeTab === tab
          ? "bg-[#222636] text-white shadow-md"
          : "text-gray-600 hover:bg-[#F1F2F6] hover:text-[#222636]"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="inline">{label}</span>
    </button>
  );

  // Definisi warna dan keterangan untuk setiap tingkat rating
  const ratingLabels: { [key: number]: { label: string; color: string } } = {
    1: { label: "Buruk", color: "#FF5252" },
    2: { label: "Kurang", color: "#FF9800" },
    3: { label: "Cukup", color: "#FFC107" },
    4: { label: "Sangat Baik", color: "#8BC34A" },
    5: { label: "Luar Biasa", color: "#4CAF50" },
  };

  const [zoomImage, setZoomImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#222636]">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Kalkulator Tabungan Umrah
                </h1>
                <p className="hidden text-sm text-gray-600 sm:block">
                  Rencanakan perjalanan suci Anda dengan mudah
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-2 md:flex">
              <TabButton tab="simulator" icon={Calculator} label="Simulator" />
              <TabButton tab="paket" icon={Users} label="Paket Umrah" />
              <TabButton tab="tips" icon={TrendingUp} label="Tips Menabung" />
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="mt-4 flex flex-col gap-2 border-t pt-4 md:hidden">
              <TabButton tab="simulator" icon={Calculator} label="Simulator" />
              <TabButton tab="paket" icon={Users} label="Paket Umrah" />
              <TabButton tab="tips" icon={TrendingUp} label="Tips Menabung" />
            </nav>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Simulator Tab */}
        {activeTab === "simulator" && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Form Input */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <div className="rounded-lg bg-[#E3E6F0] p-2">
                  <Calculator className="h-6 w-6 text-[#222636]" />
                </div>
                Kalkulator Tabungan
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Target Biaya Umrah
                  </label>
                  <input
                    type="number"
                    value={formData.targetBiaya}
                    onChange={(e) =>
                      handleInputChange(
                        "targetBiaya",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm font-medium text-[#2a3d66]">
                    {formatRupiah(formData.targetBiaya)}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tabungan Awal
                  </label>
                  <input
                    type="number"
                    value={formData.tabunganAwal}
                    onChange={(e) =>
                      handleInputChange(
                        "tabunganAwal",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                  <p className="mt-1 text-sm font-medium text-[#2a3d66]">
                    {formatRupiah(formData.tabunganAwal)}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tabungan per Bulan
                  </label>
                  <input
                    type="number"
                    value={formData.tabunganBulanan}
                    onChange={(e) =>
                      handleInputChange(
                        "tabunganBulanan",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="1000000"
                  />
                  <p className="mt-1 text-sm font-medium text-[#2a3d66]">
                    {formatRupiah(formData.tabunganBulanan)}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Target Waktu (Bulan)
                  </label>
                  <input
                    type="number"
                    value={formData.targetWaktu}
                    onChange={(e) =>
                      handleInputChange(
                        "targetWaktu",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="24"
                    min="1"
                  />
                  <p className="mt-1 text-sm font-medium text-[#2a3d66]">
                    {formData.targetWaktu} bulan (
                    {Math.round((formData.targetWaktu / 12) * 10) / 10} tahun)
                  </p>
                </div>

                {/* Input Perkiraan Inflasi Tahunan */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Perkiraan Inflasi Tahunan (%)
                  </label>
                  <input
                    type="number"
                    value={formData.perkiraanInflasi || 0}
                    onChange={(e) =>
                      handleInputChange(
                        "perkiraanInflasi",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: 3"
                    min="0"
                    step="0.1"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Inflasi dapat mempengaruhi biaya Umrah di masa depan.
                    Masukkan perkiraan inflasi per tahun.
                  </p>
                  <p className="mt-1 text-xs text-blue-600">
                    Untuk data inflasi terkini di Indonesia, Anda bisa merujuk
                    ke:
                    <a
                      href="https://www.bi.go.id/id/statistik/indikator/data-inflasi.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 underline hover:text-blue-800"
                    >
                      Bank Indonesia
                    </a>
                    <span className="mx-1">atau</span>
                    <a
                      href="https://id.tradingeconomics.com/indonesia/inflation-cpi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-800"
                    >
                      Trading Economics
                    </a>
                    .
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Misalnya, jika inflasi YoY terakhir adalah 2.5%, Anda bisa
                    menggunakan angka tersebut atau estimasi rata-rata jangka
                    panjang Anda.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-left text-xs text-gray-500">
                *Silahkan sesuaikan dengan keuangan anda
              </p>
            </div>

            {/* Hasil Simulasi */}
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <div className="rounded-lg bg-[#E3E6F0] p-2">
                  <Target className="h-6 w-6 text-[#222636]" />
                </div>
                Hasil Simulasi
              </h2>

              {hasil && (
                <div className="space-y-6">
                  {/* Info Target Biaya Setelah Inflasi */}
                  {formData.perkiraanInflasi &&
                    formData.perkiraanInflasi > 0 && (
                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
                        <p className="text-sm text-blue-700">
                          Target biaya Umrah awal:{" "}
                          {formatRupiah(formData.targetBiaya)}
                        </p>
                        <p className="text-md font-semibold text-blue-800">
                          Estimasi target biaya setelah inflasi (
                          {formData.perkiraanInflasi}%/tahun):{" "}
                          {formatRupiah(hasil.targetBiayaAkhir)}
                        </p>
                      </div>
                    )}

                  {/* Progress Bar */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">
                        Progress Target
                      </span>
                      <span className="text-lg font-bold text-[#222636]">
                        {hasil.targetBiayaAkhir > 0
                          ? Math.round(
                              (hasil.totalTabungan / hasil.targetBiayaAkhir) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-[#222636] to-[#2a3d66] transition-all duration-1000"
                        style={{
                          width: `${Math.min(
                            hasil.targetBiayaAkhir > 0
                              ? (hasil.totalTabungan / hasil.targetBiayaAkhir) *
                                  100
                              : 0,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Statistik */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-[#D1D3E2] bg-[#F1F2F6] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-[#222636]" />
                        <span className="font-semibold text-gray-700">
                          Total Tabungan
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[#222636]">
                        {formatRupiah(hasil.totalTabungan)}
                      </p>
                    </div>

                    <div className="rounded-lg border border-[#D1D3E2] bg-[#F1F2F6] p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-[#222636]" />
                        <span className="font-semibold text-gray-700">
                          Waktu Capai
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[#222636]">
                        {hasil.waktuCapai} bulan
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`rounded-lg border p-4 ${
                      hasil.kekurangan === 0
                        ? "border-[#D1D3E2] bg-[#F1F2F6]"
                        : "border-orange-200 bg-orange-50"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      {hasil.kekurangan === 0 ? (
                        <CheckCircle className="h-5 w-5 text-[#222636]" />
                      ) : (
                        <Target className="h-5 w-5 text-orange-600" />
                      )}
                      <span className="font-semibold text-gray-900">
                        {hasil.kekurangan === 0
                          ? "Target Tercapai!"
                          : "Perlu Penyesuaian"}
                      </span>
                    </div>
                    {hasil.kekurangan > 0 && (
                      <p className="mb-2 font-semibold text-orange-600">
                        Kekurangan: {formatRupiah(hasil.kekurangan)}
                      </p>
                    )}
                    <p className="text-gray-700">{hasil.rekomendasi}</p>
                  </div>

                  {/* Tombol Detail */}
                  <button
                    onClick={() => setShowDetail(!showDetail)}
                    className="w-full rounded-lg bg-[#222636] px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#2E3650]"
                  >
                    {showDetail ? "Sembunyikan" : "Lihat"} Jadwal Detail
                  </button>

                  {/* Detail Jadwal - Mobile Optimized */}
                  {showDetail && (
                    <div className="max-h-80 overflow-y-auto rounded-lg bg-gray-50 p-4">
                      <h3 className="mb-4 font-semibold text-gray-900">
                        Jadwal Tabungan Bulanan
                      </h3>
                      <div className="space-y-3">
                        {hasil.jadwalTabungan
                          .slice(0, 12)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="rounded-lg border border-gray-200 bg-white p-3"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-semibold text-gray-900">
                                    Bulan {item.bulan}
                                  </span>
                                  <div className="text-sm text-gray-600">
                                    Setoran: {formatRupiah(item.setoran)}
                                  </div>
                                  {item.tambahan > 0 && (
                                    <div className="text-sm text-orange-600">
                                      Tambahan: {formatRupiah(item.tambahan)}
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">
                                    {formatRupiah(item.saldo)}
                                  </div>
                                  <div className="text-sm text-[#222636]">
                                    {item.progress.toFixed(1)}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        {hasil.jadwalTabungan.length > 12 && (
                          <div className="text-center text-sm text-gray-500">
                            Dan {hasil.jadwalTabungan.length - 12} bulan
                            lainnya...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Paket Umrah Tab */}
        {activeTab === "paket" && (
          <div className="space-y-6">
            {/* Budget Info */}
            {hasil && (
              <div className="rounded-xl border-[#D1D3E2] bg-[#F1F2F6] p-6">
                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                  <Target className="h-6 w-6 text-[#222636]" />
                  Rekomendasi Paket Sesuai Budget
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatRupiah(hasil.totalTabungan)}
                    </div>
                    <div className="text-gray-600">Total Budget</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {hasil.waktuCapai} Bulan
                    </div>
                    <div className="text-gray-600">Waktu Pencapaian</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {filteredPackages.length}
                    </div>
                    <div className="text-gray-600">Paket Tersedia</div>
                  </div>
                </div>
              </div>
            )}

            {/* Paket Cards - Mobile Optimized */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hasil ? (
                filteredPackages.length > 0 ? (
                  filteredPackages.map((paket, index) => {
                    const selisihBudget = hasil.totalTabungan - paket.rawPrice;
                    const isAffordable = selisihBudget >= 0;

                    return (
                      <div
                        key={index}
                        className={`overflow-hidden rounded-xl border-2 bg-white shadow-md transition-shadow duration-200 hover:shadow-lg ${
                          isAffordable
                            ? "border-[#D1D3E2]"
                            : "border-orange-200"
                        }`}
                      >
                        <div
                          className="relative cursor-zoom-in"
                          onClick={() => setZoomImage(paket.image)}
                        >
                          <img
                            src={paket.image}
                            alt={paket.title}
                            className="h-48 w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/img/no-image.jpg";
                            }}
                          />
                          <div className="absolute top-3 right-3 rounded-full bg-[#222636] px-3 py-1 text-sm font-medium text-white">
                            {paket.seatAvailable}
                          </div>
                          <div
                            className={`absolute top-3 left-3 rounded-full px-3 py-1 text-sm font-medium ${
                              isAffordable
                                ? "bg-[#222636] text-white"
                                : "bg-orange-500 text-white"
                            }`}
                          >
                            {isAffordable
                              ? "✓ Sesuai Budget"
                              : "⚠ Perlu Tambahan"}
                          </div>
                        </div>

                        <div className="p-4">
                          <h3 className="mb-1 text-lg font-bold text-gray-900">
                            {paket.title}
                          </h3>
                          <p className="mb-2 text-sm text-gray-600">
                            {paket.category}
                          </p>
                          <p className="mb-4 flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            {paket.departureDate}
                          </p>

                          <div className="mb-4 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {paket.price}
                            </div>
                            <div className="text-sm text-gray-600">
                              per orang
                            </div>
                            {!isAffordable && (
                              <div className="mt-1 rounded bg-orange-100 px-2 py-1 text-sm font-medium text-orange-600">
                                Kurang: {formatRupiah(Math.abs(selisihBudget))}
                              </div>
                            )}
                            {isAffordable && selisihBudget > 0 && (
                              <div className="mt-1 rounded bg-[#F1F2F6] px-2 py-1 text-sm font-medium text-[#222636]">
                                Sisa: {formatRupiah(selisihBudget)}
                              </div>
                            )}
                          </div>

                          <div className="mb-4 space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Plane className="h-4 w-4 text-[#222636]" />
                              <span>{paket.airline}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Hotel className="mt-0.5 h-4 w-4 text-[#222636]" />
                              <div className="space-y-1">
                                {/* Hotel Makkah */}
                                <div className="flex items-center gap-1">
                                  <span>Makkah: {paket.hotelMakkah}</span>
                                  <Rating
                                    style={{ maxWidth: 100 }}
                                    value={
                                      parseFloat(paket.hotelMakkahRating) || 0
                                    }
                                    itemStyles={{
                                      itemShapes: Star,
                                      activeFillColor:
                                        ratingLabels[
                                          Math.round(
                                            parseFloat(
                                              paket.hotelMakkahRating
                                            ) || 0
                                          )
                                        ]?.color || "#FFC107",
                                      inactiveFillColor: "#f0f0f0",
                                    }}
                                    readOnly={true}
                                  />
                                </div>

                                {/* Hotel Madinah */}
                                <div className="flex items-center gap-1">
                                  <span>Madinah: {paket.hotelMadinah}</span>
                                  <Rating
                                    style={{ maxWidth: 100 }}
                                    value={
                                      parseFloat(paket.hotelMadinahRating) || 0
                                    }
                                    itemStyles={{
                                      itemShapes: Star,
                                      activeFillColor:
                                        ratingLabels[
                                          Math.round(
                                            parseFloat(
                                              paket.hotelMadinahRating
                                            ) || 0
                                          )
                                        ]?.color || "#FFC107",
                                      inactiveFillColor: "#f0f0f0",
                                    }}
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button
                              onClick={() =>
                                handlePaketChange(paket.rawPrice, paket.title)
                              }
                              className={`w-full rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
                                isAffordable
                                  ? "bg-[#222636] text-white hover:bg-[#2E3650]"
                                  : "bg-orange-500 text-white hover:bg-orange-600"
                              }`}
                            >
                              {isAffordable
                                ? "Pilih Paket Ini"
                                : "Hitung Ulang Budget"}
                            </button>

                            <button
                              onClick={() => handleWhatsAppContact(paket)}
                              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#222636] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-[#2E3650]"
                            >
                              <MessageCircle className="h-4 w-4" />
                              Hubungi Kami
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <div className="rounded-xl bg-white p-8 shadow-md">
                      <Users className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                      <h3 className="mb-2 text-xl font-bold text-gray-900">
                        Tidak Ada Paket Yang Sesuai
                      </h3>
                      <p className="mb-4 text-gray-600">
                        Silakan sesuaikan budget atau waktu tabungan Anda
                      </p>
                      <button
                        onClick={() => setActiveTab("simulator")}
                        className="rounded-lg bg-[#222636] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-[#2E3650]"
                      >
                        Kembali ke Simulator
                      </button>
                    </div>
                  </div>
                )
              ) : (
                paketUmrah.slice(0, 6).map((paket, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
                  >
                    <div
                      className="relative cursor-zoom-in"
                      onClick={() => setZoomImage(paket.image)}
                    >
                      <img
                        src={paket.image}
                        alt={paket.title}
                        className="h-48 w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/img/no-image.jpg";
                        }}
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-[#222636] px-3 py-1 text-sm font-medium text-white">
                        {paket.seatAvailable}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="mb-1 text-lg font-bold text-gray-900">
                        {paket.title}
                      </h3>
                      <p className="mb-2 text-sm text-gray-600">
                        {paket.category}
                      </p>
                      <p className="mb-4 flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {paket.departureDate}
                      </p>

                      <div className="mb-4 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {paket.price}
                        </div>
                        <div className="text-sm text-gray-600">per orang</div>
                      </div>

                      <div className="mb-4 space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Plane className="h-4 w-4 text-[#222636]" />
                          <span>{paket.airline}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Hotel className="mt-0.5 h-4 w-4 text-[#222636]" />
                          <div className="space-y-1">
                            {/* Hotel Makkah */}
                            <div className="flex items-center gap-1">
                              <span>Makkah: {paket.hotelMakkah}</span>
                              <Rating
                                style={{ maxWidth: 100 }}
                                value={parseFloat(paket.hotelMakkahRating) || 0}
                                itemStyles={{
                                  itemShapes: Star,
                                  activeFillColor:
                                    ratingLabels[
                                      Math.round(
                                        parseFloat(paket.hotelMakkahRating) || 0
                                      )
                                    ]?.color || "#FFC107",
                                  inactiveFillColor: "#f0f0f0",
                                }}
                                readOnly={true}
                              />
                            </div>

                            {/* Hotel Madinah */}
                            <div className="flex items-center gap-1">
                              <span>Madinah: {paket.hotelMadinah}</span>
                              <Rating
                                style={{ maxWidth: 100 }}
                                value={
                                  parseFloat(paket.hotelMadinahRating) || 0
                                }
                                itemStyles={{
                                  itemShapes: Star,
                                  activeFillColor:
                                    ratingLabels[
                                      Math.round(
                                        parseFloat(paket.hotelMadinahRating) ||
                                          0
                                      )
                                    ]?.color || "#FFC107",
                                  inactiveFillColor: "#f0f0f0",
                                }}
                                readOnly={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() =>
                            handlePaketChange(paket.rawPrice, paket.title)
                          }
                          className="w-full rounded-lg bg-[#222636] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                        >
                          Pilih Paket Ini
                        </button>

                        <button
                          onClick={() => handleWhatsAppContact(paket)}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#222636] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Hubungi Kami
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                <div className="rounded-lg bg-green-100 p-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                Tips Menabung untuk Umrah
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-blue-600 p-2 text-sm font-bold text-white">
                        1
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Buat Target yang Realistis
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tentukan target yang sesuai dengan kemampuan finansial
                          Anda. Mulai dengan jumlah kecil dan tingkatkan secara
                          bertahap.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-green-600 p-2 text-sm font-bold text-white">
                        2
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Otomatisasi Tabungan
                        </h3>
                        <p className="text-sm text-gray-600">
                          Gunakan autodebet atau transfer otomatis ke rekening
                          khusus umrah untuk memastikan konsistensi menabung.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-purple-600 p-2 text-sm font-bold text-white">
                        3
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Kurangi Pengeluaran Non-Esensial
                        </h3>
                        <p className="text-sm text-gray-600">
                          Evaluasi pengeluaran bulanan dan alihkan dana dari
                          kebutuhan sekunder ke tabungan umrah.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-orange-600 p-2 text-sm font-bold text-white">
                        4
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Manfaatkan Penghasilan Tambahan
                        </h3>
                        <p className="text-sm text-gray-600">
                          Gunakan bonus kerja, THR, atau penghasilan dari usaha
                          sampingan untuk mempercepat pencapaian target.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-red-600 p-2 text-sm font-bold text-white">
                        5
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Investasi Halal
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pertimbangkan investasi syariah seperti deposito
                          syariah atau reksa dana syariah untuk mengembangkan
                          tabungan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-indigo-600 p-2 text-sm font-bold text-white">
                        6
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Bergabung dengan Arisan Umrah
                        </h3>
                        <p className="text-sm text-gray-600">
                          Ikuti program arisan umrah di komunitas atau tempat
                          ibadah untuk mempermudah pembayaran secara cicilan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-teal-600 p-2 text-sm font-bold text-white">
                        7
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Pantau Progress Secara Rutin
                        </h3>
                        <p className="text-sm text-gray-600">
                          Evaluasi perkembangan tabungan setiap bulan dan
                          sesuaikan strategi jika diperlukan.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-yellow-600 p-2 text-sm font-bold text-white">
                        8
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                          Doa dan Istiqamah
                        </h3>
                        <p className="text-sm text-gray-600">
                          Selalu berdoa dan istiqamah dalam menjalankan rencana
                          tabungan. Allah SWT akan memudahkan jalan bagi
                          hamba-Nya yang berusaha.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Inspiratif */}
              <div className="mt-8 rounded-xl bg-gradient-to-r from-[#222636] to-[#2a3d66] p-6 text-center text-white">
                <div className="mb-4">
                  <Moon className="mx-auto mb-2 h-8 w-8" />
                  <h3 className="text-xl font-bold">
                    Doa untuk Kemudahan Rezeki
                  </h3>
                </div>
                <blockquote className="mb-4 text-lg text-white/90 italic">
                  "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي
                  بِفَضْلِكَ عَمَّنْ سِوَاكَ"
                </blockquote>
                <blockquote className="mb-4 text-lg italic">
                  "Ya Allah, cukupkanlah aku dengan rezeki yang halal, sehingga
                  aku tidak memerlukan yang haram, dan kayakanlah aku dengan
                  karunia-Mu, sehingga aku tidak memerlukan bantuan orang lain
                  selain Engkau."
                </blockquote>
                {/* <cite className="text-sm opacity-80">- QS. Al-Baqarah: 197</cite> */}
              </div>
            </div>
          </div>
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
      </main>
    </div>
  );
};

export default TabunganUmrahSimulator;
