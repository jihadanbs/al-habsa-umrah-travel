import AccessibilityPanel from "../components/AccessibilityPanel";
import Card from "../components/card/Card";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Navbar from "../components/navbar";
import SocialIcons from "../components/SocialIcons";
import { useState } from "react";
import type { CardPagesProps } from "@/types";

const CardPages: React.FC<CardPagesProps> = ({ umrahPackages }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  return (
    <>
      <title>Paket Umrah</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />
      <Card umrahPackages={umrahPackages} />
      <CookieConsent />
      <SocialIcons />
    </>
  );
};

export default CardPages;
