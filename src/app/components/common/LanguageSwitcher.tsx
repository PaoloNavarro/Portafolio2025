// src/components/common/LanguageSwitcher.tsx
"use client";

import React from 'react'; // Eliminado useState, useRef, useEffect ya que no se usan en este snippet
import { usePathname, useRouter } from 'next/navigation';
import ReactFlagsSelect from 'react-flags-select'; // <-- Importa la nueva librería

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLng = pathname.split('/')[1];

  // Mapeo de códigos de idioma a códigos de país ISO 3166-1 alpha-2
  const langToCountryCode: { [key: string]: string } = {
    es: 'ES',
    en: 'GB', // O 'US' si prefieres la bandera de USA para el inglés
  };

  // Mapeo inverso para obtener el idioma a partir del código de país si es necesario
  const countryCodeToLang: { [key: string]: string } = {
    ES: 'es',
    GB: 'en',
    US: 'en',
  };

  const handleLanguageChange = (countryCode: string) => {
    const newLng = countryCodeToLang[countryCode];
    if (!newLng) return;

    // Asegúrate de que pathWithoutLang maneje correctamente el caso de la raíz "/"
    // Si pathname es "/es", pathWithoutLang debe ser "". Si es "/es/about", debe ser "/about".
    // currentLng.length + 1 asegura que se quite el idioma y el "/" siguiente.
    const pathWithoutLang = pathname.substring(currentLng.length + 1);

    // ¡CORRECCIÓN AQUÍ! Usa template literals correctamente
    const newPath = `/${newLng}${pathWithoutLang}`;

    router.push(newPath);
  };

  return (
    <div className="relative">
      <ReactFlagsSelect
        selected={langToCountryCode[currentLng]}
        onSelect={handleLanguageChange}
        countries={['ES', 'GB']}
        customLabels={{ ES: "Español", GB: "English" }}
        showSelectedLabel={false}
        showOptionLabel={false}
        placeholder=""
        className="menu-flags"
        selectButtonClassName="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
        selectedSize={24}
        optionsSize={24}
      />
    </div>
  );
};

export default LanguageSwitcher;