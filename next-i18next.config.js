// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'es', // Tu idioma por defecto
    locales: ['es', 'en'], // Los idiomas que soportarás
  },
  // Opcional: Ruta personalizada para tus traducciones.
  // localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
};