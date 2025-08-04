// src/components/Lightbox.jsx

import React, { useState, useEffect } from 'react';

export const Lightbox = ({ src, onClose }) => {
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsShowing(true), 10);
        return () => clearTimeout(timer);
    }, []);

    if (!src) return null;

    const handleClose = () => {
        setIsShowing(false);
        setTimeout(onClose, 300);
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={handleClose}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isShowing ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* The image container now also contains the close button */}
            <div
                className={`relative max-w-[80vw] max-h-[80vh] transition-all duration-300 ease-in-out ${isShowing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
                <img
                    src={src}
                    alt="Enlarged view"
                    className="max-w-full max-h-full object-contain"
                    onClick={handleImageClick}
                />

                {/* --- UPDATED BUTTON --- */}
                {/* 1. The button is now INSIDE the image container div. */}
                {/* 2. Its classes have been updated to position it next to the image. */}
                <button
                    onClick={handleClose}
                    className={`absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white text-2xl leading-none hover:bg-neutral-700 transition-all duration-300 ease-in-out ${isShowing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    aria-label="Close image view"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};