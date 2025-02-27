import React, { useState } from 'react';

const Galeri = () => {
  const [hoveredImage, setHoveredImage] = useState(null);

  const galleryImages = [
    {
      src: "/img/about.jpg",
      alt: "Jamaah Umrah 1"
    },
    {
      src: "/img/about.jpg",
      alt: "Jamaah Umrah 2"
    },
    {
      src: "/img/about.jpg",
      alt: "Jamaah Umrah 3"
    },
    {
      src: "/img/about.jpg",
      alt: "Jamaah Umrah 4"
    },
    {
      src: "/img/about.jpg",
      alt: "Jamaah Umrah 5"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Galeri Perjalanan Jamaah
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg group"
            onMouseEnter={() => setHoveredImage(index)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <div 
              className={`relative overflow-hidden rounded-lg transition-transform duration-300 ease-in-out ${
                hoveredImage === index 
                  ? 'scale-110 shadow-xl' 
                  : 'scale-100'
              }`}
              style={{
                transformOrigin: 'center center',
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
          Lihat Paket Umrah
        </button>
      </div>
    </div>
  );
};

export default Galeri;