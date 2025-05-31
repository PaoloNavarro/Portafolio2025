    // src/app/[locale]/(proyects)/professional/[projectId]/page.tsx
    "use client";

    import React, { useState, useEffect } from 'react';
    import { useParams, useRouter } from 'next/navigation';
    import Image from 'next/image';
    import Link from 'next/link';
    import { useTranslation } from '@/i18n/client';
    import projectsData from '@/data/projectsData.json';
    import { motion, AnimatePresence } from 'framer-motion';

    // -----------------------------------------------------------------------------
    // Define el objeto que mapea el nombre de la tecnología con su ruta de logo
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
    type: string;
    value: string;
    }

    // -----------------------------------------------------------------------------
    // Tipado base para un proyecto (debe coincidir con la estructura de projectsData.json)
    // -----------------------------------------------------------------------------
    interface Project {
    id: string;
    type: string;
    title: string;
    technologies: string[];
    images: string[];
    projectLink: string;
    // Make description optional if it's not always present or is overwritten by longDescription
    description?: string | DescriptionSegment[];
    }

    // -----------------------------------------------------------------------------
    // Tipado extendido para un proyecto individual (para la página de detalle)
    // -----------------------------------------------------------------------------
    interface ProjectDetail extends Omit<Project, 'description'> {
    longDescription?: DescriptionSegment[]; // Make it optional in the interface
    detailImages?: string[]; // Make it optional in the interface
    description?: string | DescriptionSegment[]; // Add description as optional
    }


    const ProjectDetailPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const lng = Array.isArray(params.locale) ? params.locale[0] : params.locale || 'es';
    const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;

    const { t } = useTranslation(lng, 'projects');

    // Find the project data
    const project = projectsData.find(p => p.id === projectId) as ProjectDetail | undefined;

    useEffect(() => {
        if (!project) {
        // Redirect if project is not found
        // Using router.replace instead of push for cleaner history
        router.replace(`/${lng}/professional`);
        }
    }, [project, router, lng]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // If project is not found yet, show loading/not found message
    if (!project) {
        return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] text-[var(--color-text)]">
            {t('project_detail.loading_or_not_found')}
        </div>
        );
    }

    // Safely get images to display, defaulting to project.images if detailImages is not available
    const imagesToDisplay = (project.detailImages && project.detailImages.length > 0)
        ? project.detailImages
        : project.images;

    const totalImages = imagesToDisplay.length;

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
    };

    // Define Framer Motion variants for animations
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 10,
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
        },
        exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <AnimatePresence mode="wait">
        <motion.main
            className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] p-8 md:p-16 flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="max-w-7xl mx-auto w-full">
            <motion.div variants={itemVariants} className="mb-8">
                <Link href={`/${lng}/professional`} className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-300 flex items-center text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('project_detail.back_to_projects')}
                </Link>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-center mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {project.title}
                </span>
            </motion.h1>

            <motion.section variants={itemVariants} className="mb-12 relative w-full h-[50vh] md:h-[70vh] rounded-xl overflow-hidden shadow-2xl">
                {totalImages > 0 ? (
                <>
                    <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                        src={imagesToDisplay[currentImageIndex] || ''}
                        alt={`Captura de pantalla del proyecto ${project.title} - ${currentImageIndex + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="object-center"
                        />
                    </motion.div>
                    </AnimatePresence>

                    {totalImages > 1 && (
                    <>
                        <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                        aria-label="Previous image"
                        >
                        &lt;
                        </button>
                        <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full z-10 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                        aria-label="Next image"
                        >
                        &gt;
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {imagesToDisplay.map((_, idx) => (
                            <span
                            key={idx}
                            className={`block w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-gray-400 opacity-75'}`}
                            onClick={() => setCurrentImageIndex(idx)}
                            ></span>
                        ))}
                        </div>
                    </>
                    )}
                </>
                ) : (
                <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400 text-2xl">
                    {t('project_detail.no_image_available')}
                </div>
                )}
            </motion.section>

            <motion.section variants={containerVariants} className="bg-[var(--color-background-dark)] rounded-lg shadow-xl p-8 md:p-10 mb-12">
                <motion.h2 variants={itemVariants} className="text-3xl font-semibold text-[var(--color-primary)] mb-6 text-center">
                {t('project_detail.description_title')}
                </motion.h2>
                <motion.p variants={itemVariants} className="text-[var(--color-text-light)] leading-relaxed text-lg text-center md:text-left">
                {/* Added optional chaining and nullish coalescing here */}
                {project.longDescription?.map((segment, index) => (
                    <span
                    key={index}
                    className={segment.type === 'highlight-secondary' ? 'highlight-secondary' : ''}
                    >
                    {segment.value}
                    </span>
                )) ?? (
                    // Fallback if longDescription is undefined or empty
                    project.description && typeof project.description !== 'string' ? (
                    project.description.map((segment, index) => (
                        <span
                        key={index}
                        className={segment.type === 'highlight-secondary' ? 'highlight-secondary' : ''}
                        >
                        {segment.value}
                        </span>
                    ))
                    ) : (
                    <>{project.description || t('project_detail.no_description_available')}</>
                    )
                )}
                </motion.p>
            </motion.section>

            <motion.section variants={containerVariants} className="bg-[var(--color-background-dark)] rounded-lg shadow-xl p-8 md:p-10 mb-12">
                <motion.h2 variants={itemVariants} className="text-3xl font-semibold text-[var(--color-primary)] mb-6 text-center">
                {t('project_detail.technologies_title')}
                </motion.h2>
                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
                {/* Added optional chaining and nullish coalescing here */}
                {(project.technologies ?? []).map((techName, index) => {
                    const logoPath = technologyLogos[techName];
                    return logoPath ? (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-[var(--color-secondary)] p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                        <Image
                        src={logoPath}
                        alt={techName}
                        width={40}
                        height={40}
                        className="object-contain mb-2"
                        />
                        <span className="text-[var(--color-text-inverted)] text-sm font-medium whitespace-nowrap">
                        {techName}
                        </span>
                    </div>
                    ) : (
                    <span
                        key={index}
                        className="bg-[var(--color-secondary)] text-[var(--color-text-inverted)] px-4 py-2 rounded-lg text-base font-medium shadow-md"
                    >
                        {techName}
                    </span>
                    );
                })}
                </motion.div>
            </motion.section>

            <motion.div variants={itemVariants} className="text-center">
                <Link
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full
                            shadow-lg hover:shadow-xl transition-all duration-300 hover:from-primary/90 hover:to-secondary/90
                            text-xl font-semibold"
                >
                {t('project_detail.view_live_project')}
                </Link>
            </motion.div>
            </div>
        </motion.main>
        </AnimatePresence>
    );
    };

    export default ProjectDetailPage;