import React, { useState, useEffect, useRef } from 'react';

export const AnimationPlayer = ({ animation }) => {
    const { path, frameCount, fileType, frameRate } = animation;
    const [currentFrame, setCurrentFrame] = useState(1);

    const requestRef = useRef();
    const previousTimeRef = useRef();
    const interval = 1000 / frameRate;

    // This function runs the animation loop
    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;

            if (deltaTime > interval) {
                previousTimeRef.current = time - (deltaTime % interval);

                // Loop back to the first frame when the animation ends
                setCurrentFrame(prevFrame => (prevFrame >= frameCount ? 1 : prevFrame + 1));
            }
        } else {
            previousTimeRef.current = time;
        }
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        // Cleanup function to cancel the animation frame when the component unmounts
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Empty dependency array ensures this effect runs only once

    // Construct the path for the current frame image
    const frameSrc = `${path}/${currentFrame}.${fileType}`;

    return (
        <img
            src={frameSrc}
            alt={`Animation frame ${currentFrame}`}
            className="w-full h-auto object-cover rounded-md shadow-lg"
        />
    );
};