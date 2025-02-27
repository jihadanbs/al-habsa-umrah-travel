import React from 'react';

const About = () => {
  return (
    <div className="mt-8 max-w-5xl mx-10 lg:mx-auto flex flex-col lg:flex-row items-center justify-center overflow-hidden">
      {/* Left Side - Image */}
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0 lg:mr-8">
        <img
          src="/img/about.jpg"
          alt="Kaabah at Masjidil Haram"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
      
      {/* Right Side - Content */}
      <div className="lg:w-1/2 w-full p-6 bg-white">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-800">
          Memberikan Pelayanan Haji & Umrah Yang Terbaik Untuk Para Jamaah
        </h2>
        
        <div className="text-gray-600 space-y-4">
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, aspernatur hic! Quibusdam illo ut placeat dignissimos quasi ipsum hic distinctio?
          </p>
          
          <p className="text-base">
            Lebih dari 20.000+ jamaah telah mempercayakan penyelenggaraan 
            haji dan umrahnya bersama Buttonscarves Travel. Buttonscarves 
            Travel telah memiliki izin Resmi dari Kementrian Agama RI untuk 
            penyelenggara Umroh
          </p>
        </div>
        
        <button className="mt-6 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          Tentang Kami
        </button>
      </div>
    </div>
  );
};

export default About;