// import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Mitra = () => {
    const airlines = [
      { src: "/img/mitra/etihad.svg", alt: "Etihad Air" },
      { src: "/img/mitra/emirates-airlanes.svg", alt: "Emirates" },
      { src: "/img/mitra/garuda-indonesia.svg", alt: "Garuda Indonesia" },
      { src: "/img/mitra/oman-air.svg", alt: "Oman Air" },
      { src: "/img/mitra/qatar.svg", alt: "Qatar Airways" },
      { src: "/img/mitra/saudi.svg", alt: "Saudi Arabian Airlanes" },
    ];
  
    const banks = [
      { src: "/img/mitra/bca.svg", alt: "BCA" },
      { src: "/img/mitra/bni.svg", alt: "BNI" },
      { src: "/img/mitra/bank-mandiri.svg", alt: "Mandiri" },
    ];
  
    return (
      <div className="p-8">
        {/* Bagian logo pesawat terbang */}
        <div className="mb-4">
          <InfiniteMovingCards items={airlines} direction="right" speed="slow" imageClassName="w-50 h-20 object-contain" />
        </div>
  
        {/* Bagian logo bank */}
        <div>
          <InfiniteMovingCards items={banks} direction="left" speed="slow" imageClassName="w-30 h-12 object-contain" />
        </div>
      </div>
    );
  };
  
  export default Mitra;
  