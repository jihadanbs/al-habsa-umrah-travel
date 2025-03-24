import { FaAngleRight } from "react-icons/fa";

import { IoCallSharp } from "react-icons/io5";

import { MdEmail } from "react-icons/md";
import { AiFillTikTok } from "react-icons/ai";

import { FaSquareInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-[#000000]  text-[#D3D3D3] py-8">
      <div className="container mx-auto px-4 lg:px-36">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Tentang Kami */}
          <div>
            <h3 className="text-lg font-bold mb-4">Tentang Kami</h3>
            <p className="text-sm">
             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam quibusdam debitis voluptate illo, excepturi blanditiis veritatis aliquam ipsum nesciunt iste?
            </p>
            <div className="text-sm mt-4">
                <div className="flex items-center">
                <IoCallSharp className="mr-2"/>
                info@Al Habsa.com
                </div>
                <div className="flex items-center" >
                  <MdEmail className="mr-2"/>
                +6281333333
                </div>
            </div>
            <div className="flex gap-2 mt-3 ">
             <a href="">
             <FaSquareInstagram className="w-4 h-4 md:w-6 md-h-6"/>
             </a>
            <a href="">
            <AiFillTikTok className="w-4 h-4 md:w-6 md-h-6" />
            </a>
            </div>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informasi</h3>
            <ol className="text-sm">
              <li className="flex items-center">
                <FaAngleRight className="FaAngleRight"/>
                <a href="">Metode Pembayaran</a>
                </li>
                 <li className="flex items-center">
                <FaAngleRight className="FaAngleRight"/>
                <a href="">Metode Pembayaran</a>
                </li>
                 <li className="flex items-center">
                <FaAngleRight className="FaAngleRight"/>
                <a href="">Metode Pembayaran</a>
                </li>
            </ol>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-lg font-bold mb-4">Layanan</h3>
            <ul className="text-sm">
               <li className="flex items-center">
                  <FaAngleRight className="FaAngleRight"/>
                   <a href="">Metode Pembayaran</a>
                </li>
                 <li className="flex items-center">
                  <FaAngleRight className="FaAngleRight"/>
                  <a href="">Metode Pembayaran</a>
                </li>
            </ul>
          </div>

          {/* Jam Operasional & Alamat */}
          <div>
            <h3 className="text-lg font-bold mb-4">Jam Operasional</h3>
            <p className="text-sm">
              Senin – Jumat, 10.30 – 16.30<br />
              (By Appointment with Our Whatsapp)
            </p>
            <p className="text-sm mt-4">
              Jl. nama jalan,<br />
              RT.kecamanan, daerah,<br />
              Nama Kota, Daerah<br />
              Khusus Ibukota Jakarta 000000, daerah<br />
              Minggu, Jakarta Selatan, DKI<br />
              Jakarta, Indonesia, 12510
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Al Habsa. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;