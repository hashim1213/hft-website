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
  "description": "Leading Canadian AI-powered digital solutions company specializing in custom software development, machine learning implementation, web development, mobile apps, and enterprise applications. Trusted by businesses across North America.",
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
      "@type": "Country",
      "name": "United States"
    },
    {
      "@type": "AdministrativeArea",
      "name": "North America"
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
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Mobile App Development",
    "Software Engineering",
    "Cloud Computing",
    "Enterprise Solutions",
    "Digital Transformation",
    "Custom Software Development",
    "AI Integration",
    "API Development",
    "Full Stack Development"
  ],
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "AI & Machine Learning Solutions",
        "description": "Custom AI solutions, ChatGPT integration, machine learning models, and intelligent automation"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Custom Web Development",
        "description": "Responsive web applications, e-commerce solutions, and enterprise web platforms"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Mobile App Development",
        "description": "iOS, Android, and cross-platform mobile applications"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Enterprise Software Solutions",
        "description": "Custom business software, SaaS platforms, and enterprise integrations"
      }
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
        "text": "Bytesavy offers comprehensive digital solutions including AI-powered software development, custom web applications, mobile app development (iOS and Android), enterprise software solutions, machine learning integration, ChatGPT and OpenAI implementation, cloud solutions, and digital transformation consulting. We specialize in creating intelligent, scalable solutions for businesses across Canada and North America."
      }
    },
    {
      "@type": "Question",
      "name": "Does Bytesavy serve clients across Canada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Bytesavy proudly serves clients across all of Canada, including Toronto, Vancouver, Montreal, Calgary, Ottawa, and all provinces and territories. We offer both on-site consultations in the Greater Toronto Area and remote development services for clients anywhere in Canada and North America. We are a Canadian-certified (CanMade) technology company committed to delivering world-class solutions to Canadian businesses."
      }
    },
    {
      "@type": "Question",
      "name": "How can AI and machine learning benefit my business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI and machine learning can transform your business through intelligent automation, predictive analytics, customer service chatbots, personalized recommendations, data analysis, process optimization, and enhanced decision-making. Bytesavy specializes in implementing practical AI solutions including ChatGPT integration, custom ML models, natural language processing, and intelligent automation that deliver measurable ROI. We help Canadian businesses leverage AI to stay competitive in the digital economy."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Bytesavy work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bytesavy works with diverse industries including FinTech, HealthTech, EdTech, E-commerce, PropTech, Legal Tech, SaaS, Manufacturing, Retail, Professional Services, and Startups. Our Canadian team has deep expertise in regulated industries and understands compliance requirements including PIPEDA, PHIPA, and industry-specific regulations across Canada."
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
