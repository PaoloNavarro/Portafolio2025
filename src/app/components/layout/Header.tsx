// src/components/layout/Header.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitcher from '../common/ThemeSwitcher';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  onToggleMenu: () => void;
  onToggleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleMenu, onToggleSearch }) => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'common');

  const { theme } = useTheme();

  // Asegúrate de que theme no sea null antes de usarlo
  const isDarkMode = theme === 'dark';

  const navLinks = [
    { name: t('header.home'), href: `/${lng}` },
    { name: t('header.professional'), href: `/${lng}/professional` },
    { name: t('header.about'), href: `/${lng}/about` },
    { name: t('header.contact'), href: `/${lng}/contact` },
  ];

  const logoAspectRatio = 1759 / 305;
  const desktopLogoHeight = 40;
  const mobileLogoHeight = 30;

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full shadow-sm z-50 py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-sm bg-opacity-95 border-b border-gray-100",
        "bg-[var(--color-background-light)]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-12 order-first md:order-first">
        <Link href="/" passHref>
          <div className="relative">
            {/* Logo para desktop */}
            <Image
              // Mantén el key para forzar la re-renderización del componente Image
              // Esto es crucial para asegurar que el navegador re-aplique los estilos
              key={`logo-desktop-${theme}`} // El key cambia cuando 'theme' cambia
              src="/images/logfins.png"
              alt="Mi Logo"
              width={desktopLogoHeight * logoAspectRatio}
              height={desktopLogoHeight}
              priority
              className={clsx(
                "object-contain object-left hidden md:block",
                // Aplica el filtro solo si es modo oscuro
                isDarkMode && 'filter brightness-0 invert'
              )}
            />
            {/* Logo para mobile */}
            <Image
              // Mantén el key para forzar la re-renderización del componente Image
              key={`logo-mobile-${theme}`} // El key cambia cuando 'theme' cambia
              src="/images/logfins.png"
              alt="Mi Logo"
              width={mobileLogoHeight * logoAspectRatio}
              height={mobileLogoHeight}
              priority
              className={clsx(
                "object-contain object-left block md:hidden",
                // Aplica el filtro solo si es modo oscuro
                isDarkMode && 'filter brightness-0 invert'
              )}
            />
          </div>
        </Link>
      </div>

      {/* Navegación Principal */}
      <nav className="hidden md:flex space-x-6 lg:space-x-8 md:order-2">
        {navLinks.map((link) => {
          const isHome = link.href === `/${lng}`;
          const isActive = isHome ? (pathname === `/${lng}`) : pathname.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'relative text-lg font-medium transition-all duration-300 overflow-hidden py-1 px-3 rounded-md',
                'group',
                isActive && 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] animate-gradientShift text-white',
                isActive && 'bg-[length:200%_auto]',
                isActive && 'border border-[var(--color-primary)]',
                !isActive && 'hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[var(--color-secondary-hover)]',
                !isActive && 'hover:bg-[length:200%_auto]',
                !isActive && 'hover:animate-gradientShift',
                !isActive && 'hover:text-white',
              )}
            >
              <span
                className={clsx(
                  "relative z-10",
                  isActive ? 'text-white' : 'text-[var(--color-text-dark)] group-hover:text-white',
                  'transition-colors duration-300'
                )}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Contenedor de Botones de Utilidad */}
      <div className="flex items-center space-x-4 order-last md:order-last">
        <LanguageSwitcher />
        <ThemeSwitcher />

        <button
          onClick={onToggleSearch}
          aria-label={t('header.open_search')}
          className="relative p-2 rounded-full text-[var(--color-text-dark)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-background-dark)] focus:outline-none transition-all duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>

        <button
          onClick={onToggleMenu}
          aria-label={t('header.open_menu')}
          className="relative p-2 rounded-full text-[var(--color-text-dark)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-background-dark)] focus:outline-none transition-all duration-300 md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;