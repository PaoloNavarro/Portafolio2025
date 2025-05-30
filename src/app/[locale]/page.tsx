// src/app/[lng]/page.tsx
"use client";

import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@/i18n/client'; // Import useTranslation
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Home() {
  const pathname = usePathname();
  // Extract the language from the URL. Assuming the structure is /[lng]/...
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'common'); // Use 'common' namespace or a specific one for home

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título principal con gradiente */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('home.welcome_title')} {/* Localized welcome title */}
          </span>
        </h1>

        {/* Descripción profesional */}
        <div className="p-6 rounded-xl border mb-8
                     bg-[var(--color-background-dark)] border-[var(--color-background-dark)]">
          <p className="text-lg md:text-xl leading-relaxed">
            {t('home.description_part1')}{' '}
            {/* Usamos las nuevas clases personalizadas */}
            <span className="highlight-primary">{t('home.my_name')}</span>,{' '}
            <span className="highlight-secondary">{t('home.software_engineer')}</span> {t('home.description_part2')}{' '}
            <span className="highlight-primary">{t('home.full_stack_dev')}</span> {t('home.description_part3')}{' '}
            <span className="highlight-secondary">{t('home.scalable_architectures')}</span>. {t('home.description_part4')}{' '}
            <span className="highlight-primary">{t('home.professional_projects')}</span>,{' '}
            <span className="highlight-secondary">{t('home.open_source_contributions')}</span> {t('home.description_part5')}{' '}
            <span className="highlight-primary">{t('home.emerging_tech_experiments')}</span>.
          </p>
        </div>

        {/* CTA y badges de tecnologías */}
        <div className="flex flex-col items-center space-y-6">
          <Link
            href={`/${lng}/professional`} // Adjust link to include lng
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-secondary/90 text-lg font-medium"
          >
            {t('home.view_projects_button')} {/* Localized button text */}
          </Link>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {/* Los badges siguen usando las variables de Tailwind, que se adaptan bien */}
            <span className="bg-[var(--color-primary)]/[0.1] text-[var(--color-primary)] px-3 py-1 rounded-full text-sm">TypeScript</span>
            <span className="bg-[var(--color-secondary)]/[0.1] text-[var(--color-secondary)] px-3 py-1 rounded-full text-sm">React</span>
            <span className="bg-[var(--color-primary)]/[0.1] text-[var(--color-primary)] px-3 py-1 rounded-full text-sm">Node.js</span>
            <span className="bg-[var(--color-secondary)]/[0.1] text-[var(--color-secondary)] px-3 py-1 rounded-full text-sm">Next.js</span>
            <span className="bg-[var(--color-primary)]/[0.1] text-[var(--color-primary)] px-3 py-1 rounded-full text-sm">AWS</span>
          </div>
        </div>
      </div>
    </main>
  );
}