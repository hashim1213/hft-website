"use client";

import Image from "next/image";
import LanguageIcon from '@mui/icons-material/Language';

export default function TopBar() {
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

            {/* Language */}
            <div className="flex items-center gap-2">
              <LanguageIcon sx={{ fontSize: 16 }} className="text-gray-600" />
              <span className="text-gray-700 font-medium">EN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
