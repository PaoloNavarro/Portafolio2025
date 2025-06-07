// src/app/[locale]/layout.tsx
// Este layout envolverá todas las rutas bajo /es, /en, etc.
"use client"; // Es un Client Component porque usa hooks y tu MainLayout es Client.

import React from 'react';
import { Montserrat } from 'next/font/google';
import clsx from 'clsx';
// Importa tus componentes de layout
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MenuSlider from '../components/navigation/MenuSlider';

// ¡NUEVA IMPORTACIÓN!
import { CookiesProvider } from 'react-cookie'; // Importa CookiesProvider

// Define la fuente como lo haces en tu MainLayout
const montserrat = Montserrat({
  subsets: ['latin'], // 👈 obligatorio si preload está activado
  variable: '--font-montserrat',
});

// Este es esencialmente el MainLayout que tenías, pero ahora como un layout para el App Router.
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // Si en algún momento quieres usar `params.locale`, ya lo tienes disponible.

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    // ¡ENVOLVEMOS TODO CON COOKIESPROVIDER!
    <CookiesProvider>
      <div className={clsx('min-h-screen flex flex-col antialiased', montserrat.variable)}>
        <Header onToggleMenu={toggleMenu}  />

        {/* Renderiza el MenuSlider, pasándole el estado y la función para cerrarlo */}
        <MenuSlider isOpen={isMenuOpen} onClose={toggleMenu} />

        <main className="flex-1 flex flex-col pt-[80px] p-4 md:p-8 font-montserrat bg-background-light text-text-dark">
          {children} {/* Aquí se renderizarán tus páginas (ej. page.tsx, (proyects)/academic/page.tsx) */}
        </main>

        <Footer />
      </div>
    </CookiesProvider>
  );
}