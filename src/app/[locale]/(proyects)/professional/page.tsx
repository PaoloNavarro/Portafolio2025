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
// Tipado para un segmento de la descripción
// -----------------------------------------------------------------------------
interface DescriptionSegment {
  type: string; // 'text' o 'highlight-secondary'
  value: string;
}

// -----------------------------------------------------------------------------
// Tipado para un proyecto individual (sin cambios aquí, 'type' sigue existiendo en el JSON de datos)
// -----------------------------------------------------------------------------
interface Project {
  id: string;
  type: string; // Todavía existe en projectsData.json, solo no lo mostraremos
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
  description: DescriptionSegment[]; // La descripción ES un array de segmentos
  t: (key: string) => string; // Función de traducción para el botón
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, description, t }) => {
  // Puedes eliminar este console.log una vez que todo funcione
  // console.log(`Project: ${project.id}, Description Type: ${typeof description}, Description Value:`, description);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const totalImages = project.images.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  return (
    <div className="bg-[var(--color-background-dark)] rounded-lg shadow-xl overflow-hidden
                    transform transition-transform duration-300 hover:scale-105
                    border border-[var(--color-background-dark)] hover:border-[var(--color-primary)]">
      <div className="relative h-48 w-full">
        {/* Carrusel de imágenes */}
        {totalImages > 0 ? (
          <>
            <Image
              src={project.images[currentImageIndex]}
              alt={`Captura de pantalla del proyecto ${project.title} - ${currentImageIndex + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg transition-opacity duration-300 ease-in-out"
              key={currentImageIndex} // Key para forzar la re-renderización y animación
            />
            {totalImages > 1 && ( // Mostrar botones solo si hay más de una imagen
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
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">{project.title}</h3>
        <p className="text-[var(--color-text-light)] mb-4 leading-relaxed">
          {description.map((segment, index) => (
            <span
              key={index}
              className={segment.type === 'highlight-secondary' ? 'highlight-secondary' : ''}
            >
              {segment.value}
            </span>
          ))}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-[var(--color-primary)]/[0.1] text-[var(--color-primary)] px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-md
                     shadow-md hover:shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-secondary/90
                     text-base font-medium"
        >
          {t('projects.view_project_button')}
        </Link>
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
  // AQUÍ ESTÁ EL CAMBIO CLAVE: returnObjects: true
  const { t } = useTranslation(lng, 'projects'); // No necesitamos returnObjects: true aquí para el hook en sí,
                                                // pero sí para la llamada individual a t() si el hook no está configurado globalmente.

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="max-w-6xl mx-auto text-center w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-10 md:mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('projects.professional_projects_title')}
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              // PASAMOS returnObjects: true DIRECTAMENTE EN LA LLAMADA A t()
              // También removemos la aserción a 'unknown' ya que i18next debería devolver el tipo correcto
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