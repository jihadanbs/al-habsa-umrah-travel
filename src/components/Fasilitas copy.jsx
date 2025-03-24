import React from 'react';
import { FaUtensils, FaPassport, FaPray, FaUserAlt, FaHotel, FaBus, FaUsers, FaPlane, FaCamera } from 'react-icons/fa';

const Fasilitas = () => {
  const facilities = [
    { 
        icon: 
        <FaUtensils 
        className="w-12 h-12 mx-auto mb-4" />, 
        title: "Konsumsi", 
        description: "Konsumsi yang terjamin dari memulai perjalanan sampai selesai" 
    },
    { 
        icon: 
        <FaPassport 
        className="w-12 h-12 mx-auto mb-4" />, 
        title: "Visa Haji & Umrah", 
        description: "Pengurusan visa haji & umrah untuk keperluan ibadah di tanah suci" },
    { 
        icon: 
        <FaPray 
        className="w-12 h-12 mx-auto mb-4" />, 
        title: "Perlengkapan Umrah", 
        description: "Paket umrah dengan perlengkapan kebutuhan ibadah yang lengkap" 
    },
    { 
        icon: <FaUserAlt 
        className="w-12 h-12 mx-auto mb-4" />, 
        title: "TL/ Mutawwif",
         description: "Umrah alternatif dengan leader dan Muthawif yang tersertifikasi" 
    },
    { 
        icon: 
        <FaHotel 
        className="w-12 h-12 mx-auto mb-4" />, 
        title: "Hotel Penginapan", 
        description: "Akomodasi hotel / penginapan terbaik dan termyaman" 
    },
    { 
        icon: <FaBus className="w-12 h-12 mx-auto mb-4" />, 
        title: "Transportasi", 
        description: "Transportasi untuk memudahkan perjalanan jamaah" 
    },
    { 
        icon: <FaUsers className="w-12 h-12 mx-auto mb-4" />, 
        title: "Tim Professional Saudi", 
        description: "Tim professional dari Saudi untuk melancarkan kegiatan para jamaah" 
    },
    {   icon: <FaPlane className="w-12 h-12 mx-auto mb-4" />,
         title: "Tiket Pesawat", 
         description: "Tiket pesawat PP untuk keperluan berangkat ke tanah suci" 
    },
    { 
        icon: <FaCamera className="w-12 h-12 mx-auto mb-4" />, 
        title: "Dokumentasi", 
        description: "Dokumentasi untuk jamaah selama ibadah di tanah suci" }
  ];

  return (
    <div className="text-center p-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-2">FASILITAS JAMAAH</h2>
      <p className="text-gray-600 mb-6">Fasilitas Yang Disediakan</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 xl:px-44">
        {facilities.map((facility, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="facility-icon">{facility.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{facility.title}</h3>
            <p className="text-sm text-gray-600">{facility.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fasilitas;