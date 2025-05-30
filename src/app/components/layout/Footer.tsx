// src/components/layout/Footer.tsx
"use client"; // ¡Importante! Este componente debe ser de cliente para usar hooks

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/i18n/client'; // Importa useTranslation
import { usePathname } from 'next/navigation'; // Importa usePathname

const Footer: React.FC = () => {
  const pathname = usePathname();
  // Obtén el idioma actual de la URL. Asume la estructura /[lng]/...
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'common'); // Usamos el namespace 'common'

  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo y nombre */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative h-10 w-48">
              <Image
                src="/images/logfins.png"
                alt={t('footer.logo_alt_text')} 
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                className="filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Derechos reservados */}
          <p className="text-sm md:text-base text-white/80 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {t('footer.copyright_owner')} {t('footer.all_rights_reserved')}. 
          </p>

          {/* Redes sociales con logos */}
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/paolo-navarro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
              aria-label="LinkedIn" // Puedes dejarlo en inglés si es un estándar de accesibilidad o traducirlo si lo deseas
            >
              <div className="relative h-6 w-6">
                <Image
                  src="/images/linke.png"
                  alt="LinkedIn" // Generalmente, el texto alternativo de iconos de redes sociales es el nombre de la red
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>

            <Link
              href="https://github.com/paolo-navarro"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
              aria-label="GitHub" // Similar a LinkedIn
            >
              <div className="relative h-6 w-6">
                <Image
                  src="/images/github.png"
                  alt="GitHub"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Línea divisoria y enlaces adicionales */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link href={`/${lng}/about`} className="text-white/80 hover:text-white transition-colors"> {/* Traducible y con idioma */}
              {t('footer.about_link')}
            </Link>
            <Link href={`/${lng}/contact`} className="text-white/80 hover:text-white transition-colors"> {/* Traducible y con idioma */}
              {t('footer.contact_link')}
            </Link>
            {/* Si tienes una página de política de privacidad multi-idioma */}
            <Link href={`/${lng}/privacy`} className="text-white/80 hover:text-white transition-colors"> {/* Traducible y con idioma */}
              {t('footer.privacy_policy_link')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;