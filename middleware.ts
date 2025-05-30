// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// ¡CORRECCIÓN AQUÍ! Importamos 'fallbackLng' en lugar de 'defaultLocale'
import { fallbackLng, languages } from './src/i18n/settings'; // Asegúrate que la ruta sea correcta

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verifica si la ruta ya tiene un prefijo de idioma (ej. /es, /en)
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Si no tiene un prefijo de idioma, redirige al idioma por defecto
  if (!pathnameHasLocale) {
    // Redirige usando el locale por defecto (fallbackLng)
    const newUrl = new URL(`/${fallbackLng}${pathname}`, request.url); // ¡USAMOS fallbackLng AQUÍ!
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Define las rutas a las que se aplicará el middleware
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // Aplica a todo excepto estas rutas
  ],
};