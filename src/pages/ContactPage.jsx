import React from 'react';
import { GlassRippleButton } from '../components/GlassRippleButton';
import { ContactForm } from '../components/ContactForm';

export const ContactPage = ({ onBack, onMouseEnter, onMouseLeave }) => (
    <div>
        <GlassRippleButton
            onClick={onBack}
            className="py-2 px-5 mb-8 rounded-lg border"
            onMouseEnter={() => onMouseEnter(null, 40)}
            onMouseLeave={onMouseLeave}
        >
             ← Back
        </GlassRippleButton>
        <h2 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white mb-8">Get in touch</h2>
        <p className="text-base mt-4 mb-12 leading-relaxed text-brown-muted dark:text-neutral-400">
            Have a project in mind, or just want to say hi? <br />
            Feel free to send me an email or connect with me on social media.
        </p>
        <ContactForm onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    </div>
);