// src/components/navigation/MenuSlider.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n/client'; // Importa useTranslation para los textos de los enlaces

interface MenuSliderProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuSlider: React.FC<MenuSliderProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1]; // Extrae el idioma
  const { t } = useTranslation(lng, 'common'); // Usa el namespace 'common' para los textos

  const navLinks = [
    { name: t('header.home'), href: `/${lng}` }, // Usa t() para localizar
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
          // Posicionamiento y tamaño:
          'fixed top-0 left-0 h-full',
          'w-full sm:w-80 md:w-96',
          // Fondo del menú: usar la variable de fondo principal para que cambie con el tema
          'bg-[var(--color-background-light)] shadow-lg transform transition-transform duration-300 ease-in-out z-50',
          // Animación:
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Visibilidad:
          'md:hidden'
        )}
      >
        <div className="p-6 flex flex-col h-full"> {/* Ya no necesitas bg-background-light aquí, el aside ya lo tiene */}
          {/* Botón para cerrar el menú */}
          <button
            onClick={onClose}
            // Colores del botón: texto oscuro, hover de fondo oscuro, hover de texto secundario
            className="self-end p-2 rounded-full text-[var(--color-text-dark)] hover:bg-[var(--color-background-dark)] hover:text-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] transition-colors duration-200"
            aria-label={t('menu.close_menu')} // Localiza el texto del aria-label
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {/* Título o Logo del Menú */}
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-8 mt-4 text-center">
            {t('menu.navigation_title')} {/* Localiza el título */}
          </h2>

          {/* Enlaces de Navegación */}
          <nav className="flex flex-col space-y-4 flex-grow">
            {navLinks.map((link) => {
              const isHome = link.href === `/${lng}`; // Lógica para la ruta de inicio
              const isActive = isHome ? pathname === `/${lng}` : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={clsx(
                    'text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200',
                    'font-montserrat',
                    // Colores de los enlaces:
                    isActive
                      ? 'bg-[var(--color-primary)] text-[var(--color-text-light)]' // Activo: fondo primary, texto claro
                      : 'text-[var(--color-text-dark)] hover:bg-[var(--color-background-dark)] hover:text-[var(--color-secondary)]' // Inactivo: texto oscuro, hover con fondo oscuro y texto secundario
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Puedes añadir un footer o info de contacto aquí si quieres */}
          <div className="mt-8 text-center text-[var(--color-text-dark)]/[0.7] text-sm"> {/* Color de texto oscuro con opacidad */}
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright_owner')}</p> {/* Usa la traducción */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default MenuSlider;