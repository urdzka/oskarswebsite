import React, { useState, useEffect } from 'react';

export const TypingEffect = () => {
    // State to manage the animation's current phase: 'initial' or 'looping'
    const [phase, setPhase] = useState('initial');
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // --- Configuration ---
    const fullText = "Oblikovalsky";
    const loopTarget = "likoval";
    const typingSpeed = 120;
    const deletingSpeed = 80;
    const initialPause = 1500; // Pause after the full word is typed
    const loopPause = 2000;    // Pause after "likoval" is re-typed in the loop

    useEffect(() => {
        let timeoutId;

        // PHASE 1: Initial typing of the full word
        if (phase === 'initial') {
            if (text.length < fullText.length) {
                timeoutId = setTimeout(() => {
                    setText(fullText.slice(0, text.length + 1));
                }, typingSpeed);
            } else {
                // Once done, pause and then switch to the looping phase
                timeoutId = setTimeout(() => {
                    setPhase('looping');
                }, initialPause);
            }
        }

        // PHASE 2: Infinite loop of deleting and re-typing "likoval"
        else if (phase === 'looping') {
            const loopStartIndex = 2;
            const loopEndIndex = loopStartIndex + loopTarget.length;

            if (isDeleting) {
                // Handle deleting the middle part
                if (text.length > loopStartIndex + 3) { // "Ob" + "sky" = 5 chars, but we target the end
                    const newText = text.slice(0, -4) + text.slice(-3);
                    timeoutId = setTimeout(() => setText(newText), deletingSpeed);
                } else {
                    setIsDeleting(false);
                }
            } else {
                // Handle re-typing the middle part
                const currentLoopText = text.slice(loopStartIndex, -3);
                if (currentLoopText.length < loopTarget.length) {
                    const nextChar = loopTarget[currentLoopText.length];
                    const newText = text.slice(0, -3) + nextChar + text.slice(-3);
                    timeoutId = setTimeout(() => setText(newText), typingSpeed);
                } else {
                    // Pause and then switch to deleting
                    timeoutId = setTimeout(() => setIsDeleting(true), loopPause);
                }
            }
        }

        // Cleanup the timeout on component unmount or re-render
        return () => clearTimeout(timeoutId);

    }, [text, phase, isDeleting]);

    return (
        <h1 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white h-12 sm:h-14">
            {text}
            <span className="blinking-cursor">|</span>
        </h1>
    );
};