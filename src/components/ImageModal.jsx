// src/components/ImageModal.jsx
import React from 'react';
import { useTheme } from '../App';

export const ImageModal = ({ src, onClose }) => {
    const { theme } = useTheme();

    // Set a button color that matches the mouse cursor's border color
    const buttonColor = theme === 'light' ? '#a3a198' : '#0fa';
    const hoverColor = theme === 'light' ? '#d4d4d4' : '#ffffff';

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                className="absolute top-4 right-4 text-3xl font-bold leading-none z-[1001] transition-all duration-300 hover:rotate-90 p-2 rounded-full border-2 border-transparent hover:bg-neutral-800/50"
                style={{ color: buttonColor, transition: 'color 0.3s ease-in-out' }}
                onClick={onClose}
            >
                &times;
            </button>
            <div
                className="relative max-w-5xl max-h-[90vh] p-4 bg-transparent"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={src}
                    alt="Enlarged view"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};