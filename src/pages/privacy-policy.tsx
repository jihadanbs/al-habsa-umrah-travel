import AccessibilityPanel from "../components/AccessibilityPanel";
import HeaderCard from "../components/card/HeaderCard";
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import SocialIcons from "../components/SocialIcons";
import { useState } from "react";

const PrivacyPolicy: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  return (
    <>
      <title>Privacy Policy</title>
      {!isMobileMenuOpen && !isSearchModalOpen && <AccessibilityPanel />}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      <HeaderCard />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">
          Privacy Policy
        </h1>
        <p className="mb-4 text-gray-700">
          At Al Habsa, we are committed to protecting your personal information
          and your right to privacy. This Privacy Policy explains what
          information we collect, how we use it, and what rights you have in
          relation to it.
        </p>

        <h2 className="mt-6 mb-2 text-xl font-semibold text-gray-800">
          Information We Collect
        </h2>
        <p className="mb-4 text-gray-700">
          We collect personal information that you voluntarily provide to us
          when you register on the website, express an interest in obtaining
          information about us or our services, or otherwise contact us.
        </p>

        <h2 className="mt-6 mb-2 text-xl font-semibold text-gray-800">
          How We Use Your Information
        </h2>
        <p className="mb-4 text-gray-700">
          We use the information we collect or receive to communicate with you,
          fulfill our services, respond to inquiries, and improve our platform.
          We may also use your information for security, fraud prevention, and
          legal compliance.
        </p>

        <h2 className="mt-6 mb-2 text-xl font-semibold text-gray-800">
          Sharing Your Information
        </h2>
        <p className="mb-4 text-gray-700">
          We do not share your personal information with third parties except to
          comply with laws, provide you with services, or fulfill business
          obligations. We may share data with service providers, contractors, or
          affiliates to help us operate the website.
        </p>

        <h2 className="mt-6 mb-2 text-xl font-semibold text-gray-800">
          Your Privacy Rights
        </h2>
        <p className="mb-4 text-gray-700">
          You may review, change, or terminate your account at any time. If you
          have questions or concerns about your data, please contact us.
        </p>

        <p className="mt-8 text-sm text-gray-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
      <CookieConsent />
      <Footer />
      <SocialIcons />
    </>
  );
};

export default PrivacyPolicy;
