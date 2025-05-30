// src/components/common/ThemeSwitcher.tsx
"use client";

import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@/hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  if (theme === null) {
    return (
      <button
        aria-label="Cargando tema..."
        className="relative p-2 rounded-full text-gray-600 hover:text-teal-600 hover:bg-gray-100 focus:outline-none transition-all duration-300"
        disabled
      >
        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2M18.364 5.636l-.707-.707M6.343 17.657l-.707.707M18.364 18.364l-.707.707M5.636 5.636l-.707-.707"></path>
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className={clsx(
        "relative p-2 rounded-full focus:outline-none transition-all duration-300",
        theme === 'dark' 
          ? 'text-yellow-400 hover:bg-gray-700' 
          : 'text-gray-600 hover:bg-gray-200'
      )}
    >
      {theme === 'dark' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2M18.364 5.636l-.707-.707M6.343 17.657l-.707.707M18.364 18.364l-.707.707M6.343 6.343l-.707-.707M12 7a5 5 0 110 10 5 5 0 010-10z"></path>
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitcher;