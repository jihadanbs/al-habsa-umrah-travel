import { Link } from "react-router-dom";

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/img/foto4.jpg",
    alt: "Jamaah Umrah",
  },
  {
    src: "/img/foto2.jpg",
    alt: "Masjidil Haram",
  },
  {
    src: "/img/foto5.jpg",
    alt: "Turkey",
  },
];

const Galeri: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8"
      id="Galeri"
    >
      <div className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
          <h2 className="text-xl font-black whitespace-nowrap text-[#222636] md:text-2xl lg:text-3xl xl:text-4xl">
            GALERI PERJALANAN{" "}
            <span className="underline underline-offset-4">UMRAH</span>
          </h2>
          <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
        </div>

        <p className="mx-auto mb-2 max-w-xl text-lg text-[#222636] md:text-xl">
          Potret momen suci bersama Al Habsa Travel
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div key={index} className="flex flex-col items-start">
            <div className="group relative w-full overflow-hidden rounded-lg rounded-bl-none">
              <img
                src={image.src}
                alt={image.alt}
                className="h-105 w-full transform object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 flex w-60 flex-col items-start rounded-tr-sm bg-white px-4 py-3 shadow-sm">
                <h2 className="text-xl font-extrabold text-black uppercase">
                  {image.alt}
                </h2>
              </div>
            </div>

            {/* Line moved outside */}
            <div className="h-1 w-50 bg-[#222636]" />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          to="/umrah-journey"
          className="rounded-md bg-[#222636] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2E3650] focus:outline-none"
          type="button"
        >
          PERJALANAN UMRAH
        </Link>
      </div>
    </div>
  );
};

export default Galeri;
