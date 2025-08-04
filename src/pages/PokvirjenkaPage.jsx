import React, { useState, useEffect } from 'react';
import { ProjectLayout } from '../components/ProjectLayout';
import { GlassRippleButton } from '../components/GlassRippleButton';
import { Lightbox } from '../components/Lightbox';

export const PokvirjenkaPage = ({ project, onBack, onMouseEnter, onMouseLeave }) => {
    const [lightboxImage, setLightboxImage] = useState(null);

    if (!project) return null;

    const openLightbox = (image) => setLightboxImage(image);
    const closeLightbox = () => setLightboxImage(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeLightbox();
            }
        };

        if (lightboxImage) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightboxImage]);

    return (
        <ProjectLayout onBack={onBack} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>

            <header className="mb-12 text-left">

                <h1 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-neutral-100 mb-4">{project.title}</h1>
                <div className="flex items-center gap-x-4 mt-2 mb-8 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                    <span>{project.description}</span>
                    <span className="h-4 w-px bg-beige-border dark:bg-neutral-700"></span>
                    <span>{project.year}</span>
                </div>
            </header>

            <div className="border-t-2 border-beige-border dark:border-neutral-800 pt-12">
                <h2 className="text-2xl font-bold text-brown-text dark:text-neutral-200 mb-6">Interactive Experience</h2>
                <div
                    className="w-full bg-beige-soft dark:bg-neutral-900 rounded-lg overflow-hidden border-2 border-beige-border dark:border-neutral-800 p-0.5"
                    style={{ aspectRatio: '1.4 / 1' }}
                    onMouseEnter={() => onMouseEnter('Interact', 70)}
                    onMouseLeave={onMouseLeave}
                >
                    <iframe
                        src="/assets/pokvirjenka/index-magazine.html"
                        title={project.title}
                        className="w-full h-full border-0"
                    />
                </div>
                <p className="text-sm text-center mt-4 text-brown-muted dark:text-neutral-500">
                    Click and drag to flip through the zine.
                </p>
            </div>

            {project.images && project.images.length > 0 && (
                <div className="mt-24 border-t-2 border-beige-border dark:border-neutral-800 pt-12">
                    <h2 className="text-2xl font-bold text-brown-text dark:text-neutral-200 mb-6">Project Gallery & Mockups</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.images.map((image, index) => (
                            <div
                                key={index}
                                className="bg-beige-soft dark:bg-neutral-900 p-2 rounded-lg border-2 border-beige-border dark:border-neutral-800 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                                onClick={() => openLightbox(image)}
                                onMouseEnter={() => onMouseEnter('Enlarge', 70)}
                                onMouseLeave={onMouseLeave}
                            >
                                <img
                                    src={image}
                                    alt={`${project.title} mockup ${index + 1}`}
                                    className="w-full h-auto object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {lightboxImage && (
                <Lightbox
                    src={lightboxImage}
                    onClose={closeLightbox}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            )}
        </ProjectLayout>
    );
};