"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslation } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Static image URLs for each project
const projectImages = [
  '/images/projects/ecommerce-platform.png',      // Project 1
  '/images/projects/retail-management.png',       // Project 2
  '/images/projects/media-portal.png',            // Project 3
  '/images/projects/university-admissions.png',   // Project 4
  '/images/projects/photography-marketplace.png', // Project 5
  '/images/projects/job-portal.png',              // Project 6
  '/images/projects/financial-system.png',        // Project 7
  '/images/projects/proposal-generation.png'      // Project 8
];

export default function Home() {
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'common');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface OpenModalFn {
    (imageIndex: number): void;
  }

  const openModal: OpenModalFn = (imageIndex) => {
    setSelectedImage(projectImages[imageIndex]);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-8 md:p-24 overflow-hidden">
      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl w-full mx-4 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
          >
            <button 
              className="absolute -top-12 right-0 text-white hover:text-primary text-4xl z-50"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl animate-scale-in">
              <Image
                src={selectedImage ?? ''}
                alt="Enlarged project preview"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                style={{ maxWidth: '100%', maxHeight: '90vh' }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative max-w-5xl mx-auto text-center z-10 p-6 md:p-10 bg-[var(--color-background-dark)]/[0.8] backdrop-blur-md rounded-3xl shadow-2xl border border-[var(--color-background-dark)] transition-all duration-500 ease-in-out transform hover:scale-[1.01] hover:shadow-3xl">

        {/* Hero Title Section */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight animate-fade-in-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-lg">
            {t('home.welcome_title')}
          </span>
        </h1>

        {/* Professional Description Section */}
        <div className="mb-10 text-[var(--color-text)] animate-fade-in-up delay-100">
          <p className="text-xl md:text-2xl leading-relaxed">
            {t('home.description_part1')}{' '}
            <span className="highlight-primary font-bold">{t('home.my_name')}</span>,{' '}
            <span className="highlight-secondary font-bold">{t('home.software_engineer')}</span> {t('home.description_part2')}{' '}
            <span className="highlight-primary font-bold">{t('home.full_stack_dev')}</span> {t('home.description_part3')}{' '}
            <span className="highlight-secondary font-bold">{t('home.scalable_architectures')}</span>. {t('home.description_part4')}{' '}
            <span className="highlight-primary font-bold">{t('home.professional_projects')}</span>,{' '}
            <span className="highlight-secondary font-bold">{t('home.open_source_contributions')}</span> {t('home.description_part5')}{' '}
            <span className="highlight-primary font-bold">{t('home.emerging_tech_experiments')}</span>.
          </p>
        </div>

        {/* Projects Experience Section */}
        <div className="mb-12 p-6 rounded-xl animate-fade-in-up delay-200">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-[var(--color-text)] bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('home.projects_experience_title')}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text)] mb-8">
            {t('home.projects_intro')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="project-card bg-[var(--color-background-dark)]/[0.9] p-6 rounded-2xl shadow-lg border border-[var(--color-background-dark)] transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl flex flex-col items-center">
                {/* Clickable Project Image */}
                <div 
                  className="relative w-full h-48 mb-4 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openModal(index)}
                >
                  <Image
                    src={projectImages[index]}
                    alt={t(`home.project${index + 1}_name`)}
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </div>
                <div className="text-center w-full">
                  <h3 className="font-semibold text-[var(--color-text)] text-xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {t(`home.project${index + 1}_name`)}
                  </h3>
                  <p className="text-[var(--color-text)] text-base leading-relaxed">
                    {t(`home.project${index + 1}_desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA and Technology Badges */}
        <div className="flex flex-col items-center space-y-8 mt-12 animate-fade-in-up delay-300">
          <Link
            href={`/${lng}/professional`}
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 text-xl font-bold uppercase tracking-wide transform hover:from-primary/90 hover:to-secondary/90 border border-transparent hover:border-white"
          >
            {t('home.view_projects_button')}
          </Link>

          <div className="flex flex-wrap justify-center gap-4 mt-4 max-w-3xl">
            {['TypeScript', 'React', 'Node.js', 'Next.js', 'Laravel', 'AWS', 'WordPress', 'Spring Boot', 'SQL', 'CI/CD', 'Docker', 'RESTful APIs'].map(
              (tech, index) => (
                <span
                  key={index}
                  className="bg-[var(--color-primary)]/[0.15] text-[var(--color-primary)] px-5 py-2 rounded-full text-base font-medium shadow-md border border-[var(--color-primary)]/[0.3] transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-[var(--color-primary)]"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}