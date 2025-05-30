// src/hooks/useTheme.ts
"use client";

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  // Inicializa el tema como null. Esto evita que el servidor renderice
  // un tema basado en localStorage (que no existe en el servidor).
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Este efecto se ejecuta SOLO en el cliente después de la hidratación.
    // Aquí es seguro acceder a `window` y `localStorage`.

    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determina el tema inicial: primero localStorage, luego preferencia del sistema
    const initialTheme: Theme = storedTheme || (prefersDarkMode ? 'dark' : 'light');

    setTheme(initialTheme);
    // Aplicar la clase inicial al <html> inmediatamente
    document.documentElement.classList.add(initialTheme);

    // Opcional: Escuchar cambios en la preferencia del sistema en tiempo real
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) { // Solo si el usuario no ha forzado un tema
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      // Limpieza: Remover las clases al desmontar y el event listener
      document.documentElement.classList.remove('light', 'dark');
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []); // Se ejecuta una sola vez al montar el componente

  // Efecto para actualizar la clase 'dark' o 'light' en el elemento <html>
  // y guardar en localStorage cada vez que `theme` cambie.
  useEffect(() => {
    if (theme !== null) { // Asegúrate de que el tema ya se haya determinado
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]); // Se ejecuta cada vez que el tema cambia

  const toggleTheme = () => {
    // Solo cambia el tema si ya ha sido determinado
    if (theme !== null) {
      setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    }
  };

  return { theme, toggleTheme };
};