import AccessibilityPanel from "../components/AccessibilityPanel";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import SocialIcons from "../components/SocialIcons";
import UmrahJourney from "../components/UmrahJourney";
import { useState } from "react";

const JourneyPages = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isUmrahModalOpen, setIsUmrahModalOpen] = useState<boolean>(false);

  return (
    <>
      <title>Journey</title>
      {!isMobileMenuOpen && !isSearchModalOpen && !isUmrahModalOpen && (
        <AccessibilityPanel />
      )}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />
      {/* KIRIM PROP onModalStateChange KE KOMPONEN UmrahJourney 
        Fungsi ini akan mengupdate state isUmrahModalOpen
      */}
      <UmrahJourney onModalStateChange={setIsUmrahModalOpen} />
      <CookieConsent />
      <Footer />
      <SocialIcons />
    </>
  );
};

export default JourneyPages;
