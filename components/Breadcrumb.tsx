'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://bytesavy.com${item.href}`
    }))
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 md:mb-8"
      >
        <ol
          className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={item.href}
                className="flex items-center gap-2"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Breadcrumb Link or Text */}
                {!isLast ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    itemProp="item"
                  >
                    {index === 0 && (
                      <Home className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-100"
                    itemProp="name"
                    aria-current="page"
                  >
                    {index === 0 && (
                      <Home className="w-4 h-4" aria-hidden="true" />
                    )}
                    {item.label}
                  </span>
                )}

                {/* Hidden position for structured data */}
                <meta itemProp="position" content={String(index + 1)} />

                {/* Separator */}
                {!isLast && (
                  <ChevronRight
                    className="w-4 h-4 text-gray-400 dark:text-gray-600"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
