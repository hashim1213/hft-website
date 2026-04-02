"use client";

import Image from "next/image";
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useState } from 'react';
import React from 'react';

export default function TopBar() {
  const { language, setLanguage } = useLanguage();
  const [languageOpen, setLanguageOpen] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setLanguageOpen(false);
      }
    };

    if (languageOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [languageOpen]);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-end h-10">
          <div className="flex items-center gap-4 text-sm">
            {/* Country */}
            <div className="flex items-center gap-2">
              <div className="relative h-4 w-6">
                <Image
                  src="/canada-flag.png"
                  alt="Canada"
                  fill
                  className="object-contain rounded"
                />
              </div>
              <span className="text-gray-700 font-medium">CA</span>
            </div>

            {/* Language Selector */}
            <div className="relative language-selector">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                <LanguageIcon sx={{ fontSize: 16 }} className="text-gray-600" />
                <span className="text-gray-700 font-medium">
                  {language.toUpperCase()}
                </span>
                <KeyboardArrowDownIcon
                  sx={{ fontSize: 14 }}
                  className={`transition-transform ${languageOpen ? 'rotate-180' : ''} text-gray-600`}
                />
              </button>

              {/* Language Dropdown */}
              {languageOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {Object.entries(languages).map(([code, lang]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code as 'en' | 'fr' | 'es');
                        setLanguageOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                        language === code ? 'bg-gray-50 font-medium' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-gray-700">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
