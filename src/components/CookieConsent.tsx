import { useEffect, useState } from "react";

const CookieConsent: React.FC = () => {
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted" || consent === "rejected") {
      setConsentGiven(true);
    }
  }, []);

  const handleConsent = async (accepted: boolean) => {
    const status = accepted ? "accepted" : "rejected";
    localStorage.setItem("cookie_consent", status);

    try {
      await fetch("/web/cookie-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ consent: accepted }),
      });
    } catch (error) {
      console.error("Failed to send cookie consent:", error);
    }

    setConsentGiven(true);
  };

  if (consentGiven) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white p-6 shadow-xl">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="mb-1 text-lg font-semibold text-gray-800">
            Your privacy matters.
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Al Habsa uses necessary cookies to personalize content and ads, to
            provide social media features, and to analyze our traffic. We also
            share information about your use of our site with our social media,
            advertising and analytics partners who may combine it with other
            information that you’ve provided to them or that they’ve collected
            from your use of their services. <br />
            By accepting, you agree to the use of these cookies. To learn more,
            view our{" "}
            <a
              href="/cookie-policy"
              className="text-[#2E3650] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie Policy
            </a>{" "}
            &{" "}
            <a
              href="/privacy-policy"
              className="text-[#2E3650] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent(true)}
            className="flex items-center gap-2 rounded bg-[#222636] px-4 py-2 text-sm text-white hover:bg-[#2E3650]"
          >
            <i className="fas fa-check"></i> Accept
          </button>
          <button
            onClick={() => handleConsent(false)}
            className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
