import { ReactNode } from "react";
import {
  FaBus,
  FaCamera,
  FaHotel,
  FaPassport,
  FaPlaneDeparture,
  FaSuitcaseRolling,
  FaUserAlt,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";

// Tipe untuk setiap fasilitas
interface Facility {
  icon: ReactNode;
  title: string;
  description: string;
}

// Tipe props untuk komponen FacilityCard
interface FacilityCardProps {
  facility: Facility;
  index: number;
}

const Fasilitas = () => {
  const facilities: Facility[] = [
    {
      icon: <FaUtensils />,
      title: "Konsumsi",
      description:
        "Konsumsi yang terjamin dari memulai perjalanan sampai selesai",
    },
    {
      icon: <FaPassport />,
      title: "Visa Umrah",
      description: "Pengurusan visa umrah untuk keperluan ibadah di tanah suci",
    },
    {
      icon: <FaSuitcaseRolling />,
      title: "Perlengkapan Umrah",
      description:
        "Paket umrah dengan perlengkapan kebutuhan ibadah yang lengkap",
    },
    {
      icon: <FaUserAlt />,
      title: "TL/ Mutawwif",
      description:
        "Umrah ditemani dengan leader dan Muthawif yang tersertifikasi",
    },
    {
      icon: <FaHotel />,
      title: "Hotel Penginapan",
      description: "Akomodasi hotel / penginapan terbaik dan ternyaman",
    },
    {
      icon: <FaBus />,
      title: "Transportasi",
      description: "Transportasi untuk memudahkan perjalanan jamaah",
    },
    {
      icon: <FaUsers />,
      title: "Tim Professional Saudi",
      description:
        "Tim professional dari Saudi untuk melancarkan kegiatan para jamaah",
    },
    {
      icon: <FaPlaneDeparture />,
      title: "Tiket Pesawat",
      description: "Tiket pesawat PP untuk keperluan berangkat ke tanah suci",
    },
    {
      icon: <FaCamera />,
      title: "Dokumentasi",
      description: "Dokumentasi untuk jamaah selama ibadah di tanah suci",
    },
  ];

  // const facilitiesGroupOne = facilities.slice(0, 2);
  // const facilitiesGroupTwo = facilities.slice(2, 4);
  // const facilitiesGroupThree = facilities.slice(4, 6);
  // const facilitiesGroupFour = facilities.slice(6, 8);
  // const facilitiesGroupFive = facilities.slice(8);

  const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => (
    <div
      className="group relative mt-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
      data-aos="fade-up"
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-full bg-[#222636] p-4 shadow-md">
        <span className="text-4xl text-white sm:text-3xl">{facility.icon}</span>
      </div>

      <div className="mt-10">
        <h3 className="mb-2 text-2xl font-bold text-gray-800 sm:text-xl">
          {facility.title}
        </h3>
        <p className="text-lg text-gray-600 sm:text-base">
          {facility.description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-[#222636] from-blue-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-50"></div>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] p-4 text-center sm:p-6 md:p-10" id="Fasilitas">
      <div className="mb-2 flex items-center justify-center">
        <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
        <h2 className="text-xl font-black whitespace-nowrap text-[#222636] md:text-2xl lg:text-3xl xl:text-4xl">
          FASILITAS JAMAAH
        </h2>
        <div className="mx-4 h-px flex-grow bg-[#222636] md:mx-6"></div>
      </div>

      <p className="mb-6 text-lg text-[#222636] sm:mb-8 md:text-xl">
        Fasilitas yang kami sediakan untuk kenyamanan ibadah Anda
      </p>

      {/* Tampilan Desktop */}
      <div className="hidden grid-cols-3 gap-8 px-4 md:grid lg:px-6 xl:px-20">
        {facilities.map((facility, index) => (
          <FacilityCard facility={facility} index={index} key={index} />
        ))}
      </div>

      <div className="space-y-8 md:hidden">
        {facilities.map((facility, index) => (
          <FacilityCard facility={facility} index={index} key={index} />
        ))}
      </div>

      {/* Tampilan Mobile */}
      {/* <div className="md:hidden space-y-8">
        {[facilitiesGroupOne, facilitiesGroupTwo, facilitiesGroupThree, facilitiesGroupFour].map(
          (group, groupIndex) => (
            <div className="grid grid-cols-2 gap-4 sm:gap-6" key={groupIndex}>
              {group.map((facility, index) => (
                <FacilityCard facility={facility} index={index + groupIndex * 2} key={index + groupIndex * 2} />
              ))}
            </div>
          )
        )}

        <div className="mx-auto max-w-xs">
          {facilitiesGroupFive.map((facility, index) => (
            <FacilityCard facility={facility} index={index + 8} key={index + 8} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Fasilitas;
