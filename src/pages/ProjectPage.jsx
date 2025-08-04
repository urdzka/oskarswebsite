import React, { useState, useEffect } from 'react';
import { GlassRippleButton } from '../components/GlassRippleButton';
import { ImageModal } from '../components/ImageModal';

export const ProjectPage = ({ project, onBack, onMouseEnter, onMouseLeave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const showNextImage = () => {
        setSelectedImageIndex(prevIndex => (prevIndex + 1) % project.images.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex(prevIndex => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    // Use a single useEffect hook to handle the Escape key press for accessibility
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    return (
        <>
            <div>
                <GlassRippleButton
                    onClick={onBack}
                    className="py-2 px-5 mb-8 border"
                    onMouseEnter={() => onMouseEnter('Back', 40)}
                    onMouseLeave={onMouseLeave}
                >
                    ← Back to Work
                </GlassRippleButton>
                <h2 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white mb-4">{project.title}</h2>
                <div className="flex items-center gap-x-4 mt-2 mb-8 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                    <span>{project.description}</span>
                    <span>{project.year}</span>
                </div>
                <p className="text-base leading-relaxed mb-8 text-brown-text dark:text-neutral-400">{project.longDescription}</p>

                {/* Simplified full-width container */}
                <div className="w-full relative py-8 border-t-2 border-beige-border dark:border-neutral-800">
                    <div className="max-w-3xl mx-auto px-4">
                        <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Media Library</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="group relative cursor-pointer overflow-hidden rounded-lg"
                                    style={{ aspectRatio: '856 / 595' }}
                                    onClick={() => openModal(index)}
                                    onMouseEnter={() => onMouseEnter('View', 80)}
                                    onMouseLeave={onMouseLeave}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ImageModal
                    src={project.images[selectedImageIndex]}
                    onClose={closeModal}
                    onNext={showNextImage}
                    onPrev={showPrevImage}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            )}
        </>
    );
};