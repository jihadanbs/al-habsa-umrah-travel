import { useEffect, useState } from "react";
import Navbar from "./navbar";

interface Slide {
  title: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isSearchModalOpen,
  setIsSearchModalOpen,
}) => {
  // Status slide saat ini
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Data slide carousel
  const slides: Slide[] = [
    {
      title: "Perjalanan Umrah Bersama Al Habsa",
      backgroundImage: "/img/banner1.jpg",
      ctaText: "Daftar Sekarang",
      ctaLink: "#Book",
    },
    {
      title: "Daftar Paket Umrah Ramadhan - Segera",
      backgroundImage: "/img/banner2.jpg",
      ctaText: "Daftar Sekarang",
      ctaLink: "#Book",
    },
  ];

  // Otomatis berganti slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Ganti slide setiap 5 detik

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <>
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <div className="relative z-10 h-screen w-full overflow-hidden" id="Home">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "z-10 opacity-100" : "z-0 opacity-0"
            } `}
            style={{
              backgroundImage: `url(${slide.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-opacity-40 absolute inset-0 flex items-center bg-gradient-to-b from-transparent to-black px-4 lg:px-32">
              <div className="mx-6 max-w-5xl text-white lg:mx-auto">
                <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <a
                  href={slide.ctaLink}
                  className="relative z-20 inline-block cursor-pointer rounded-md bg-[#222636] px-6 py-3 text-white transition-colors hover:bg-[#2E3650]"
                  onClick={(e) => {
                    console.log("Tombol diklik", e.currentTarget);
                  }}
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Indikator Slide */}
        <div className="absolute bottom-56 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 w-3 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-[#2a3d66]"
                  : "bg-opacity-50 bg-white"
              } `}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
