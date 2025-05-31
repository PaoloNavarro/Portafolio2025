// src/app/layout.tsx
import './globals.css';
import { dir, fallbackLng } from '../i18n/settings';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Aquí no tienes acceso a params.locale porque no es layout dinámico.
  // Puedes usar fallbackLng o un valor estático si quieres.

  const direction = dir(fallbackLng);

  return (
    <html lang={fallbackLng} dir={direction}>
      <head />
      <body>{children}</body>
    </html>
  );
}
