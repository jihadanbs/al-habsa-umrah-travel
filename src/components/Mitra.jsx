import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const Mitra = () => {
    const airlines = [
      { src: "/img/mitra/garuda.svg", alt: "Garuda Indonesia" },
      { src: "/img/mitra/etihad.svg", alt: "Etihad Air" },
      { src: "/img/mitra/emirates.svg", alt: "Emirates" },
      { src: "/img/mitra/garuda.svg", alt: "Garuda Indonesia" },
      { src: "/img/mitra/etihad.svg", alt: "Etihad Air" },
      { src: "/img/mitra/emirates.svg", alt: "Emirates" },
     
    ];
  
    const banks = [
      { src: "/img/mitra/bca.svg", alt: "BCA" },
      { src: "/img/mitra/bni.svg", alt: "BNI" },
      { src: "/img/mitra/bank-mandiri.svg", alt: "Mandiri" },
      { src: "/img/mitra/bca.svg", alt: "BCA" },
      { src: "/img/mitra/bni.svg", alt: "BNI" },
      { src: "/img/mitra/bank-mandiri.svg", alt: "Mandiri" },
    
    ];
  
    return (
      <div className="p-8">
        {/* Bagian logo pesawat terbang */}
        <div className="mb-4">
          <InfiniteMovingCards items={airlines} direction="right" speed="slow" />
        </div>
  
        {/* Bagian logo bank */}
        <div>
          <InfiniteMovingCards items={banks} direction="left" speed="slow" />
        </div>
      </div>
    );
  };
  
  export default Mitra;
  