// src/components/MouseFollower.jsx

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../App';

export const MouseFollower = ({ size = 20, text = "" }) => {
    const { theme } = useTheme();

    const cursorRef = useRef(null);
    const posRef = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);
    const lerpFactor = 0.2;

    useEffect(() => {
        const handleEvent = (e) => {
            let clientX, clientY;

            // Check if the event is a touch event or a mouse event
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            posRef.current = { x: clientX, y: clientY };
        };

        const animate = () => {
            const { x: targetX, y: targetY } = posRef.current;
            const { x: currentX, y: currentY } = cursorPos.current;

            cursorPos.current.x += (targetX - currentX) * lerpFactor;
            cursorPos.current.y += (targetY - currentY) * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleEvent);
        window.addEventListener('touchmove', handleEvent);
        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleEvent);
            window.removeEventListener('touchmove', handleEvent);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    const lightModeBg = 'rgba(120, 117, 105, 0.5)';
    const darkModeBg = 'rgba(0, 255, 119, 0.15)';
    const lightModeBorder = '#4a4238';
    const darkModeBorder = '#0fa';
    const lightModeTextColor = 'text-beige-soft';
    const darkModeTextColor = 'text-white';

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out flex items-center justify-center border-2 -translate-x-1/2 -translate-y-1/2"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: theme === 'light' ? lightModeBg : darkModeBg,
                borderColor: theme === 'light' ? lightModeBorder : darkModeBorder,
                backdropFilter: 'blur(2.8px)',
            }}
        >
            {text && (
                 <span className={theme === 'light' ? lightModeTextColor : darkModeTextColor + ' font-medium'}>
                    {text}
                </span>
            )}
        </div>
    );
};