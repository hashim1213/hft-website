// Comprehensive Structured Data Schemas for SEO, AEO, and GEO optimization

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://bytesavy.com/#organization",
  "name": "Bytesavy Digital Solutions Inc.",
  "legalName": "Bytesavy Digital Solutions Inc.",
  "alternateName": ["Bytesavy", "ByteSavy"],
  "url": "https://bytesavy.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://bytesavy.com/logo.png",
    "width": 200,
    "height": 60
  },
  "description": "Leading agricultural software development company serving Manitoba, Alberta, Saskatchewan, and across Canada. Specializing in custom software development, mobile app development, and agtech solutions for agricultural operations. Expert developers creating farm management systems, crop tracking software, and agricultural business automation.",
  "foundingDate": "2020",
  "foundingLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Innovation Drive",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M5V 3A8",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.6426",
    "longitude": "-79.3871"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Canada"
    },
    {
      "@type": "State",
      "name": "Manitoba",
      "containedIn": {
        "@type": "Country",
        "name": "Canada"
      }
    },
    {
      "@type": "State",
      "name": "Alberta",
      "containedIn": {
        "@type": "Country",
        "name": "Canada"
      }
    },
    {
      "@type": "State",
      "name": "Saskatchewan",
      "containedIn": {
        "@type": "Country",
        "name": "Canada"
      }
    },
    {
      "@type": "City",
      "name": "Winnipeg",
      "containedIn": {
        "@type": "State",
        "name": "Manitoba"
      }
    },
    {
      "@type": "City",
      "name": "Calgary",
      "containedIn": {
        "@type": "State",
        "name": "Alberta"
      }
    },
    {
      "@type": "City",
      "name": "Edmonton",
      "containedIn": {
        "@type": "State",
        "name": "Alberta"
      }
    },
    {
      "@type": "City",
      "name": "Saskatoon",
      "containedIn": {
        "@type": "State",
        "name": "Saskatchewan"
      }
    },
    {
      "@type": "City",
      "name": "Regina",
      "containedIn": {
        "@type": "State",
        "name": "Saskatchewan"
      }
    },
    {
      "@type": "AdministrativeArea",
      "name": "Canadian Prairies"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-647-XXX-XXXX",
      "contactType": "Customer Service",
      "email": "hello@bytesavy.com",
      "availableLanguage": ["en-CA", "fr-CA"],
      "areaServed": "CA",
      "contactOption": "TollFree"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-647-XXX-XXXX",
      "contactType": "Sales",
      "email": "sales@bytesavy.com",
      "availableLanguage": ["en-CA"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-647-XXX-XXXX",
      "contactType": "Technical Support",
      "email": "support@bytesavy.com",
      "availableLanguage": ["en-CA"]
    }
  ],
  "sameAs": [
    "https://linkedin.com/company/bytesavy",
    "https://twitter.com/bytesavy",
    "https://github.com/bytesavy",
    "https://facebook.com/bytesavy",
    "https://instagram.com/bytesavy"
  ],
  "knowsAbout": [
    "Agricultural Software Development",
    "Agribusiness Technology",
    "Farm Management Software",
    "Precision Agriculture",
    "Crop Management Systems",
    "Agricultural Data Analytics",
    "Custom Software Development",
    "Mobile App Development",
    "Web Application Development",
    "Enterprise Software Solutions",
    "Cloud Computing",
    "API Development",
    "Database Design",
    "Business Automation",
    "Digital Transformation",
    "Legacy System Modernization",
    "AI Integration",
    "Software Development Manitoba",
    "Software Development Alberta",
    "Software Development Saskatchewan",
    "Canadian Software Development"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Agricultural Software Development",
        "description": "Custom software solutions for agricultural operations including farm management systems, crop tracking, and precision agriculture tools"
      },
      "areaServed": ["Manitoba", "Alberta", "Saskatchewan", "Canada"]
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Custom Software Development",
        "description": "Tailored software solutions built with modern technologies for agricultural businesses and organizations"
      },
      "areaServed": ["Manitoba", "Alberta", "Saskatchewan", "Canada"]
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Mobile App Development",
        "description": "iOS and Android mobile applications for agricultural field operations, data collection, and farm management"
      },
      "areaServed": ["Manitoba", "Alberta", "Saskatchewan", "Canada"]
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Web Application Development",
        "description": "Modern web-based platforms for agricultural data management, reporting, and business operations"
      },
      "areaServed": ["Manitoba", "Alberta", "Saskatchewan", "Canada"]
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Legacy System Modernization",
        "description": "Modernizing outdated agricultural systems with cloud-based solutions and modern interfaces"
      },
      "areaServed": ["Manitoba", "Alberta", "Saskatchewan", "Canada"]
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "AI & Automation Solutions",
        "description": "Intelligent automation and AI-powered workflows for agricultural data processing and analysis"
      },
      "areaServed": ["Manitoba", "Alberta", "Saskatchewan", "Canada"]
    }
  ],
  "slogan": "Transforming Ideas into Intelligent Digital Reality",
  "award": ["CanMade Certified", "Canadian Innovation Award"]
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bytesavy.com/#localbusiness",
  "name": "Bytesavy",
  "image": "https://bytesavy.com/logo.png",
  "priceRange": "$$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Innovation Drive",
    "addressLocality": "Toronto",
    "addressRegion": "Ontario",
    "postalCode": "M5V 3A8",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.6426,
    "longitude": -79.3871
  },
  "url": "https://bytesavy.com",
  "telephone": "+1-647-XXX-XXXX",
  "email": "hello@bytesavy.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "paymentAccepted": ["Credit Card", "Debit Card", "Wire Transfer", "Invoice"],
  "currenciesAccepted": "CAD, USD"
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Bytesavy offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy offers comprehensive agricultural software development including custom software development, mobile app development (iOS and Android), web application development, farm management systems, precision agriculture tools, legacy system modernization, and AI-powered automation. We specialize in creating practical, scalable solutions for agricultural organizations across Manitoba, Alberta, Saskatchewan, and Canada."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide software development services in Manitoba, Alberta, and Saskatchewan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Bytesavy proudly serves agricultural businesses and organizations across Manitoba (Winnipeg, Brandon), Alberta (Calgary, Edmonton), Saskatchewan (Saskatoon, Regina), and all of Canada. We specialize in agricultural software development and offer remote development services for clients anywhere in the Canadian Prairies. We are a Canadian company committed to delivering practical software solutions to Canadian agricultural operations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best software development company in Manitoba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy is a leading software development company serving Manitoba with expertise in agricultural software development. We build custom software solutions, mobile apps, and web applications for Manitoba farms and agricultural businesses. Our team understands Manitoba's agricultural sector and creates practical software that performs reliably in real-world farming conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I find app development companies in Alberta?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy provides expert app development services across Alberta including Calgary, Edmonton, and rural communities. We specialize in mobile app development for agricultural operations, creating iOS and Android applications for farm management, field data collection, and business operations. Our Alberta clients trust us for practical, reliable software solutions."
      }
    },
    {
      "@type": "Question",
      "name": "Who provides agricultural software development in Saskatchewan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy specializes in agricultural software development for Saskatchewan farms and agribusinesses. We serve clients in Saskatoon, Regina, and across rural Saskatchewan with custom farm management software, crop tracking systems, and agricultural business applications. Our software is built specifically for Saskatchewan's agricultural sector."
      }
    },
    {
      "@type": "Question",
      "name": "How much does custom software development cost in Canada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom software development costs vary based on project scope, complexity, and features. Agricultural web applications typically start from $15,000 CAD, while comprehensive farm management systems can range from $50,000 to $200,000+ CAD. Mobile apps for field operations typically range from $30,000 to $100,000 CAD. Bytesavy offers flexible engagement models for Manitoba, Alberta, and Saskatchewan clients. Contact us for a free consultation and detailed quote."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Bytesavy different from other software development companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy specializes in agricultural software development with deep understanding of farming operations in Manitoba, Alberta, and Saskatchewan. We focus on practical, reliable software that performs in real-world agricultural conditions. We build long-term partnerships with agricultural organizations, listen first before building, and create software that generates measurable impact from day one. We're trusted by leading agricultural organizations like Manitoba Crop Alliance and Alberta Grains."
      }
    },
    {
      "@type": "Question",
      "name": "How much does custom software development cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom software development costs vary based on project scope, complexity, features, and timeline. Simple web applications start from $10,000 CAD, while complex enterprise solutions can range from $50,000 to $500,000+ CAD. Mobile apps typically range from $25,000 to $150,000 CAD. AI implementations start from $15,000 CAD. Bytesavy offers flexible engagement models including fixed-price projects, time & materials, and dedicated team arrangements. Contact us for a free consultation and detailed quote tailored to your specific needs."
      }
    },
    {
      "@type": "Question",
      "name": "What is the typical timeline for developing a custom application?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Development timelines depend on project complexity. Simple websites take 4-8 weeks, standard web applications take 3-6 months, mobile apps take 4-8 months, and enterprise solutions can take 6-18 months. Bytesavy follows agile methodology with bi-weekly sprints, providing regular updates and early prototypes. We can often deliver MVPs (Minimum Viable Products) in 6-12 weeks for faster time-to-market."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support and maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Bytesavy offers comprehensive post-launch support including bug fixes, security updates, feature enhancements, performance optimization, cloud infrastructure management, and 24/7 monitoring. We offer flexible support packages including dedicated support teams for enterprise clients. All our solutions come with a warranty period and optional ongoing maintenance agreements."
      }
    },
    {
      "@type": "Question",
      "name": "Can Bytesavy help with digital transformation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Bytesavy specializes in digital transformation consulting, helping Canadian businesses modernize legacy systems, implement cloud solutions, automate processes, integrate AI capabilities, and build scalable digital platforms. We assess your current technology stack, identify opportunities, create transformation roadmaps, and implement solutions that drive business growth and operational efficiency."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies does Bytesavy specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy's technology stack includes React, Next.js, Node.js, TypeScript, Python, React Native, Flutter, AWS, Google Cloud, Firebase, PostgreSQL, MongoDB, OpenAI/ChatGPT, TensorFlow, and modern DevOps tools. We select the best technologies for each project based on requirements, scalability needs, and long-term maintainability. Our team stays current with emerging technologies while prioritizing proven, enterprise-grade solutions."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get started with Bytesavy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Getting started is easy! Contact us through our website at bytesavy.com, email hello@bytesavy.com, or call us directly. We'll schedule a free consultation to discuss your project, understand your goals, and provide recommendations. From there, we'll create a detailed proposal, project plan, and timeline. Most projects begin with a discovery phase to ensure we fully understand your needs before development starts."
      }
    }
  ]
}

