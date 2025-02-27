import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#222636] text-white py-4 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Al-Habsa . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;