'use client'

import React from 'react';
import { Github, Linkedin, Mail, Globe, Phone, UserPlus } from 'lucide-react';
import Image from 'next/image';

const apps = [
  {
    name: "FlashIQ",
    description: "A smart flashcard study app that allows users to study any subjects. Uses the latest and best study methods.",
    icon: "/flashiq.png",
    appStoreLink: "https://flashiqapp.com"
  },
  {
    name: "SnapTrack",
    description: "Habit tracking app that allows users to track their habbits one snap at a time.",
    icon: "/snaptrack.png",
    appStoreLink: "https://apps.apple.com/ca/app/snaptrack-habit-tracker/id6740051692"
  },
  {
    name: "SwiftRide",
    description: "Winnipeg Transit app that allows users to find their next bus on time.",
    icon: "/swiftride.jpg",
    appStoreLink: "https://apps.apple.com/ca/app/swiftride-winnipeg-transit/id6472630133"
  }
];

const DigitalCard = () => {
  const generateVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Hashim
N:Hashim;;;
TITLE:Founder/Lead Developer
ORG:Bytesavy Technologies
TEL;TYPE=CELL:+12049999999
EMAIL;TYPE=WORK:hashim@bytesavy.com
URL;TYPE=WORK:https://bytesavy.com
URL;TYPE=GitHub:https://github.com/hashim1213
URL;TYPE=LinkedIn:https://www.linkedin.com/in/hashim-farooq-778736122/
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'hashim_contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Profile Section */}
        <div className="relative">
          {/* Banner Image */}
          <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative flex items-center">
            <div className="relative h-16 w-48 ml-6 animate-slideInRight">
              <Image 
                src="/logo_white.png"
                alt="Bytesavy Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scaleIn">
            <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
              <Image 
                src="/hashim.jpeg"
                alt="Hashim's profile"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 px-6 pb-8">
          {/* Name and Title */}
          <div className="text-center mb-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <h1 className="text-2xl font-bold text-gray-900">Hashim</h1>
            <p className="text-blue-600 font-medium mt-1">Founder/Lead Developer</p>
            <p className="text-gray-600 text-sm mt-2">Building amazing digital experiences at Bytesavy Technologies</p>
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={generateVCard}
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-xl active:bg-green-700 active:scale-95 transition-transform"
            >
              <UserPlus size={20} />
              <span>Add Contact</span>
            </button>

            <a 
              href="tel:+12049999999" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl active:bg-blue-700 active:scale-95 transition-transform"
            >
              <Phone size={20} />
              <span>Call Me</span>
            </a>

            <a 
              href="mailto:hashim@bytesavy.com" 
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 text-gray-700 rounded-xl active:bg-gray-200 active:scale-95 transition-transform"
            >
              <Mail size={20} />
              <span>Email Me</span>
            </a>

            <div className="flex justify-center gap-4 mt-6">
              {[
                { icon: <Github size={24} />, href: "https://github.com/hashim1213" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/hashim-farooq-778736122/" },
                { icon: <Globe size={24} />, href: "https://bytesavy.com" }
              ].map((social) => (
                <a 
                  key={social.href}
                  href={social.href}
                  className="p-3 rounded-full bg-gray-100 active:bg-gray-200 active:scale-95 transition-transform text-gray-700"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Apps Section */}
          <div className="mt-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Apps</h2>
            <div className="space-y-4">
              {apps.map((app, index) => (
                <a
                  key={app.name}
                  href={app.appStoreLink}
                  className="block bg-gray-50 rounded-xl p-4 active:bg-gray-100 active:scale-95 transition-transform"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={app.icon}
                        alt={`${app.name} icon`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCard;