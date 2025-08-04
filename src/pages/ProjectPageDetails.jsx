import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { GlassRippleButton } from '../components/GlassRippleButton';
import { ImageModal } from '../components/ImageModal';
import { AnimationPlayer } from '../components/AnimationPlayer';

// Define a components object to style the rendered elements
const markdownComponents = {
  p: ({node, ...props}) => <p className="mb-4 text-base leading-relaxed text-brown-text dark:text-neutral-400 whitespace-pre-line" {...props} />,
  strong: ({node, ...props}) => <strong className="font-bold text-brown-text dark:text-neutral-200" {...props} />,
  em: ({node, ...props}) => <em className="italic text-brown-muted dark:text-neutral-500" {...props} />,
};

export const ProjectDetailPage = ({ project, onBack, onMouseEnter, onMouseLeave }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [hoveredImage, setHoveredImage] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const openModal = (index) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
        onMouseLeave();
    };

    const showNextImage = () => {
        setSelectedImageIndex(prevIndex => (prevIndex + 1) % project.images.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex(prevIndex => (prevIndex - 1 + project.images.length) % project.images.length);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (selectedImageIndex !== null) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedImageIndex]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        if (hoveredImage) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [hoveredImage]);

    if (!project) return null;

    const renderProjectSpecificContent = () => {
        if (project.id === 'pokvirjenka-zine') {
            return (
                <div className="border-t-2 border-beige-border dark:border-neutral-800 py-16 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Interactive Experience</h3>
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
                </div>
            );
        }
        else if (project.type === 'animation' && project.animation) {
            return (
                <div className="border-t-2 border-beige-border dark:border-neutral-800 py-16 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Motion Graphics Showcase</h3>
                        <div className="bg-black rounded-lg">
                            <AnimationPlayer animation={project.animation} />
                        </div>
                    </div>
                </div>
            );
        }
        else if (project.video) {
            return (
                <div className="border-t-2 border-beige-border dark:border-neutral-800 py-16 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Video Showcase</h3>
                        <div className="bg-black rounded-lg overflow-hidden">
                            <video
                                src={project.video}
                                controls
                                loop
                                muted
                                playsInline
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderMediaLibrary = () => {
        if (project.id === 'zha-music' && project.images.length === 1) {
            return (
                <div className="max-w-3xl mx-auto">
                    <img
                        src={project.images[0]}
                        alt={`${project.title}`}
                        className="w-full h-auto object-cover rounded-md"
                        onClick={() => openModal(0)}
                        onMouseEnter={() => onMouseEnter('View', 80)}
                        onMouseLeave={onMouseLeave}
                    />
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {project.images.map((image, index) => (
                    <div
                        key={index}
                        className="group relative cursor-pointer overflow-hidden rounded-lg bg-neutral-800"
                        style={{ aspectRatio: '856 / 595' }}
                        onClick={() => openModal(index)}
                        onMouseEnter={() => {
                            onMouseEnter('View', 80);
                            if (project.id === 'naj-ti-ne-vzame-sape' || project.id === 'krik') {
                                setHoveredImage(image);
                            }
                        }}
                        onMouseLeave={() => {
                            onMouseLeave();
                            if (project.id === 'naj-ti-ne-vzame-sape' || project.id === 'krik') {
                                setHoveredImage(null);
                            }
                        }}
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
        );
    };

    return (
        <>
            <div>
                <GlassRippleButton
                    onClick={onBack}
                    className="mb-8"
                    onMouseEnter={() => onMouseEnter('', 40)}
                    onMouseLeave={onMouseLeave}
                >
                    ← Back to Work
                </GlassRippleButton>
                <h2 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white mb-4">{project.title}</h2>
                <div className="flex items-center gap-x-4 mt-2 mb-8 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                    <span>{project.description}</span>
                    <span>{project.year}</span>
                </div>

                <div className="mb-16">
                    <h2 className="text-lg font-semibold tracking-wider text-brown-text dark:text-neutral-300 mb-4">THE CONCEPT</h2>
                    <ReactMarkdown components={markdownComponents}>
                        {project.longDescription}
                    </ReactMarkdown>
                </div>

                {renderProjectSpecificContent()}

                <div className="border-t-2 border-beige-border dark:border-neutral-800 py-16 w-screen relative left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-8">
                     <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Media Library</h3>
                        {renderMediaLibrary()}
                    </div>
                </div>
            </div>
            {selectedImageIndex !== null && (
                <ImageModal
                    src={project.images[selectedImageIndex]}
                    onClose={closeModal}
                />
            )}

            {hoveredImage && (
                <div
                    className="fixed top-0 left-0 z-[100] p-4 pointer-events-none transition-opacity duration-300 transform-gpu"
                    style={{
                        top: `${mousePosition.y + 20}px`,
                        left: `${mousePosition.x + 20}px`,
                        opacity: hoveredImage ? 1 : 0
                    }}
                >
                    <img
                        src={hoveredImage}
                        alt="Hover Preview"
                        className="w-[300px] h-auto object-cover rounded-lg shadow-2xl"
                    />
                </div>
            )}
        </>
    );
};