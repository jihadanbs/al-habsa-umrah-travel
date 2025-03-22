// import React from 'react'; React 19 Tidak Lagi Membutuhkan import React

const Contact = () => {
  return (
    <div className="container mx-auto px-6 md:px-10 lg:px-16 py-12" id='Contact'>
      <h1 className="text-4xl font-bold text-center text-[#222636] mb-12">Hubungi Kami</h1>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        {/* Kiri pada desktop */}
        <div className="px-2">
          <div className="mb-8 h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.0303456871693!2d110.83779247482998!3d-7.679886376027635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a3c71d54c0001%3A0x96bffb6473beb531!2sAl%20Habsa%20Tour%20%26%20Travel!5e0!3m2!1sid!2sid!4v1740679367283!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#222636] mb-6">KANTOR PUSAT</h2>
            <div className="space-y-4 text-gray-700">
              <p className="flex items-start">
                📍 Jl. Lettu Ismail No.20, Gawanan, Sukoharjo, Jawa Tengah 57512
              </p>
              <p className="flex items-center">📞 +62 813-2919-6100</p>
              <p className="flex items-center">✉️ alhabsa@gmail.com</p>
              <p className="flex items-start">
                🕒 Jam Operasional <br/> 08:00 - 17:00 WIB
              </p>
            </div>
          </div>
        </div>
        
        {/* Kanan pada desktop */}
        <div className="px-2">
          <form className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-[#222636] mb-8">Formulir Pengaduan</h2>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Nama Lengkap<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#222636] focus:outline-none"
                placeholder="Masukkan nama anda"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email<span className="text-red-500">*</span></label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#222636] focus:outline-none"
                placeholder="email@gmail.com"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Nomor Telepon<span className="text-red-500">*</span></label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  +62
                </span>
                <input 
                  type="tel" 
                  className="flex-1 px-4 py-3 border rounded-r-md focus:ring-2 focus:ring-[#222636] focus:outline-none"
                  placeholder="882-1234-5678"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Subjek<span className="text-red-500">*</span></label>
              <select 
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#222636] focus:outline-none"
              >
                <option>Pilih Subjek</option>
                <option>Informasi Paket Umroh</option>
                <option>Kendala Pemesanan</option>
                <option>Testimoni & Masukan</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Pesan<span className="text-red-500">*</span></label>
              <textarea 
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[#222636] focus:outline-none"
                rows="4"
                placeholder="Masukkan isi pesan anda"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-[#222636] text-white py-3 rounded-md hover:bg-[#2E3650] transition-colors"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;