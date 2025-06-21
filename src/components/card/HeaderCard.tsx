import { useLocation } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const HeaderCard: React.FC = () => {
  const { pathname: url } = useLocation();

  let title = "Transaksi Paket Umrah";
  if (url === "/umrah-savings-simulator") {
    title = "Simulator Tabungan Umrah";
  } else if (url === "/umrah-packages") {
    title = "Transaksi Paket Umrah";
  } else if (url === "/cookie-policy") {
    title = "Cookie Policy";
  } else if (url === "/privacy-policy") {
    title = "Privacy Policy";
  } else if (url === "/contact") {
    title = "Kontak Al Habsa";
  } else if (url === "/umrah-journey") {
    title = "Perjalanan Umrah Al Habsa";
  } else if (url === "/term-condition") {
    title = "Syarat & Ketentuan";
  } else if (url === "/process-steps") {
    title = "10 Langkah Menuju Umrah";
  } else if (url === "/payment-method") {
    title = "Petunjuk Pembayaran";
  }

  return (
    <div className="relative h-[430px] w-full overflow-hidden">
      <div
        className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('/img/banner2.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent ${
            url === "/process-steps" ? "to-black/100" : "to-black/80"
          } bg-opacity-50 flex items-end px-4 pb-12 md:px-20 lg:px-32`}
        >
          <div className="text-white">
            <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
          </div>
        </div>

        {/* Sosial Media - kanan atas di mobile, kanan bawah di desktop */}
        <div className="absolute top-16 right-4 flex flex-col items-start gap-2 px-4 pb-4 sm:top-auto sm:right-4 sm:bottom-4 md:px-20 lg:px-32">
          <p className="text-base font-semibold text-white sm:text-lg">
            Sosial Media
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/alhabsa.travel/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors hover:text-[#B49164]"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/@alhabsatravel?_t=ZS-8wXNpd9Onjk&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors hover:text-[#B49164]"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
