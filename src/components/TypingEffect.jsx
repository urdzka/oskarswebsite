import React, { useState, useEffect } from 'react';



export const TypingEffect = () => {

const fullText = 'Oblikovalsky';

const loopTarget = 'likoval';

const prefix = 'Ob';

const suffix = 'sky';



const typingSpeed = 120;

const deletingSpeed = 80;

const initialPause = 1500;

const loopPause = 2000;



const [text, setText] = useState('');

const [phase, setPhase] = useState('initial');

const [isDeleting, setIsDeleting] = useState(false);

const [loopText, setLoopText] = useState('');



useEffect(() => {

let timeoutId;



if (phase === 'initial') {

if (text.length < fullText.length) {

timeoutId = setTimeout(() => {

setText(fullText.slice(0, text.length + 1));

}, typingSpeed);

} else {

timeoutId = setTimeout(() => {

setPhase('looping');

setLoopText('');

}, initialPause);

}

} else if (phase === 'looping') {

if (isDeleting) {

if (loopText.length > 0) {

timeoutId = setTimeout(() => {

setLoopText(loopText.slice(0, -1));

}, deletingSpeed);

} else {

setIsDeleting(false);

}

} else {

if (loopText.length < loopTarget.length) {

timeoutId = setTimeout(() => {

setLoopText(loopTarget.slice(0, loopText.length + 1));

}, typingSpeed);

} else {

timeoutId = setTimeout(() => {

setIsDeleting(true);

}, loopPause);

}

}

}



return () => clearTimeout(timeoutId);

}, [text, phase, isDeleting, loopText]);



const displayText =

phase === 'initial' ? text : `${prefix}${loopText}${suffix}`;



return (

<h1 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white h-12 sm:h-14">

{displayText}

<span className="blinking-cursor">|</span>

</h1>

);

};



