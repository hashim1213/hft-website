'use client'

import React from 'react';
import { Shield, Lock, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-red-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/canmade" className="text-2xl font-bold">CanMade</a>
          <a href="/canmade" className="hover:text-red-200">Back to Home</a>
        </div>
      </nav>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold">No Data Collection</h2>
            </div>
            <p className="text-gray-700 mb-4">
              At CanMade, we prioritize your privacy. Our app:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Does not collect any personal information</li>
              <li>Does not store any data from your scans</li>
              <li>Does not track your usage or behavior</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold">How The App Works</h2>
            </div>
            <p className="text-gray-700">
              CanMade operates with complete transparency:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Scans are processed locally on your device</li>
              <li>No information is sent to our servers</li>
              <li>No cookies or tracking mechanisms are used</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            </div>
            <p className="text-gray-700">
              We use the Open Food Facts API to retrieve product information. When you scan a product:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Only the barcode number is sent to query the database</li>
              <li>No personal information is transmitted</li>
              <li>No scan history is maintained</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about our privacy policy or how our app works, please contact us at Hello@bytesavy.com
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <p>Last updated: February 2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;