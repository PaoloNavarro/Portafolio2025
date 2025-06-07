// src/components/common/LanguageSwitcher.tsx
"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ReactFlagsSelect from 'react-flags-select';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLng = pathname.split('/')[1];

  const langToCountryCode: { [key: string]: string } = {
    es: 'ES',
    en: 'GB',
  };

  const countryCodeToLang: { [key: string]: string } = {
    ES: 'es',
    GB: 'en',
    US: 'en',
  };

  const handleLanguageChange = (countryCode: string) => {
    const newLng = countryCodeToLang[countryCode];
    if (!newLng) return;

    const pathWithoutLang = pathname.substring(currentLng.length + 1);
    const newPath = `/${newLng}${pathWithoutLang}`;

    router.push(newPath);
  };

  return (
    <div className="relative ml-4 sm:ml-0">
      <ReactFlagsSelect
        selected={langToCountryCode[currentLng]}
        onSelect={handleLanguageChange}
        countries={['ES', 'GB']}
        customLabels={{ ES: "Español", GB: "English" }}
        showSelectedLabel={false}
        showOptionLabel={false}
        placeholder=""
        className="menu-flags"
        selectButtonClassName="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors shadow-sm border border-gray-300"
        selectedSize={18}
        optionsSize={18}
      />
    </div>
  );
};

export default LanguageSwitcher;
