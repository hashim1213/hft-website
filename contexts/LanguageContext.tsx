"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages = {
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
  es: { code: 'es', name: 'Español', flag: '🇪🇸' }
};

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.solutions': 'Solutions',
    'nav.contact': 'Contact Us',

    // Hero Section
    'hero.title': 'The agricultural software modernization partner',
    'hero.subtitle': 'Bytesavy Technologies accelerates operational efficiency and growth with custom software solutions built for agriculture.',
    'hero.trusted': 'Trusted by leading agricultural organizations',

    // Services
    'services.title': 'The seamless blend of technology, data and agricultural expertise',
    'services.custom.title': 'Custom Software Development',
    'services.custom.description': 'Purpose-built applications that modernize agricultural operations, reduce manual work and drive measurable results.',
    'services.automation.title': 'Process Automation',
    'services.automation.description': 'Intelligent automation and AI-powered workflows that eliminate repetitive tasks and improve accuracy across your operations.',
    'services.legacy.title': 'Legacy System Modernization',
    'services.legacy.description': 'Transform outdated systems into modern, cloud-based solutions that scale with your business and integrate seamlessly.',
    'services.support.title': 'Support & Maintenance',
    'services.support.description': 'Expert ongoing support and proactive maintenance to ensure your software performs reliably when you need it most.',

    // CTA
    'cta.title': 'Ready to modernize your operations?',
    'cta.subtitle': "Let's discuss how custom software can transform your agricultural business.",

    // Footer
    'footer.made_in': 'Made in',
    'footer.copyright': 'Bytesavy Technologies INC. © 2026 Bytesavy. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'nav.solutions': 'Solutions',
    'nav.contact': 'Contactez-nous',

    // Hero Section
    'hero.title': 'Le partenaire de modernisation des logiciels agricoles',
    'hero.subtitle': 'Bytesavy Technologies accélère l\'efficacité opérationnelle et la croissance avec des solutions logicielles personnalisées conçues pour l\'agriculture.',
    'hero.trusted': 'Approuvé par les principales organisations agricoles',

    // Services
    'services.title': 'Le mélange harmonieux de technologie, de données et d\'expertise agricole',
    'services.custom.title': 'Développement de Logiciels Personnalisés',
    'services.custom.description': 'Applications sur mesure qui modernisent les opérations agricoles, réduisent le travail manuel et produisent des résultats mesurables.',
    'services.automation.title': 'Automatisation des Processus',
    'services.automation.description': 'Automatisation intelligente et flux de travail alimentés par l\'IA qui éliminent les tâches répétitives et améliorent la précision de vos opérations.',
    'services.legacy.title': 'Modernisation des Systèmes Hérités',
    'services.legacy.description': 'Transformez les systèmes obsolètes en solutions cloud modernes qui évoluent avec votre entreprise et s\'intègrent de manière transparente.',
    'services.support.title': 'Support et Maintenance',
    'services.support.description': 'Support continu expert et maintenance proactive pour garantir que votre logiciel fonctionne de manière fiable quand vous en avez le plus besoin.',

    // CTA
    'cta.title': 'Prêt à moderniser vos opérations?',
    'cta.subtitle': 'Discutons de la façon dont les logiciels personnalisés peuvent transformer votre entreprise agricole.',

    // Footer
    'footer.made_in': 'Fabriqué au',
    'footer.copyright': 'Bytesavy Technologies INC. © 2026 Bytesavy. Tous droits réservés.',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.about': 'Acerca de',
    'nav.solutions': 'Soluciones',
    'nav.contact': 'Contáctenos',

    // Hero Section
    'hero.title': 'El socio de modernización de software agrícola',
    'hero.subtitle': 'Bytesavy Technologies acelera la eficiencia operativa y el crecimiento con soluciones de software personalizadas diseñadas para la agricultura.',
    'hero.trusted': 'Con la confianza de las principales organizaciones agrícolas',

    // Services
    'services.title': 'La combinación perfecta de tecnología, datos y experiencia agrícola',
    'services.custom.title': 'Desarrollo de Software Personalizado',
    'services.custom.description': 'Aplicaciones diseñadas específicamente que modernizan las operaciones agrícolas, reducen el trabajo manual y generan resultados medibles.',
    'services.automation.title': 'Automatización de Procesos',
    'services.automation.description': 'Automatización inteligente y flujos de trabajo impulsados por IA que eliminan tareas repetitivas y mejoran la precisión en sus operaciones.',
    'services.legacy.title': 'Modernización de Sistemas Heredados',
    'services.legacy.description': 'Transforme sistemas obsoletos en soluciones modernas basadas en la nube que escalan con su negocio y se integran sin problemas.',
    'services.support.title': 'Soporte y Mantenimiento',
    'services.support.description': 'Soporte continuo experto y mantenimiento proactivo para garantizar que su software funcione de manera confiable cuando más lo necesita.',

    // CTA
    'cta.title': '¿Listo para modernizar sus operaciones?',
    'cta.subtitle': 'Hablemos de cómo el software personalizado puede transformar su negocio agrícola.',

    // Footer
    'footer.made_in': 'Hecho en',
    'footer.copyright': 'Bytesavy Technologies INC. © 2026 Bytesavy. Todos los derechos reservados.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
