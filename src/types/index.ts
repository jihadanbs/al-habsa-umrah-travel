import type { BookingPackageData } from "@/data/booking-packages";
import type { CardPackageData } from "@/data/card-packages";

// Ekspor kembali agar bisa digunakan di tempat lain
export type { BookingPackageData, CardPackageData };

// Definisikan tipe props untuk setiap komponen HALAMAN
// App akan menggunakan data booking
export interface AppProps {
  umrahPackages: BookingPackageData[];
}

// CardPages akan menggunakan data card yang lebih detail
export interface CardPagesProps {
  umrahPackages: CardPackageData[];
}

// Definisikan juga props untuk komponen anak jika perlu
export interface CardProps {
  umrahPackages: CardPackageData[];
}

export interface UmrahCardFilterProps {
  umrahPackages: CardPackageData[];
}
