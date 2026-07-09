"use client";

import { useState, useEffect } from "react";
import { DismissRegular } from "@fluentui/react-icons";

export default function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the banner
    const dismissed = localStorage.getItem("privacy-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("privacy-banner-dismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 pr-10">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Dismiss"
        >
          <DismissRegular className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 mb-2">
          <img
            src="/cookie.png"
            alt="Cookie"
            className="w-8 h-8 flex-shrink-0"
          />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Legally-required privacy notice
          </h3>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          Bytesavy.com doesn&apos;t use cookies or track you.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          No data is sent to third parties.
        </p>

        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          (We only collect anonymous page views to improve performance.)
        </p>
      </div>
    </div>
  );
}
