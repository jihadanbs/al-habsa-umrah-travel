// import React from 'react'; React 19 Tidak Lagi Membutuhkan import React

const Footer = () => {
  return (
    <footer className="bg-[#D3D3D3] text-[#222636] py-4 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Al Habsa . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;