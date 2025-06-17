import Navbar from "../components/navbar";
import { useState } from "react";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import SocialIcons from "../components/SocialIcons";
import AccessibilityPanel from "../components/AccessibilityPanel";

interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
}

const TermsSection: React.FC<TermsSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
};

const TermsAndConditions: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const companyName: string = "Al Habsa Umrah Travel";

  return (
    <>
      <title>Syarat dan Ketentuan</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Syarat dan Ketentuan
        </h1>
        <p className="text-gray-700 mb-4">
          Syarat dan ketentuan ini mengatur penggunaan layanan perjalanan ibadah
          umrah yang disediakan oleh {companyName}. Dengan melakukan pemesanan
          atau menggunakan layanan kami, Anda dianggap telah membaca, memahami,
          dan menyetujui seluruh syarat dan ketentuan yang berlaku.
        </p>

        <TermsSection title="1. Definisi">
          <p className="mb-2">Dalam syarat dan ketentuan ini:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>
              <strong>"Perusahaan"</strong> adalah {companyName};
            </li>
            <li>
              <strong>"Jamaah"</strong> adalah pihak yang menggunakan layanan
              perjalanan umrah kami;
            </li>
            <li>
              <strong>"Paket Umrah"</strong> adalah layanan perjalanan ibadah
              umrah yang disediakan;
            </li>
            <li>
              <strong>"Muthawwif"</strong> adalah pembimbing ibadah umrah
              berlisensi resmi;
            </li>
            <li>
              <strong>"Mahram"</strong> adalah pendamping wanita sesuai
              ketentuan syariat Islam.
            </li>
          </ul>
        </TermsSection>

        <TermsSection title="2. Persyaratan Jamaah">
          <h3 className="text-md font-medium mb-2 text-gray-800">
            2.1 Persyaratan Umum
          </h3>
          <p className="mb-2">
            Setiap jamaah wajib memenuhi persyaratan berikut:
          </p>
          <ul className="list-disc mb-4 ml-6 space-y-1">
            <li>Warga Negara Indonesia yang beragama Islam;</li>
            <li>Memiliki paspor yang masih berlaku minimal 7 (tujuh) bulan;</li>
            <li>
              Sehat jasmani dan rohani berdasarkan surat keterangan dokter;
            </li>
            <li>Tidak dalam keadaan hamil bagi jamaah wanita;</li>
            <li>
              Telah melunasi seluruh pembayaran sesuai ketentuan yang berlaku.
            </li>
          </ul>

          <h3 className="text-md font-medium mb-2 text-gray-800">
            2.2 Persyaratan Khusus Jamaah Wanita
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Wanita berusia di bawah 45 tahun wajib didampingi mahram;</li>
            <li>
              Wanita berusia 45 tahun ke atas dapat berangkat tanpa mahram
              dengan ketentuan dalam kelompok minimal 5 (lima) orang wanita;
            </li>
            <li>
              Menyertakan surat persetujuan dari suami bagi yang telah menikah.
            </li>
          </ul>
        </TermsSection>

        <TermsSection title="3. Pemesanan dan Pembayaran">
          <h3 className="text-md font-medium mb-2 text-gray-800">
            3.1 Prosedur Pemesanan
          </h3>
          <p className="mb-2">
            Pemesanan dapat dilakukan dengan tahapan sebagai berikut:
          </p>
          <ul className="list-disc mb-4 ml-6 space-y-1">
            <li>Mengisi formulir pendaftaran secara lengkap dan benar;</li>
            <li>Menyerahkan dokumen persyaratan yang diperlukan;</li>
            <li>
              Melakukan pembayaran uang muka minimal 30% dari total biaya paket;
            </li>
            <li>
              Pemesanan dinyatakan sah setelah uang muka diterima oleh
              perusahaan.
            </li>
          </ul>

          <h3 className="text-md font-medium mb-2 text-gray-800">
            3.2 Ketentuan Pembayaran
          </h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Uang muka sebesar 30% dari total biaya paket;</li>
            <li>
              Pelunasan pembayaran paling lambat 30 hari sebelum tanggal
              keberangkatan;
            </li>
            <li>
              Pembayaran dapat dilakukan secara tunai, transfer bank, atau
              sistem cicilan sesuai ketentuan;
            </li>
            <li>
              Semua bukti pembayaran wajib disimpan sebagai dokumen resmi.
            </li>
          </ul>
        </TermsSection>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          4. Jadwal dan Perubahan
        </h2>
        <p className="text-gray-700 mb-2">
          Jadwal keberangkatan dapat berubah sewaktu-waktu karena faktor-faktor
          di luar kendali perusahaan, termasuk namun tidak terbatas pada:
        </p>
        <ul className="list-disc text-gray-700 mb-4 ml-6 space-y-1">
          <li>
            Kebijakan pemerintah Kerajaan Saudi Arabia terkait kuota dan visa;
          </li>
          <li>Kondisi cuaca, keamanan, atau force majeure;</li>
          <li>Perubahan jadwal penerbangan oleh maskapai;</li>
          <li>Kebijakan atau regulasi lain yang berlaku.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Perusahaan akan memberitahukan setiap perubahan jadwal maksimal 7
          (tujuh) hari sebelum tanggal keberangkatan dan tidak bertanggung jawab
          atas kerugian yang mungkin timbul akibat perubahan tersebut.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          5. Pembatalan dan Pengembalian Dana
        </h2>
        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-800">
          5.1 Pembatalan oleh Jamaah
        </h3>
        <p className="text-gray-700 mb-2">
          Ketentuan pengembalian dana berdasarkan waktu pembatalan:
        </p>
        <ul className="list-disc text-gray-700 mb-4 ml-6 space-y-1">
          <li>
            Lebih dari 45 hari sebelum keberangkatan: dikurangi 25% dari total
            pembayaran;
          </li>
          <li>
            31-45 hari sebelum keberangkatan: dikurangi 50% dari total
            pembayaran;
          </li>
          <li>
            16-30 hari sebelum keberangkatan: dikurangi 75% dari total
            pembayaran;
          </li>
          <li>
            Kurang dari 15 hari sebelum keberangkatan: tidak ada pengembalian
            dana.
          </li>
        </ul>

        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-800">
          5.2 Pembatalan oleh Perusahaan
        </h3>
        <p className="text-gray-700 mb-4">
          Apabila perusahaan membatalkan perjalanan karena force majeure atau
          kebijakan pemerintah, seluruh dana yang telah dibayarkan akan
          dikembalikan 100% atau dapat dialihkan ke jadwal keberangkatan lainnya
          sesuai kesepakatan.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          6. Tanggung Jawab dan Batasan
        </h2>
        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-800">
          6.1 Tanggung Jawab Perusahaan
        </h3>
        <p className="text-gray-700 mb-2">
          Perusahaan bertanggung jawab untuk:
        </p>
        <ul className="list-disc text-gray-700 mb-4 ml-6 space-y-1">
          <li>
            Menyediakan layanan sesuai dengan paket yang telah disepakati;
          </li>
          <li>
            Memberikan bimbingan ibadah melalui muthawwif yang berpengalaman;
          </li>
          <li>
            Menyediakan akomodasi dan transportasi sesuai standar yang
            dijanjikan;
          </li>
          <li>Membantu pengurusan dokumen perjalanan;</li>
          <li>Menyediakan asuransi perjalanan sesuai ketentuan.</li>
        </ul>

        <h3 className="text-lg font-medium mt-6 mb-2 text-gray-800">
          6.2 Batasan Tanggung Jawab
        </h3>
        <p className="text-gray-700 mb-2">
          Perusahaan tidak bertanggung jawab atas:
        </p>
        <ul className="list-disc text-gray-700 mb-4 ml-6 space-y-1">
          <li>
            Penolakan visa oleh pihak Kedutaan Besar Kerajaan Saudi Arabia;
          </li>
          <li>Kehilangan atau kerusakan barang pribadi jamaah;</li>
          <li>Sakit, kecelakaan, atau hal lain yang menimpa jamaah;</li>
          <li>Keterlambatan atau pembatalan penerbangan oleh maskapai;</li>
          <li>Perubahan kebijakan atau regulasi pemerintah yang berlaku.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          7. Kewajiban Jamaah
        </h2>
        <p className="text-gray-700 mb-2">Setiap jamaah wajib:</p>
        <ul className="list-disc text-gray-700 mb-4 ml-6 space-y-1">
          <li>Mematuhi seluruh peraturan dan jadwal yang telah ditetapkan;</li>
          <li>Menjaga kesehatan dan kondisi fisik selama perjalanan;</li>
          <li>Membawa dokumen perjalanan yang lengkap dan sah;</li>
          <li>
            Berperilaku sesuai norma dan tidak melanggar hukum yang berlaku di
            Kerajaan Saudi Arabia;
          </li>
          <li>Mengikuti arahan dan bimbingan dari muthawwif;</li>
          <li>Bertanggung jawab penuh atas barang pribadi masing-masing;</li>
          <li>Melunasi pembayaran sesuai jadwal yang telah disepakati.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          8. Penyelesaian Sengketa
        </h2>
        <p className="text-gray-700 mb-2">
          Setiap perselisihan yang timbul akan diselesaikan melalui tahapan
          sebagai berikut:
        </p>
        <ol className="list-disc text-gray-700 mb-4 ml-6 space-y-1 list-decimal">
          <li>Musyawarah dan mufakat antara kedua belah pihak;</li>
          <li>Mediasi melalui lembaga yang berwenang;</li>
          <li>
            Arbitrase atau penyelesaian melalui pengadilan yang berwenang di
            wilayah Republik Indonesia.
          </li>
        </ol>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">
          9. Ketentuan Umum
        </h2>
        <ul className="list-disc text-gray-700 mb-4 ml-6 space-y-1">
          <li>
            Syarat dan ketentuan ini dapat berubah sewaktu-waktu tanpa
            pemberitahuan sebelumnya;
          </li>
          <li>
            Perubahan syarat dan ketentuan akan dipublikasikan melalui website
            resmi perusahaan;
          </li>
          <li>
            Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia;
          </li>
          <li>
            Apabila terdapat ketentuan yang tidak dapat dilaksanakan, ketentuan
            lainnya tetap berlaku sepenuhnya.
          </li>
        </ul>

        <p className="text-gray-600 mt-8 text-sm">
          Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
        </p>
      </div>
      <CookieConsent />
      <Footer />
      <SocialIcons />
    </>
  );
};

export default TermsAndConditions;
