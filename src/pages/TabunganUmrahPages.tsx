import AccessibilityPanel from "../components/AccessibilityPanel";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import SocialIcons from "../components/SocialIcons";
import TabunganUmrahSimulator from "../components/TabunganUmrahSimulator";
import { useState } from "react";

interface Props {
  umrahPackages: any[][];
}

const TabunganUmrahPage: React.FC<Props> = ({ umrahPackages }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  return (
    <div>
      <title>Simulator Tabungan Umrah</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />
      <TabunganUmrahSimulator umrahPackages={umrahPackages} />
      <CookieConsent />
      <SocialIcons />
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default TabunganUmrahPage;
