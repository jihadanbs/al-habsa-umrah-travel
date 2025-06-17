import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

interface Airline {
  src: string;
  alt: string;
}

const Mitra: React.FC = () => {
  const airlines: Airline[] = [
    { src: "/img/mitra/etihad.svg", alt: "Etihad Air" },
    { src: "/img/mitra/emirates-airlanes.svg", alt: "Emirates" },
    { src: "/img/mitra/garuda-indonesia.svg", alt: "Garuda Indonesia" },
    { src: "/img/mitra/oman-air.svg", alt: "Oman Air" },
    { src: "/img/mitra/qatar.svg", alt: "Qatar Airways" },
    { src: "/img/mitra/saudi.svg", alt: "Saudi Arabian Airlines" },
    { src: "/img/mitra/turkish.png", alt: "Turkish Airlines" },
    {
      src: "/img/mitra/ampuh.png",
      alt: "Afiliasi Mandiri Penyelenggara Umrah & Haji",
    },
  ];

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden w-full bg-[#222636] py-8 md:block md:py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 md:flex-row md:gap-8">
          {/* Judul di kiri */}
          <div className="flex-shrink-0 text-center md:text-left">
            <h2 className="text-4xl font-black text-white md:text-4xl lg:text-5xl xl:text-6xl">
              <span className="inline md:block lg:inline">SUPPORT</span>
              <span className="ml-2 md:ml-0 lg:ml-2">BY</span>
            </h2>
          </div>

          {/* Logo-logo bergerak di kanan dengan padding */}
          <div className="flex-1 overflow-hidden">
            <div className="px-2 md:px-8">
              <InfiniteMovingCards
                items={airlines}
                direction="right"
                speed="slow"
                imageClassName="w-24 md:w-56 lg:w-64 h-14 md:h-20 lg:h-24 object-contain mx-2 md:mx-6 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="block w-full bg-[#222636] py-6 md:hidden">
        <div className="mb-2 text-center">
          <h2 className="text-4xl font-black text-white md:text-4xl lg:text-5xl xl:text-6xl">
            SUPPORT BY
          </h2>
        </div>

        <div className="px-4">
          <InfiniteMovingCards
            items={airlines}
            direction="right"
            speed="slow"
            imageClassName="w-56 md:w-60 h-20 md:h-24 object-contain mx-3 md:mx-6 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </>
  );
};

export default Mitra;
