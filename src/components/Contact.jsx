import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8" id='Contact'>
      <h1 className="text-3xl font-bold text-center mb-8">Hubungi Kami</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* kiri pada desktop */}
        <div>
        
          <div className="mb-6 h-96 bg-gray-200">
            <img 
              src="/api/placeholder/600/400" 
              alt="Lokasi Kantor" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Contact */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">KANTOR PUSAT</h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +62 888888
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                emal@ipsum.com
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Jam Operasional 
              </p>
            </div>
          </div>
        </div>
        
        {/* Kanan pada desktop */}
        <div>
          <form className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Hubungi Kami</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nama</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="na anda"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Email@ipsum.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nomor Handphone</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                  +62
                </span>
                <input 
                  type="tel" 
                  className="flex-1 px-3 py-2 border rounded-r-md"
                  placeholder="Lorem Ipsum"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Subjek</label>
              <select 
                className="w-full px-3 py-2 border rounded-md"
              >
                <option>tes</option>
                <option>Sakit</option>
                <optiaiton>Unag</optiaiton>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Pesan</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
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