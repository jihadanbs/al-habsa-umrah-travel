import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

// Definisi tipe untuk NavItem
interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean; // Menandakan apakah ini adalah route atau anchor hash
}

// Definisi tipe untuk Tab props
interface TabProps {
  children: React.ReactNode;
  href: string;
  index: number;
  isRoute?: boolean;
}

// Definisi tipe untuk Position
interface Position {
  left: number;
  width: number;
  opacity: number;
}

// Perbaikan untuk PageProps - menambahkan index signature
interface PageProps {
  url: string;
  [key: string]: unknown; // Menambahkan index signature
}

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isSearchModalOpen,
  setIsSearchModalOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const tracingBeamRef = useRef<HTMLDivElement | null>(null);
  const mobileTracingBeamRef = useRef<HTMLDivElement | null>(null);

  // Lock scroll when modal/menu open
  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isSearchModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen, isSearchModalOpen]);

  // Smooth scroll on hash navigation
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
      updateTracingBeam();
    };

    const updateTracingBeam = (): void => {
      if (tracingBeamRef.current && mobileTracingBeamRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        const progress = scrollTop / (scrollHeight - clientHeight);

        // Desktop tracing beam
        tracingBeamRef.current.style.width = `${progress * 100}%`;
        tracingBeamRef.current.style.opacity = scrollTop > 5 ? "1" : "0";

        // Mobile tracing beam - same progress calculation
        mobileTracingBeamRef.current.style.width = `${progress * 100}%`;
        mobileTracingBeamRef.current.style.opacity = scrollTop > 5 ? "1" : "0";
      }
    };

    window.addEventListener("scroll", handleScroll);
    updateTracingBeam();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi navigasi yang diperbaiki
  const handleNavigation = (href: string, isRoute: boolean = false): void => {
    if (isRoute) {
      // Gunakan 'navigate' dari react-router-dom
      navigate(`/${href}`);
    } else {
      if (pathname === "/") {
        // Jika sudah di halaman utama, scroll ke section
        setTimeout(() => {
          document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        // Jika di halaman lain, navigasi ke halaman utama lalu scroll
        navigate(`/#${href}`);
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navItems: NavItem[] = [
    { label: "Beranda", href: "Home", isRoute: false },
    { label: "Pemesanan", href: "Book", isRoute: false },
    { label: "Tentang Kami", href: "About", isRoute: false },
    { label: "Galeri", href: "Galeri", isRoute: false },
    { label: "Kontak", href: "contact", isRoute: true }, // Ditandai sebagai route
  ];

  // Custom Tab component untuk SlideTab effect
  const Tab: React.FC<TabProps> = ({
    children,
    href,
    index,
    isRoute = false,
  }) => {
    const ref = useRef<HTMLLIElement | null>(null);

    return (
      <li
        ref={ref}
        onClick={() => handleNavigation(href, isRoute)}
        onMouseEnter={() => {
          if (!ref?.current) return;
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
          setActiveTab(index);
        }}
        className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs font-medium uppercase md:px-4 md:py-2 md:text-sm"
      >
        <span
          className={`${
            activeTab === index && isScrolled ? "text-[#222636]" : ""
          }`}
        >
          {children}
        </span>
      </li>
    );
  };

  // Animasi untuk menu mobile
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Komponen Motion Link yang menggabungkan fitur motion dengan <a>
  const MotionLink: React.FC<{
    href: string;
    className: string;
    children: React.ReactNode;
  }> = ({ href, className, children }) => {
    return (
      <motion.a href={href} className={className} whileTap={{ scale: 0.98 }}>
        {children}
      </motion.a>
    );
  };

  return (
    <div className="relative z-50">
      {/* Desktop Navbar */}
      <div
        className={`fixed top-0 left-0 z-50 hidden w-full transition-all duration-300 md:block ${
          isScrolled
            ? "bg-white text-white shadow-md"
            : "bg-transparent bg-gradient-to-t from-transparent to-black/30 text-white"
        }`}
      >
        {/* Tracing Beam */}
        <div className="absolute top-0 right-0 left-0 h-0.5 overflow-hidden bg-transparent">
          <div
            ref={tracingBeamRef}
            className="h-full w-0 bg-gradient-to-r from-[#2a3d66] to-[#7fc9ff] opacity-0 transition-opacity duration-300"
            style={{ boxShadow: "0 0 8px 1px rgba(127, 201, 255, 0.4)" }}
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex cursor-pointer items-center">
            <img src="/img/alhabsalogo.png" alt="Logo" className="mr-8 h-8" />
          </div>

          {/* Modernized NavTabs */}
          <nav className="flex items-center justify-center">
            <ul
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));
                setActiveTab(null);
              }}
              className={`border-opacity-20 relative flex w-fit rounded-full border p-1 ${
                isScrolled
                  ? "border-white/30 bg-[#222636] backdrop-blur-sm"
                  : "border-white/30 bg-black/20 backdrop-blur-sm"
              }`}
            >
              {navItems.map((item, index) => (
                <Tab
                  key={item.href}
                  href={item.href}
                  index={index}
                  isRoute={item.isRoute}
                >
                  {item.label}
                </Tab>
              ))}
              <motion.li
                animate={{
                  ...position,
                }}
                className={`absolute z-0 h-9 rounded-full ${
                  isScrolled ? "bg-white" : "bg-[#222636]"
                }`}
              />
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className={`group rounded-full p-2 ${
                isScrolled
                  ? "text-white hover:bg-gray-500"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${isScrolled ? "stroke-black" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <Link
              to="/login"
              className={`pointer-events-none flex items-center gap-2 font-medium duration-300 ${
                isScrolled
                  ? "text-[#222636] hover:font-semibold"
                  : "text-white hover:text-gray-200"
              }`}
            >
              <FaRegCircleUser className="text-2xl" />
              <span>MASUK</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-start bg-white"
          >
            <div className="w-full p-4">
              <div className="mx-auto flex max-w-4xl items-center">
                <img
                  src="/img/alhabsalogo.png"
                  alt="Logo"
                  className="mr-4 h-8"
                />
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Cari kata kunci apa saja.."
                    className="w-full border-b border-gray-300 px-2 py-2 text-xl focus:border-[#222636] focus:outline-none"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="ml-4 text-gray-700 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <div
        className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 md:hidden ${
          isScrolled
            ? "bg-white shadow-md"
            : "bg-transparent bg-gradient-to-t from-transparent to-black/30"
        }`}
      >
        <div className="absolute top-0 right-0 left-0 h-0.5 overflow-hidden bg-transparent">
          <div
            ref={mobileTracingBeamRef}
            className="h-full bg-gradient-to-r from-[#2a3d66] to-[#7fc9ff] opacity-0 transition-opacity duration-300"
            style={{ boxShadow: "0 0 8px 1px rgba(127, 201, 255, 0.4)" }}
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <img src="/img/alhabsalogo.png" alt="Logo" className="h-8" />
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className={`rounded-full p-2 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`rounded-full p-2 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - dengan animasi */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background overlay dengan animasi */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={backdropVariants}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu container dengan animasi slide dari kanan */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 bottom-0 z-50 w-5/5 overflow-y-auto bg-white shadow-lg md:hidden"
            >
              <div className="p-4">
                <div className="mb-6 flex items-center justify-between">
                  <img src="/img/alhabsalogo.png" alt="Logo" className="h-10" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full p-2 text-black transition-colors hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modern Mobile Menu Items dengan animasi stagger */}
                <div className="mt-8 mb-6 flex justify-center">
                  <ul className="relative flex w-full flex-col space-y-1 rounded-xl border border-gray-200 bg-white/50 p-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        onClick={() =>
                          handleNavigation(item.href, item.isRoute)
                        }
                        className="relative z-10 block cursor-pointer rounded-lg px-4 py-3 text-lg text-black transition-colors hover:bg-black/5"
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div variants={itemVariants} className="mt-6">
                  {/* Menggunakan komponen MotionLink untuk menggabungkan motion dengan anchor */}
                  <MotionLink
                    href="/login"
                    className="pointer-events-none mt-4 flex items-center justify-center gap-3 rounded-full bg-[#222636] px-4 py-3 text-lg text-white transition-opacity hover:opacity-90"
                  >
                    <FaRegCircleUser className="text-xl" />
                    Masuk
                  </MotionLink>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
