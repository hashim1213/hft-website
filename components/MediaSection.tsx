"use client";
import React from 'react';

const MediaSection = () => {
  const mediaItems = [
    {
      source: "Winnipeg Sun",
      title: "Manitoban creates app that detects products made in Canada",
      url: "https://winnipegsun.com/news/provincial/manitoban-creates-app-that-detects-products-made-in-canada",
      logo: "wpg_sun.png"
    },
    {
      source: "Winnipeg Free Press",
      title: "Touchscreen on pulse of buy-Canadian surge",
      url: "https://www.winnipegfreepress.com/business/2025/02/14/touchscreen-on-pulse-of-buy-canadian-surge",
      logo: "free_press.jpg"
    },
    {
      source: "Brandon Sun",
      title: "Brandonite develops app to help shoppers buy Canadian",
      url: "https://www.brandonsun.com/local/2025/02/15/brandonite-develops-app-to-help-shoppers-buy-canadian",
      logo: "brandon_sun.png"
    },
    {
      source: "CBC Radio",
      title: "New app CanMade developed in Brandon",
      url: "https://www.cbc.ca/listen/live-radio/1-101-radio-noon-manitoba/clip/16129218-new-app-canmade-developed-brandon",
      logo: "cbc.jpg"
    },
    {
      source: "CTV News",
      title: "Brandon developer's app helps consumers buy Canadian",
      url: "https://www.ctvnews.ca/winnipeg/article/manitoba-man-creates-app-to-help-you-shop-for-canadian-products/",
      logo: "ctv.png"
    }
  ];

  return (
    <section className="w-full py-8 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <p className="text-sm font-medium text-gray-500 mb-6 text-center">Featured In</p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {mediaItems.map((item, index) => (
            <a 
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              title={item.title}
            >
              <img
                src={item.logo}
                alt={`${item.source} logo`}
                className="h-7 md:h-8 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSection;