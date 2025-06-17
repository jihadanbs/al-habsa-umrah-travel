import { Link } from "react-router-dom";

const UmrahSimulator: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-white px-6 py-10 md:py-12">
      {/* Background motif */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('img/kaabah.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.08,
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Gambar Ka'bah */}
        <div className="flex justify-center md:w-1/2">
          <img
            src="img/kaaba.png"
            alt="Ka'bah Illustration"
            className="w-full max-w-xs object-contain drop-shadow-lg md:max-w-md"
          />
        </div>

        {/* Teks & Tombol */}
        <div className="text-center text-gray-800 md:w-1/2 md:text-left">
          <p className="text-xl font-semibold text-[#222636] md:text-2xl">
            Bingung menghitung biaya umrah?
          </p>
          <h2 className="my-3 text-3xl leading-snug font-extrabold md:text-5xl">
            Simulasikan perjalanan suci Anda sejak sekarang
          </h2>

          <Link to="/umrah-savings-simulator">
            <button className="mt-4 rounded-md bg-[#222636] px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-[#2E3650]">
              KLIK DISINI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UmrahSimulator;
