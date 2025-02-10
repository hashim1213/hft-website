'use client'
import React from 'react';
import { Shield, Lock, Database, BarChart, Search, Eye, Clock, AlertTriangle } from 'lucide-react';

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
              <h2 className="text-2xl font-semibold">Data Collection Overview</h2>
            </div>
            <p className="text-gray-700 mb-4">
              At CanMade, we're committed to transparency about how we collect and use data to improve your experience. We collect minimal, non-personal analytics data to help us understand how the app is used and make it better for everyone.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold">Analytics Data We Collect</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We use PostHog analytics to collect the following anonymous data:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Product Searches</h3>
                </div>
                <ul className="ml-7 mt-2 list-disc text-gray-700">
                  <li>Search terms used</li>
                  <li>Number of results found</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Product Views</h3>
                </div>
                <ul className="ml-7 mt-2 list-disc text-gray-700">
                  <li>Product barcode (no personal information)</li>
                  <li>Whether the product is Canadian</li>
                  <li>How you accessed the product (scan, search, or history)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Scan Information</h3>
                </div>
                <ul className="ml-7 mt-2 list-disc text-gray-700">
                  <li>Barcode numbers scanned</li>
                  <li>Scan success rate</li>
                  <li>Confidence scores</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold">Error Tracking</h3>
                </div>
                <ul className="ml-7 mt-2 list-disc text-gray-700">
                  <li>Type of error encountered</li>
                  <li>Generic error messages</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold">How We Use This Data</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We use this information to:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Improve the accuracy of product identification</li>
              <li>Understand which features are most useful</li>
              <li>Identify and fix technical issues</li>
              <li>Make the app more reliable and user-friendly</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold">Third-Party Services</h2>
            </div>
            <p className="text-gray-700 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>Open Food Facts API for product information</li>
              <li>PostHog for anonymous analytics</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Both services are used in compliance with privacy regulations and do not collect personal information.
            </p>
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