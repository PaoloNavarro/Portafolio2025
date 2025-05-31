// src/components/navigation/MenuSlider.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

interface MenuSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuSlider: React.FC<MenuSliderProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'common');
  // const { theme } = useTheme(); // You can use this if you need theme-specific logic within the component

  const navLinks = [
    { name: t('header.home'), href: `/${lng}` },
    { name: t('header.professional'), href: `/${lng}/projects/professional` },
    { name: t('header.conceptual'), href: `/${lng}/projects/conceptual` },
    { name: t('header.academic'), href: `/${lng}/projects/academic` },
    { name: t('header.about'), href: `/${lng}/about` },
    { name: t('header.contact'), href: `/${lng}/contact` },
  ];

  return (
    <>
      {/* Overlay oscuro cuando el menú está abierto (visible solo en mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Menú Lateral */}
      <aside
       className={clsx(
    'fixed top-0 left-0 h-full',
    'w-full sm:w-80 md:w-96',
    'bg-[var(--color-background)] shadow-lg transform transition-transform duration-300 ease-in-out',
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'z-[9999]', // <- Aquí el cambio
    'md:hidden'
  )}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Botón para cerrar el menú */}
          <button
            onClick={onClose}
            // Use --color-text for general text, --color-background-card for hover background,
            // and --color-secondary for hover text and focus ring
            className="self-end p-2 rounded-full text-[var(--color-text)] hover:bg-[var(--color-background-card)] hover:text-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-colors duration-200"
            aria-label={t('menu.close_menu')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Título o Logo del Menú */}
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8 mt-4 text-center">
            {t('menu.navigation_title')}
          </h2>

          {/* Enlaces de Navegación */}
          <nav className="flex flex-col space-y-4 flex-grow">
            {navLinks.map((link) => {
              const isHome = link.href === `/${lng}`;
              const isActive = isHome ? pathname === `/${lng}` : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={clsx(
                    'text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200',
                    'font-montserrat',
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-text-light)]' // Active: primary background, light text
                      : 'text-[var(--color-text)] hover:bg-[var(--color-background-card)] hover:text-[var(--color-secondary)]' // Inactive: general text, hover with card background and secondary text
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer or contact info */}
          <div className="mt-8 text-center text-[var(--color-text)]/[0.7] text-sm"> {/* Use general text color with opacity */}
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright_owner')}</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MenuSlider;