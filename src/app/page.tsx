// src/app/page.tsx
import { redirect } from 'next/navigation';
// ¡CORRECCIÓN AQUÍ! Importamos 'fallbackLng' en lugar de 'defaultLocale'
import { fallbackLng } from '../i18n/settings'; // Asegúrate que la ruta sea correcta

// Este componente se ejecutará cuando se acceda a la raíz sin idioma (ej. http://localhost:3000/).
// Su propósito es redirigir automáticamente al idioma por defecto.
export default function RootPage() {
  // Redirige al idioma por defecto (el valor de fallbackLng)
  redirect(`/${fallbackLng}`);
}