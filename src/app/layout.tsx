// src/app/layout.tsx
import './globals.css';
// Importa la función 'dir' y 'languages' de tus settings
import { dir, languages } from '../i18n/settings';
import type { Metadata } from 'next';

// Metadatos globales para tu aplicación.
export const metadata: Metadata = {
  title: 'Mi Portafolio Profesional',
  description: 'Portafolio de proyectos profesionales, conceptuales y académicos.',
};

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

// RootLayout es un Server Component por defecto
export default async function RootLayout({
  children,
  params: { locale } // ¡Aquí SÍ recibes el locale de la URL!
}: {
  children: React.ReactNode;
  params: { locale: string }; // Definimos el tipo para 'locale'
}) {
  // Asegúrate de que 'locale' no sea 'undefined' en la URL.
  // Si la URL es '/', Next.js no pasa un locale a este RootLayout.
  // Tu `src/app/page.tsx` con `redirect` se encarga de que siempre haya un locale.
  const currentLocale = locale || languages[0]; // Usa el locale o el fallbackLng
  const direction = dir(currentLocale); // Usa la función 'dir' con el locale resuelto

  console.log(`RootLayout: Locale detectado: ${currentLocale}, dirección del texto: ${direction}`);

  return (
    // ¡Aquí definimos <html> y <body>, y sus atributos!
    // No debe haber espacios en blanco entre <html><head><body>.
    <html lang={currentLocale} dir={direction}>
      <head>
        {/* Aquí puedes añadir metadatos adicionales, como títulos específicos del sitio o meta tags */}
        {/* Los títulos y descripciones de las páginas individuales irán en sus respectivos page.tsx o layout.tsx */}
      </head>
      <body>
        {children} {/* Esto renderizará el LocaleLayout y las páginas */}
      </body>
    </html>
  );
}