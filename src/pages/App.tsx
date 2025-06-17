import About from "../components/About";
import AccessibilityPanel from "../components/AccessibilityPanel";
import Book from "../components/Book";
import UmrahPackagesPreview from "../components/UmrahPackagesPreview";
import CookieConsent from "../components/CookieConsent";
import Fasilitas from "../components/Fasilitas";
import Footer from "../components/Footer";
import Galeri from "../components/Galeri";
import Header from "../components/Header";
import Mitra from "../components/Mitra";
import SocialIcons from "../components/SocialIcons";
import UmrahSimulator from "../components/UmrahSimulator";
import Process from "../components/process-step/ProcessSteps";
import { useState } from "react";
import type { AppProps } from "@/types";
import "../app.css";

function App({ umrahPackages }: AppProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  return (
    <>
      <title>Beranda</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <Book umrahPackages={umrahPackages} />
      <About />
      <Process />
      <UmrahPackagesPreview umrahPackages={umrahPackages} />
      <Fasilitas />
      <Galeri />
      <Mitra />
      <UmrahSimulator />
      {/* <PhotoBooth/> */}
      <CookieConsent />
      <Footer />
      <SocialIcons />
    </>
  );
}

export default App;
