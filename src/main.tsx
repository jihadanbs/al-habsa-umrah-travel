import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@smastrom/react-rating/style.css";

// Impor halaman Anda
import App from "./pages/App";
import CardPages from "./pages/CardPages";
import { bookingPackagesData } from "./data/booking-packages";
import { cardPackagesData } from "./data/card-packages";
import JourneyPages from "./pages/JourneyPages";
import TabunganUmrahPages from "./pages/TabunganUmrahPages";
import CookiePolicy from "./pages/cookie-policy";
import PrivacyPolicy from "./pages/privacy-policy";
import TermCondition from "./pages/term-condition";
import PaymentMethod from "./pages/payment-method";
import Contact from "./components/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App umrahPackages={bookingPackagesData} />,
  },
  {
    path: "/umrah-packages",
    element: <CardPages umrahPackages={cardPackagesData} />,
  },
  {
    path: "/umrah-journey",
    element: <JourneyPages />,
  },
  {
    path: "/umrah-savings-simulator",
    element: <TabunganUmrahPages umrahPackages={cardPackagesData} />,
  },
  {
    path: "/cookie-policy",
    element: <CookiePolicy />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/term-condition",
    element: <TermCondition />,
  },
  {
    path: "/payment-method",
    element: <PaymentMethod />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

// Dapatkan elemen root
const rootElement = document.getElementById("root");

// Pastikan elemen root ada sebelum me-render
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
