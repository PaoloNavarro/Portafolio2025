// src/i18n/settings.ts

export const fallbackLng = 'es';
export const languages = [fallbackLng, 'en'];
export const defaultNS = 'common';

export const i18nConfig = {
  dirs: {
    es: 'ltr', // Español es Left-to-Right
    en: 'ltr', // Inglés es Left-to-Right
    // Agrega más idiomas si es necesario
  } as const,
};

// Función `dir` personalizada para obtener la dirección del idioma
// Si el idioma no está definido en i18nConfig.dirs, usa el fallbackLng
export const dir = (lng: string | undefined) => {
  // Si lng es undefined, usa el fallbackLng ('es') para determinar la dirección
  const resolvedLng = lng || fallbackLng;
  return i18nConfig.dirs[resolvedLng as keyof typeof i18nConfig.dirs] || 'ltr';
};


export const getOptions = (lng = fallbackLng, ns = defaultNS) => {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    htmlTag: {
      html: true,
      lang: true,
      dir: true,
    },
  };
};