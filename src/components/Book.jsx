import React, { useState } from 'react';

const Book = () => {
  // State untuk jenis perjalanan
  const [travelType, setTravelType] = useState('umroh-reguler');

  // State untuk keberangkatan
  const [selectedMonth, setSelectedMonth] = useState('');

  // State untuk jenis paket
  const [selectedPackage, setSelectedPackage] = useState('');

  // State untuk jumlah penumpang
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0
  });

  // State untuk menampilkan dropdown penumpang
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  // State untuk kode promo
  const [promoCode, setPromoCode] = useState('');

  // Data dummy
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const packages = [
    'Paket Standar',
    'Paket Premium',
    'Paket Eksklusif'
  ];

  // Fungsi untuk mengubah jumlah penumpang
  const updatePassengers = (type, action) => {
    setPassengers(prev => {
      if (action === 'increase') {
        return { ...prev, [type]: prev[type] + 1 };
      } else if (action === 'decrease' && prev[type] > (type === 'adults' ? 1 : 0)) {
        return { ...prev, [type]: prev[type] - 1 };
      }
      return prev;
    });
  };

  return (
    <div className="max-w-5xl mt-10 mx-4 md:mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md shadow-slate-500" id='Book'>
      <h1 className="text-2xl font-bold mb-6">Book</h1>

      {/* Pilihan Perjalanan */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <label className="flex items-center">
          <input 
            type="radio" 
            name="travel-type" 
            value="umroh-reguler"
            checked={travelType === 'umroh-reguler'}
            onChange={() => setTravelType('umroh-reguler')}
            className="mr-2"
          />
          Umroh Reguler
        </label>
        <label className="flex items-center">
          <input 
            type="radio" 
            name="travel-type" 
            value="umroh-plus"
            checked={travelType === 'umroh-plus'}
            onChange={() => setTravelType('umroh-plus')}
            className="mr-2"
          />
          Umroh Plus
        </label>
        <label className="flex items-center">
          <input 
            type="radio" 
            name="travel-type" 
            value="haji"
            checked={travelType === 'haji'}
            onChange={() => setTravelType('haji')}
            className="mr-2"
          />
          Haji
        </label>
      </div>

      {/* Pilihan Keberangkatan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block mb-2">Keberangkatan</label>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Bulan</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Jenis Paket */}
        <div>
          <label className="block mb-2">Jenis Paket</label>
          <select 
            value={selectedPackage} 
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Paket</option>
            {packages.map((pkg, index) => (
              <option key={index} value={pkg}>{pkg}</option>
            ))}
          </select>
        </div>

        {/* Jumlah Penumpang */}
        <div className="relative">
          <label className="block mb-2">Penumpang</label>
          <div 
            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
            className="w-full p-2 border rounded cursor-pointer"
          >
            {passengers.adults} Dewasa, {passengers.children} Anak
          </div>
          
          {/* Dropdown Penumpang */}
          {showPassengerDropdown && (
            <div className="absolute top-full left-0 w-full bg-white rounded-lg border shadow-lg p-4 z-10 mt-1">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Dewasa</h3>
                    <p className="text-gray-500 text-sm">12 tahun ke atas</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers('adults', 'decrease');
                      }}
                      disabled={passengers.adults <= 1}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${passengers.adults > 1 
                          ? 'bg-gray-200 text-black' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                      `}
                    >
                      -
                    </button>
                    <span className="w-4 text-center">{passengers.adults}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers('adults', 'increase');
                      }}
                      className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Anak</h3>
                    <p className="text-gray-500 text-sm">Umur 2-11 tahun</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers('children', 'decrease');
                      }}
                      disabled={passengers.children <= 0}
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${passengers.children > 0 
                          ? 'bg-gray-200 text-black' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                      `}
                    >
                      -
                    </button>
                    <span className="w-4 text-center">{passengers.children}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengers('children', 'increase');
                      }}
                      className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Promo Code */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="flex items-center w-full md:w-auto">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2 text-green-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-green-600">Add a promo code</span>
          </div>
          <input 
            type="text" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code" 
            className="flex-grow p-2 border rounded w-full"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors w-full md:w-auto mt-4 md:mt-0">
            Cari Keberangkatan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;