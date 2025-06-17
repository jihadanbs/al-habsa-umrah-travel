import AccessibilityPanel from "../components/AccessibilityPanel";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import Process from "../components/process-step/ProcessSteps";
import SocialIcons from "../components/SocialIcons";
import { useState } from "react";

const ProcessSteps = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  return (
    <>
      <title>Proses Pemesanan</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />
      <Process />
      <CookieConsent />
      <Footer />
      <SocialIcons />
    </>
  );
};

export default ProcessSteps;
