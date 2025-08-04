import React from 'react';
import { useTheme } from '../App';

export const ImageModal = ({ src, onClose }) => {
    const { theme } = useTheme();

    const buttonColor = theme === 'light' ? '#a3a198' : '#0fa';
    const hoverColor = theme === 'light' ? '#d4d4d4' : '#ffffff';

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-w-5xl max-h-[90vh] p-4 bg-transparent"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image container is now relative for button positioning */}
                <div className="relative w-full h-full">
                    <img
                        src={src}
                        alt="Enlarged view"
                        className="w-full h-full object-contain"
                    />
                    {/* The Close Button is positioned absolutely inside the image container */}
                    <button
                        className="absolute top-4 right-4 text-3xl font-bold leading-none z-[1001] transition-all duration-300 p-2 rounded-full border-2 border-transparent hover:rotate-90"
                        style={{ color: buttonColor }}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
            </div>
        </div>
    );
};