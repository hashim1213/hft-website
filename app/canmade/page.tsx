'use client'

import React, { useState } from 'react';
import { Scan, ShoppingBag, Heart, Building, Database, Mail, Menu, X, Award, ArrowRight, Clock, Globe } from 'lucide-react';
import { FeatureCard } from '@/components/featurecard';
import { BenefitCard } from '@/components/benefitcard';
import Image from 'next/image';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-red-600 text-white p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image 
              src="/app-logo.png"
              alt="CanMade Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <div className="text-2xl font-bold">CanMade</div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-red-200">Features</a>
            <a href="#media" className="hover:text-red-200">Press</a>
            <a href="#why" className="hover:text-red-200">Why Choose Us</a>
            <a href="#collaborate" className="hover:text-red-200">Collaborate</a>
            <a href="/canmade/privacy" className="hover:text-red-200">Privacy Policy</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-red-600 border-t border-red-500 p-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="hover:text-red-200" onClick={toggleMenu}>Features</a>
              <a href="#media" className="hover:text-red-200" onClick={toggleMenu}>Press</a>
              <a href="#why" className="hover:text-red-200" onClick={toggleMenu}>Why Choose Us</a>
              <a href="#collaborate" className="hover:text-red-200" onClick={toggleMenu}>Collaborate</a>
              <a href="/canmade/privacy" className="hover:text-red-200" onClick={toggleMenu}>Privacy Policy</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-red-600 to-red-500 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Canadian Products</h1>
              <p className="text-xl mb-8">Scan barcodes to instantly verify if products are made in Canada. Join thousands of Canadians supporting local businesses.</p>
              <div className="space-y-4">
                <a 
                  href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-100 transition-colors"
                >
                  <span>Download for iOS</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <p className="text-sm font-medium text-white/90">Coming Soon to Android</p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/4.png"
                  alt="CanMade App Screenshot 1"
                  width={240}
                  height={480}
                  className="rounded-xl transform rotate-6"
                />
                <Image
                  src="/5.png"
                  alt="CanMade App Screenshot 2"
                  width={240}
                  height={480}
                  className="rounded-xl transform -rotate-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

 

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Scan className="w-12 h-12 text-red-600" />}
              title="Smart Barcode Scanner"
              description="Instantly scan and verify product origins with our advanced recognition technology"
            />
            <FeatureCard 
              icon={<ShoppingBag className="w-12 h-12 text-red-600" />}
              title="Detailed Product Info"
              description="Access comprehensive product details, manufacturing location, and Canadian certification"
            />
            <FeatureCard 
              icon={<Database className="w-12 h-12 text-red-600" />}
              title="Growing Database"
              description="Access our extensive database of Canadian products, updated daily by our community"
            />
            <FeatureCard 
              icon={<Clock className="w-12 h-12 text-red-600" />}
              title="Real-time Updates"
              description="Stay informed with the latest additions to our Canadian product database"
            />
            <FeatureCard 
              icon={<Globe className="w-12 h-12 text-red-600" />}
              title="National Coverage"
              description="Find Canadian-made products across all provinces and territories"
            />
            <FeatureCard 
              icon={<Award className="w-12 h-12 text-red-600" />}
              title="Open Source Information"
              description="We are currently using an opensouce API but are in the development of our own"
            />
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section id="why" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CanMade?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitCard
              icon={<Building className="w-12 h-12 text-red-600" />}
              title="Empower Local Economy"
              description="Every scan and purchase through CanMade directly supports Canadian businesses and strengthens our local economy"
            />
            <BenefitCard
              icon={<Heart className="w-12 h-12 text-red-600" />}
              title="Community-Driven Platform"
              description="Join thousands of Canadians contributing to and benefiting from our growing database of local products"
            />
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaborate" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in building Canada&apos;s most comprehensive database of locally made products. 
              Whether you&apos;re a manufacturer, retailer, or media outlet, we&apos;d love to collaborate!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">For Manufacturers</h3>
              <p className="text-gray-600 mb-6">
                Verify your products&apos; Canadian origin and reach conscious consumers directly. 
                Get detailed insights about your product visibility and consumer engagement.
              </p>
              <div className="flex items-center space-x-2 text-red-600">
                <Mail className="w-6 h-6" />
                <a href="mailto:hello@bytesavy.com" className="hover:text-red-700 font-medium">
                  Contact Our Team
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">For Media</h3>
              <p className="text-gray-600 mb-6">
                Get the latest statistics, success stories, and insights about Canadian manufacturing 
                and consumer behavior. Access our press kit and request interview opportunities.
              </p>
              <div className="flex items-center space-x-2 text-red-600">
                <Mail className="w-6 h-6" />
                <a href="mailto:press@bytesavy.com" className="hover:text-red-700 font-medium">
                  Press Inquiries
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-red-600 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Start Supporting Canadian Businesses Today</h2>
          <p className="text-xl mb-8">Join thousands of Canadians making informed shopping decisions</p>
          <div className="space-y-4">
            <a 
              href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-red-100 transition-colors"
            >
              <span>Download for iOS</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            <p className="text-sm text-white/90">Android Version Coming Soon</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <Image 
                src="/app-logo.png"
                alt="CanMade Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <h3 className="text-xl font-bold">CanMade</h3>
                <p className="text-gray-400">Supporting Canadian businesses</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#media" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#why" className="text-gray-400 hover:text-white">Why Choose Us</a></li>
                <li><a href="#collaborate" className="text-gray-400 hover:text-white">Collaborate</a></li>
                <li><a href="/canmade/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  <a href="mailto:hello@bytesavy.com" className="hover:text-white">
                    hello@bytesavy.com
                  </a>
                </li>
                <li className="text-gray-400">
                  <a href="mailto:press@bytesavy.com" className="hover:text-white">
                    press@bytesavy.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Download</h3>
              <div className="space-y-4">
                <a 
                  href="https://apps.apple.com/ca/app/canmade-canadian-made/id6741483305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm"
                >
                  Download for iOS
                </a>
                <p className="text-sm text-gray-400">Android Version Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} CanMade. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;