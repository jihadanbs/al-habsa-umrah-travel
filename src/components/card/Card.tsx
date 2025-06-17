import type { CardProps } from "@/types";
import UmrahCardFilter from "./UmrahCardFilter";
import Footer from "../Footer";

const Card: React.FC<CardProps> = ({ umrahPackages }) => {
  return (
    <>
      <title>Paket Umrah</title>
      <div className="min-h-screen bg-gray-50">
        <UmrahCardFilter umrahPackages={umrahPackages} />
      </div>
      <Footer />
    </>
  );
};

export default Card;
