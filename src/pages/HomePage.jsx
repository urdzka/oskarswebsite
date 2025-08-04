import React from 'react';
import { TypingEffect } from '../components/TypingEffect';
import { GlassRippleButton } from '../components/GlassRippleButton';
import { ArrowIcon } from '../components/Icons';

// --- Asset Paths ---
const cernigojImage1 = "/assets/portfolio/umetnik-cernigoj2.png";
const cernigojImage2 = "/assets/portfolio/Umetnik-je-inzenir.png";
const zhaMidvaCoverSmall = "/assets/portfolio/zha-midva-cover-small.jpg";
const zhaPrinc1 = "/assets/portfolio/ZHA-princ1.jpg";
const zhaPrinc2Pokoncna = "/assets/portfolio/ZHA-princ2-pokoncna - Copy.jpg";
const zhaPrinc3Pokoncna = "/assets/portfolio/ZHA-princ3-pokoncna - Copy.jpg";
const umetnikCloseup = "/assets/portfolio/umetnik-closeup.png";

export const HomePage = ({ onProjectClick, onContactClick, handleMouseEnter, handleMouseLeave }) => {
    const portfolioItems = [
         {
            id: 'pokvirjenka-zine',
            title: "POKVIRJENKA ZINE",
            description: "INTERACTIVE MAGAZINE",
            year: "2025",
            type: 'interactive',
            longDescription: `This project centered on the graphic design and layout for **'Pokvirjenka'**, an independent art zine conceived primarily for print. Dedicated to exploring themes of sexuality, identity, and intimacy, the design philosophy utilized a dynamic grid system, strong typography, and a high-contrast color palette to create a powerful visual impact. Each spread was crafted to balance text and imagery, ensuring readability while maintaining an expressive, art-forward aesthetic.

To expand its reach and embrace new media, the print zine was subsequently adapted into a fully interactive digital magazine, allowing users to flip through pages and experience the content in a new, immersive way. This project showcases the flexibility of print design in a digital-first world.`,
            images: [ "/assets/portfolio/Pokvirjenka-mock-naslovnica.jpg", "/assets/portfolio/Pokvirjenka-mock-varnaspolnost.jpg" ]
         },
         {
            id: 'cernigoj-animacija',
            title: "UMETNIK NI VEČ UMETNIK",
            description: "MOTION GRAPHICS",
            year: "2024",
            longDescription: `This motion graphics piece is a tribute to the Slovenian historical avant-garde movement, inspired by the constructivist principles of **Avgust Černigoj**. The animation explores the idea of the artist as a builder and engineer of new realities, rather than a mere decorator.

The visual style is characterized by *geometric precision*, bold typography, and a stark palette of red, black, and white. Static shapes and kinetic text are brought to life through modern animation techniques, creating a rhythmic and structured visual experience.

> *"The Artist is No Longer an Artist."* - Avgust Černigoj. This project captures the spirit of an era where art sought to actively participate in the construction of a new world.`,
            type: 'animation',
                        images: [ cernigojImage1, cernigojImage2, umetnikCloseup ],
                        animation: {
                            // Update the path to your new optimized directory
                            path: '/assets/animacija/optimized',
                            frameCount: 456,
                            // Update the file type to 'webp'
                            fileType: 'webp',
                            frameRate: 24
            }
         },
         {
            id: 'naj-ti-ne-vzame-sape',
            title: "NAJ TI NE VZAME SAPE",
            description: "DIGITAL DESIGN",
            year: "2023",
            longDescription: `A powerful digital campaign for a public health initiative aimed at raising awareness about lung cancer and smoking cessation. The campaign's core strategy focused on using impactful visuals and clear, direct messaging to cut through the noise.

The design featured a high-contrast color scheme and bold, sans-serif typography to ensure maximum readability and a modern, approachable feel. Key deliverables included:

* Digital posters for public spaces
* Social media templates for Instagram and Facebook
* An animated short for online platforms

This project successfully leveraged a multi-channel approach to deliver a consistent and memorable message, encouraging a healthier lifestyle.`,
            images: [ "/assets/portfolio/IMG_6255.JPG", "/assets/portfolio/IMG_9289.JPG", "/assets/portfolio/IMG_9291.JPG" ]
         },
         {
            id: 'zha-music',
            title: "ZHA MUSIC",
            description: "PHOTOGRAPHY",
            year: "2023",
            longDescription: `A series of promotional photographs created for the musician **ZHA**. The goal was to capture the artist's unique aesthetic and energetic stage presence, which blends *synthwave influences* with modern electronic beats.

The photo shoot took place in a studio environment using dynamic lighting to create a sense of movement and depth. The final images were post-processed with a moody, high-contrast style to match the artist's brand identity. These photos were used for:

* Album art and single covers
* Promotional social media content
* Press kits and concert posters

The collaboration successfully translated ZHA's auditory experience into a compelling visual narrative that resonates with their audience.`,
            images: ["/assets/portfolio/IMG_6398-Edit-2 - Copy.jpg", "/assets/portfolio/zha-midva-siroka-small-1.jpg", "/assets/portfolio/zha-midva-siroka-small.jpg", "/assets/portfolio/ZHA-princ1.jpg", "/assets/portfolio/ZHA-princ2-pokoncna - Copy.jpg", "/assets/portfolio/IMG_6965 - Copy.jpg"]
         },
         {
            id: 'synthwave',
            title: "SYNTHWAVE",
            description: "VISUALS",
            year: "2022",
            longDescription: `This project is a series of promotional visuals inspired by the **synthwave genre**, combining photography, digital art, and motion graphics to create a complete visual identity. The goal was to capture the genre's unique aesthetic, which blends nostalgic 80s themes with futuristic electronic elements.

The project features a striking static visual and a dynamic, rhythm-driven motion piece that explores the relationship between tempo and visual movement. These visuals are moody, high-contrast, and dynamic, created to be used for:

* Album art and single covers
* Promotional social media content
* Press kits and concert posters

The project successfully translates the synthwave auditory experience into a compelling visual narrative that resonates with its audience.`,
            images: [ "/assets/portfolio/synthwave-slika.jpg" ],
            video: "/assets/portfolio/Synthwave-vizualije-ritem_in_tempo.mp4"
         },
         {
            id: 'krik',
            title: "KRIK - PRVI GLAS",
            description: "EVENT DESIGN",
            year: "2022",
            longDescription: `The original project, **KRIK: PRVI GLAS**, is an author's initiative that encourages dialogue about sexual harassment—a topic that is often present, normalized, and overlooked in society. The project addresses the difficulty of identifying when boundaries are crossed and asks critical questions about how to talk about abuse and seek help.

The performance and accompanying research strive to destigmatize victims of sexual abuse and emphasize the urgency of open dialogue. It presents viewers with ethical questions and encourages them to reflect on their own experiences.

The event itself is composed of three main parts:
* A theatrical performance
* Interactive workshops
* Discussions on sexual harassment with psychosocial counselors

This multi-faceted approach aims to create a safe space for dialogue and foster a greater understanding of this critical social issue.`,
            images: ["/assets/portfolio/2Krik-prviglas-fb-dogodek-cover-roza+bela.jpg"]
         },

    ];

    return (
        <>
            <header className="mb-16">
                <TypingEffect />
                <p className="text-lg md:text-xl text-brown-text/80 dark:text-neutral-300 mt-4 tracking-wide">
                    A dynamic and versatile graphic designer with a strong foundation in visual communication and media technology.
                </p>
                <p className="text-base mt-4 leading-relaxed text-brown-muted dark:text-neutral-400">
                    Creating designs with a focus on raw expression, structural honesty, and interactive experiences.
                </p>
                <div className="mt-8">
                    <GlassRippleButton
                        onClick={onContactClick}
                        onMouseEnter={() => handleMouseEnter('Get in touch', 80)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Get in touch
                    </GlassRippleButton>
                </div>
            </header>
            <div className="border-t-2 border-beige-border dark:border-neutral-800">
                {portfolioItems.map((item) => (
                    <div
                        key={item.id}
                        className="group block border-b-2 border-beige-border dark:border-neutral-800 py-8 transition-colors hover:bg-beige-soft/50 dark:hover:bg-neutral-900/50 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('View', 80)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => onProjectClick(item)}
                    >
                        <div className="flex justify-between items-center px-4">
                            <div className="flex-grow">
                                <h3 className="text-2xl md:text-3xl font-bold text-brown-text dark:text-neutral-200">{item.title}</h3>
                                <div className="flex items-center gap-x-4 mt-2 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                                    <span>{item.description}</span><span>{item.year}</span>
                                </div>
                            </div>
                            <div className="text-brown-text dark:text-neutral-200 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowIcon />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};