export const serviceSchema = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@id": "https://bytesavy.com/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": serviceName,
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serviceName,
          "description": description
        },
        ...(price && { "price": price, "priceCurrency": "CAD" })
      }
    ]
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Business"
  }
})

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Start a Custom Software Development Project with Bytesavy",
  "description": "Step-by-step guide to initiating a custom software development project with Bytesavy",
  "totalTime": "PT1W",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Initial Consultation",
      "text": "Contact Bytesavy for a free consultation to discuss your project requirements, goals, and timeline.",
      "url": "https://bytesavy.com/contact"
    },
    {
      "@type": "HowToStep",
      "name": "Discovery & Planning",
      "text": "Our team conducts a detailed discovery session to understand your business needs, technical requirements, and success criteria."
    },
    {
      "@type": "HowToStep",
      "name": "Proposal & Agreement",
      "text": "Receive a comprehensive proposal including project scope, timeline, technology stack, and investment details."
    },
    {
      "@type": "HowToStep",
      "name": "Design & Prototyping",
      "text": "We create wireframes, mockups, and interactive prototypes for your review and feedback."
    },
    {
      "@type": "HowToStep",
      "name": "Development & Testing",
      "text": "Our development team builds your solution using agile methodology with bi-weekly sprint demos."
    },
    {
      "@type": "HowToStep",
      "name": "Launch & Support",
      "text": "We deploy your application, provide training, and offer ongoing support and maintenance."
    }
  ]
}
