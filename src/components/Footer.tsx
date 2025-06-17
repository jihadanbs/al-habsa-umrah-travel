import { Link } from "react-router-dom";
import { AiFillTikTok } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const informasiLinks = [
  { label: "Metode Pembayaran", href: "/payment-method" },
  { label: "Syarat & Ketentuan", href: "/term-condition" },
  { label: "Kebijakan Privasi", href: "/privacy-policy" },
  { label: "Kebijakan Cookie", href: "/cookie-policy" },
];

const layananLink = [
  { label: "Paket Umrah", href: "/umrah-packages" },
  { label: "Simulator Tabungan Umrah", href: "/umrah-savings-simulator" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1d2233] py-14 text-sm text-gray-300">
      <div className="container mx-auto px-6 lg:px-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Tentang Kami */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Tentang Kami
            </h3>
            <p className="mb-4 leading-relaxed">
              Al Habsa Travel adalah perusahaan perjalanan profesional yang
              menghadirkan pengalaman umrah yang nyaman dan berkesan.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <IoCallSharp className="mr-2 text-[#B49164]" />
                <span>+62 813-2919-6100</span>
              </div>
              <a
                href="mailto:alhabsa.travel@gmail.com"
                className="flex items-center hover:underline"
              >
                <MdEmail className="mr-2 text-[#B49164]" />
                alhabsa.travel@gmail.com
              </a>
            </div>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.instagram.com/alhabsa.travel/"
                target="_blank"
                className="text-gray-400 transition hover:text-white"
                aria-label="Instagram"
              >
                <FaSquareInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@alhabsatravel?_t=ZS-8wXNpd9Onjk&_r=1"
                target="_blank"
                className="text-gray-400 transition hover:text-white"
                aria-label="TikTok"
              >
                <AiFillTikTok className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Informasi</h3>
            <ul className="space-y-3">
              {informasiLinks.map((item, index) => (
                <li
                  key={index}
                  className="group flex items-center transition-all"
                >
                  <FaAngleRight className="mr-2 text-[#B49164]" />
                  <Link
                    to={item.href}
                    className="group-hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">Layanan</h3>
            <ul className="space-y-3">
              {layananLink.map((item, index) => (
                <li
                  key={index}
                  className="group flex items-center transition-all"
                >
                  <FaAngleRight className="mr-2 text-[#B49164]" />
                  <Link
                    to={item.href}
                    className="group-hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Operasional & Alamat */}
          <div>
            <h3 className="mb-4 text-xl font-semibold text-white">
              Jam Operasional
            </h3>
            <p className="leading-relaxed">
              Senin – Jumat
              <br />
              08:00 – 17:00
              <br />
              (By Appointment via WhatsApp)
            </p>
            <h3 className="mt-6 mb-4 text-xl font-semibold text-white">
              Alamat
            </h3>
            <p className="leading-relaxed">
              Jl. Lettu Ismail No.20, Gawanan,
              <br />
              Kabupaten Sukoharjo, Jawa Tengah 57512
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white">Al Habsa Travel</span>. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
