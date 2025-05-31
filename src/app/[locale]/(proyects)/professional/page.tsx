// my-portfolio-project/src/app/[locale]/(proyects)/professional/page.tsx
"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import { usePathname } from 'next/navigation';

// Importa los datos de tus proyectos desde el JSON
import projectsData from '@/data/projectsData.json';

// -----------------------------------------------------------------------------
// Define el objeto que mapea el nombre de la tecnología con su ruta de logo
// IMPORTANTE: Asegúrate de que los archivos SVG en estas rutas sean de color BLANCO.
// -----------------------------------------------------------------------------
const technologyLogos: Record<string, string> = {
  "HTML": "/images/tech-logos/html.svg",
  "CSS": "/images/tech-logos/css.svg",
  "JavaScript": "/images/tech-logos/javascript.svg",
  "Diseño Responsivo": "/images/tech-logos/responsive.svg",
  "Laravel": "/images/tech-logos/laravel.svg",
  "Bootstrap": "/images/tech-logos/bootstrap.svg",
  "jQuery": "/images/tech-logos/jquery.svg",
  "MySQL": "/images/tech-logos/mysql.svg",
  "PHP": "/images/tech-logos/php.svg",
  "React": "/images/tech-logos/react.svg",
};

// -----------------------------------------------------------------------------
// Tipado para un segmento de la descripción
// -----------------------------------------------------------------------------
interface DescriptionSegment {
  type: string; // 'text' o 'highlight-secondary'
  value: string;
}

// -----------------------------------------------------------------------------
// Tipado para un proyecto individual
// -----------------------------------------------------------------------------
interface Project {
  id: string;
  type: string;
  title: string;
  technologies: string[];
  images: string[];
  projectLink: string;
}

// -----------------------------------------------------------------------------
// Componente ProjectCard (Tarjeta de Proyecto)
// -----------------------------------------------------------------------------
interface ProjectCardProps {
  project: Project;
  description: DescriptionSegment[];
  t: (key: string) => string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, description, t }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = project.images.length;
  const pathname = usePathname();
  const lng = pathname.split('/')[1]; // Obtiene el idioma actual

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div className="project-card-light-effect bg-[var(--color-background-dark)] rounded-lg shadow-xl overflow-hidden
                    transform transition-transform duration-300 hover:scale-105
                    border border-[var(--color-background-dark)] hover:border-[var(--color-primary)] flex flex-col relative group"> {/* Added project-card-light-effect and group */}
      <div className="relative h-48 w-full">
        {/* Carrusel de imágenes */}
        {totalImages > 0 ? (
          <>
            <Image
              src={project.images?.[currentImageIndex] || ''}
              alt={`Captura de pantalla del proyecto ${project.title} - ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg transition-opacity duration-300 ease-in-out"
              key={currentImageIndex}
            />
            {totalImages > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full ml-2 z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous image"
                >
                  &lt;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full mr-2 z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next image"
                >
                  &gt;
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                  {project.images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`block w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-400 opacity-75'}`}
                    ></span>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-700 text-gray-400 text-lg">
            No image available
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">{project.title}</h3>
        <p className="text-[var(--color-text-light)] mb-4 leading-relaxed flex-grow">
          {description.map((segment, index) => (
            <span
              key={index}
              className={segment.type === 'highlight-secondary' ? 'highlight-secondary' : ''}
            >
              {segment.value}
            </span>
          ))}
        </p>
        <div className="flex flex-wrap gap-3 mb-4 items-center justify-center">
          {project.technologies.map((techName, index) => {
            const logoPath = technologyLogos[techName];

            return logoPath ? (
              <div
                key={index}
                className="flex items-center justify-center bg-[var(--color-secondary)] p-1 rounded-full group relative"
              >
                <Image
                  src={logoPath}
                  alt={techName}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
                  {techName}
                </span>
              </div>
            ) : (
              <span
                key={index}
                className="bg-[var(--color-primary)]/[0.1] text-[var(--color-primary)] px-3 py-1 rounded-full text-sm"
              >
                {techName}
              </span>
            );
          })}
        </div>
        <div className="flex justify-center items-center mt-auto flex-wrap"> {/* Changed justify-start to justify-center and added flex-wrap */}
          <Link
            href={`/${lng}/professional/${project.id}`}
            className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-md
                      shadow-md hover:shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-secondary/90
                      text-base font-medium text-center min-w-[140px] mb-2 md:mb-0" // Added mb-2 for spacing on small screens
          >
            {t('projects.view_details_button')}
          </Link>
          {project.projectLink && (
            <Link
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-5 py-2 rounded-md
                          shadow-md hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300
                          text-base font-medium md:ml-2 text-center min-w-[140px]" // Changed ml-2 to md:ml-2 to allow wrapping
            >
              {t('projects.view_live_button')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Componente ProfessionalProjectsPage (Página de Proyectos Profesionales)
// -----------------------------------------------------------------------------
const ProfessionalProjectsPage: React.FC = () => {
  const pathname = usePathname();
  const lng = pathname.split('/')[1];
  const { t } = useTranslation(lng, 'projects');

  const adjustedProjectsData = projectsData.map(project => {
    if (project.id === 'apiMovie' && !project.technologies.includes('PHP')) {
      return { ...project, technologies: [...project.technologies, 'PHP'] };
    }
    return project;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="max-w-6xl mx-auto text-center w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 md:mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('projects.professional_projects_title')}
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adjustedProjectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              description={t(`${project.id}.description`, { returnObjects: true }) as DescriptionSegment[]}
              t={t}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProfessionalProjectsPage;