"use client";
import React from 'react';

const MediaSection = () => {
  const mediaItems = [
    {
      source: "Winnipeg Sun",
      title: "Manitoban creates app that detects products made in Canada",
      url: "https://winnipegsun.com/news/provincial/manitoban-creates-app-that-detects-products-made-in-canada",
      logo: "ws.png"
    },
    {
      source: "Winnipeg Free Press",
      title: "Touchscreen on pulse of buy-Canadian surge",
      url: "https://www.winnipegfreepress.com/business/2025/02/14/touchscreen-on-pulse-of-buy-canadian-surge",
      logo: "fp.png.webp"
    },
    {
      source: "Brandon Sun",
      title: "Brandonite develops app to help shoppers buy Canadian",
      url: "https://www.brandonsun.com/local/2025/02/15/brandonite-develops-app-to-help-shoppers-buy-canadian",
      logo: "bs.png"
    },
    {
      source: "CBC Radio",
      title: "New app CanMade developed in Brandon",
      url: "https://www.cbc.ca/listen/live-radio/1-101-radio-noon-manitoba/clip/16129218-new-app-canmade-developed-brandon",
      logo: "CBC_logo.svg"
    },
    {
      source: "CTV News",
      title: "Brandon developer's app helps consumers buy Canadian",
      url: "https://www.ctvnews.ca/winnipeg/article/manitoba-man-creates-app-to-help-you-shop-for-canadian-products/",
      logo: "ct.png"
    }
  ];

  return (
    <section className="w-full py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-lg font-semibold text-gray-600 mb-12 text-center">Featured In</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 items-center justify-items-center">
          {mediaItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-105 w-full flex justify-center"
              title={item.title}
            >
              <img
                src={item.logo}
                alt={`${item.source} logo`}
                className="h-12 md:h-14 lg:h-16 w-auto object-contain max-w-full"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;