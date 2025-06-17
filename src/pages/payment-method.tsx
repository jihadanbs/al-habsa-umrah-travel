import AccessibilityPanel from "../components/AccessibilityPanel";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import SocialIcons from "../components/SocialIcons";
import { useState } from "react";

interface PaymentMethodProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  highlight?: boolean;
}

const PaymentMethodCard: React.FC<PaymentMethodProps> = ({
  icon,
  title,
  description,
  details,
  highlight = false,
}) => {
  return (
    <div
      className={`transform rounded-xl border-2 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        highlight ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-100"
      }`}
    >
      <div className="mb-6 flex items-center">
        <div
          className={`mr-4 rounded-lg p-3 ${
            highlight
              ? "bg-blue-100 text-blue-600"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <p className="text-sm font-medium text-slate-500">{description}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start">
            <span
              className={`${
                highlight ? "text-blue-500" : "text-slate-400"
              } mt-1 mr-3 font-bold`}
            >
              •
            </span>
            <span className="text-sm leading-relaxed text-slate-600">
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PaymentMethods: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const companyName: string = "AL Habsa Umrah Travel";
  const whatsappNumber: string = "6281329196100";

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Assalamu'alaikum, saya ingin berkonsultasi mengenai metode pembayaran paket umrah. Mohon informasi lengkapnya.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const bankTransferIcon = (
    <svg
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  );

  const cashIcon = (
    <svg
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const installmentIcon = (
    <svg
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );

  return (
    <>
      <title>Metode Pembayaran - Solusi Pembayaran Terpercaya</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Terpercaya & Aman
            </div>
            <h1 className="mb-6 text-4xl leading-tight font-bold text-slate-800 lg:text-5xl">
              Metode Pembayaran
              <span className="block text-blue-600">Yang Fleksibel</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
              Kami menyediakan beragam solusi pembayaran yang aman dan mudah
              untuk mewujudkan perjalanan ibadah umrah impian Anda bersama
              keluarga.
            </p>
          </div>

          {/* Payment Methods Grid */}
          <div className="mb-16 grid gap-8 lg:grid-cols-3">
            <PaymentMethodCard
              icon={cashIcon}
              title="Pembayaran Tunai"
              description="Bayar langsung di kantor untuk kemudahan"
              highlight={true}
              details={[
                "Layanan personal di kantor pusat",
                "Kwitansi resmi dan konsultasi langsung",
                "Jam operasional extended hingga sore",
                "Free parking dan area tunggu nyaman",
                "Meeting room khusus untuk keluarga",
              ]}
            />

            <PaymentMethodCard
              icon={bankTransferIcon}
              title="Transfer Bank"
              description="Metode pembayaran utama yang aman dan terpercaya"
              details={[
                "Transfer ke rekening resmi perusahaan berlisensi",
                "Konfirmasi otomatis melalui sistem terintegrasi",
                "Bukti pembayaran digital tersimpan aman",
                "Support 4 bank utama nasional",
                "Proses verifikasi maksimal 2 jam kerja",
              ]}
            />

            <PaymentMethodCard
              icon={installmentIcon}
              title="Sistem Cicilan"
              description="Solusi pembayaran bertahap tanpa bunga"
              details={[
                "Down payment mulai dari 30% saja",
                "Cicilan hingga 6 bulan tanpa bunga",
                "Jadwal pembayaran yang fleksibel",
                "Pelunasan 30 hari sebelum keberangkatan",
                "Konsultasi perencanaan keuangan gratis",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Payment Process Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 lg:text-4xl">
              Proses Pembayaran
            </h2>
            <p className="text-xl text-slate-600">
              Langkah mudah untuk memulai perjalanan ibadah Anda
            </p>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="mt-1 mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#222636] text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-800">
                    Registrasi & Konsultasi
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    Daftar melalui WhatsApp atau datang langsung ke kantor. Tim
                    kami akan memberikan konsultasi lengkap mengenai paket dan
                    metode pembayaran yang sesuai.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#222636] text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-800">
                    Down Payment
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    Lakukan pembayaran uang muka minimal 30% untuk mengamankan
                    slot keberangkatan. Pembayaran dapat dilakukan via transfer
                    atau tunai.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mt-1 mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#222636] text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-800">
                    Pelunasan Bertahap
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    Selesaikan pembayaran sesuai jadwal yang disepakati. Tim
                    finance kami akan mengingatkan setiap jadwal pembayaran
                    melalui WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-8">
              <h3 className="mb-6 text-xl font-bold text-slate-800">
                Ketentuan Pembayaran
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">
                    Uang muka minimum 30% dari total investasi
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">
                    Pelunasan maksimal 30 hari sebelum departure
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">
                    Konfirmasi pembayaran dalam 24 jam
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">
                    Sistem cicilan tanpa bunga tersedia
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-600">
                    ✓
                  </div>
                  <span className="text-sm text-slate-600">
                    Perlindungan asuransi perjalanan included
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Information */}
      <div className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 lg:text-4xl">
              Rekening Resmi Perusahaan
            </h2>
            <p className="text-xl text-slate-600">
              Transfer hanya ke rekening berikut untuk keamanan Anda
            </p>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-blue-100 bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
                <span className="text-lg font-bold text-white">BCA</span>
              </div>
              <div className="mb-1 text-lg font-bold text-slate-800">
                1234 5678 90
              </div>
              <div className="text-sm text-slate-500">a.n. {companyName}</div>
            </div>

            <div className="rounded-xl border border-yellow-100 bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500">
                <span className="text-sm font-bold text-white">MDR</span>
              </div>
              <div className="mb-1 text-lg font-bold text-slate-800">
                0987 6543 21
              </div>
              <div className="text-sm text-slate-500">a.n. {companyName}</div>
            </div>

            <div className="rounded-xl border border-orange-100 bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
                <span className="text-lg font-bold text-white">BNI</span>
              </div>
              <div className="mb-1 text-lg font-bold text-slate-800">
                1122 3344 55
              </div>
              <div className="text-sm text-slate-500">a.n. {companyName}</div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500">
                <span className="text-lg font-bold text-white">BRI</span>
              </div>
              <div className="mb-1 text-lg font-bold text-slate-800">
                5544 3322 11
              </div>
              <div className="text-sm text-slate-500">a.n. {companyName}</div>
            </div>
          </div>

          <div className="mx-auto max-w-4xl rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start">
              <div className="mt-1 mr-4 rounded-full bg-amber-100 p-2 text-amber-600">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-2 font-bold text-amber-800">
                  Perhatian Penting untuk Keamanan
                </h3>
                <p className="leading-relaxed text-amber-700">
                  Pastikan transfer hanya dilakukan ke rekening atas nama{" "}
                  <strong>{companyName}</strong>. Kami tidak bertanggung jawab
                  atas kerugian akibat transfer ke rekening lain. Selalu
                  konfirmasi nomor rekening melalui customer service resmi kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-slate-800 lg:text-4xl">
              Siap Memulai Perjalanan Ibadah Anda?
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-slate-600">
              Tim customer service profesional kami siap membantu Anda memilih
              paket dan metode pembayaran yang tepat. Konsultasi gratis dan
              tanpa komitmen.
            </p>
            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex transform items-center justify-center rounded-xl bg-[#222636] px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2E3650] hover:shadow-xl"
              >
                <svg
                  className="mr-3 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
                </svg>
                Konsultasi via WhatsApp
              </button>
              <button className="rounded-xl border-2 border-slate-600 bg-transparent px-8 py-4 font-bold text-slate-700 transition-all duration-300 hover:bg-[#2E3650] hover:text-white">
                Download Brosur Lengkap
              </button>
            </div>
          </div>
        </div>
      </div>

      <CookieConsent />
      <Footer />
      <SocialIcons />
    </>
  );
};

export default PaymentMethods;
