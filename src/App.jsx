import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

// --- Reference the icon from the public directory ---
const nightModeIcon = '/assets/night-mode.png';

// --- Other Asset Placeholders ---
const zhaMidvaCoverSmall = "https://placehold.co/800x600/1a1a1a/ffffff?text=ZHA+Music+1";
const zhaPrinc3Pokoncna = "https://placehold.co/600x800/2a2a2a/ffffff?text=ZHA+Music+2";
const zhaPrinc2Pokoncna = "https://placehold.co/600x800/0a0a0a/ffffff?text=ZHA+Music+3";
const zhaPrinc1 = "https://placehold.co/800x600/1a1a1a/ffffff?text=ZHA+Music+4";

// --- Theme Management ---
const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => useContext(ThemeContext);

// --- Icon Components (For the footer) ---
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

const GitHubIcon = () => <Icon path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />;
const LinkedInIcon = () => <Icon path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />;
const EmailIcon = () => <Icon path="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />;
const ArrowIcon = () => <Icon path="M16.172 11l-5.586-5.586L12 4l8 8-8 8-1.414-1.414L16.172 13H4v-2h12.172z" className="w-8 h-8" />;

// --- Theme Toggle ---
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme-toggle-button">
            <input
                id="toggle"
                className="theme-toggle-input"
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
            <label htmlFor="toggle" className="theme-toggle-label">
                <div className="theme-toggle-switch">
                    <img
                        src={nightModeIcon}
                        alt="Toggle Icon"
                        className="w-4 h-4"
                    />
                </div>
            </label>
        </div>
    );
};


// --- Reusable Button ---
const GlassRippleButton = ({ children, onClick, onMouseEnter, onMouseLeave, className = '', type = 'button' }) => {
    const { theme } = useTheme();

    const rippleColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)';
    const lightModeClasses = "bg-brown-text text-beige-bg border-brown-text";
    const darkModeClasses = "dark:bg-transparent dark:text-neutral-300 dark:border-neutral-700";

    return (
        <button
            type={type}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`glass-ripple-effect group relative inline-flex items-center justify-center overflow-hidden z-0 transition-colors ${lightModeClasses} ${darkModeClasses} ${className}`}
        >
             <span
                className="ripple-bg absolute top-1/2 left-1/2 w-0 h-0 rounded-[30%] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-[2s] ease-out group-hover:w-[250%] group-hover:pb-[250%] z-0"
                style={{ backgroundColor: rippleColor, backdropFilter: 'blur(7px) brightness(1.2)' }}
            ></span>
            <span className="relative z-10">{children}</span>
        </button>
    );
};


// --- UI Components ---

const InteractiveGridBackground = () => {
    const { theme } = useTheme();
    const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
    const gridRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const gridSize = 50;
    // We use window.innerWidth and window.innerHeight for fixed elements
    // to ensure they match the viewport exactly.
    const width = window.innerWidth;
    const height = window.innerHeight;
    const numLinesX = Math.ceil(width / gridSize) + 1;
    const numLinesY = Math.ceil(height / gridSize) + 1;
    const warpFactor = 60;
    const gridColor = theme === 'dark' ? 'rgba(128, 128, 128, 0.15)' : 'rgba(0, 0, 0, 0.06)';
    const bgColor = theme === 'dark' ? 'black' : 'var(--bg-color)';

    const points = [];
    if(width > 0 && height > 0){
        for (let i = 0; i < numLinesY; i++) {
            for (let j = 0; j < numLinesX; j++) {
                const x = j * gridSize;
                const y = i * gridSize;
                const dx = x - mousePos.x;
                const dy = y - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
                const displacement = Math.max(0, warpFactor - distance) / warpFactor;
                points.push({
                    x: x - Math.cos(angle) * displacement * 20,
                    y: y - Math.sin(angle) * displacement * 20,
                });
            }
        }
    }

    // Changed h-full to h-screen
    return (
        <svg ref={gridRef} className="fixed top-0 left-0 w-full h-screen z-0">
            <rect width="100%" height="100%" fill={bgColor} />
            {points.length > 0 && <>
                {Array.from({ length: numLinesY }).map((_, i) =>
                    Array.from({ length: numLinesX - 1 }).map((_, j) => (
                        <path key={`h-${i}-${j}`} d={`M ${points[i * numLinesX + j].x} ${points[i * numLinesX + j].y} L ${points[i * numLinesX + j + 1].x} ${points[i * numLinesX + j + 1].y}`} stroke={gridColor} strokeWidth="1"/>
                    ))
                )}
                {Array.from({ length: numLinesX }).map((_, j) =>
                    Array.from({ length: numLinesY - 1 }).map((_, i) => (
                        <path key={`v-${i}-${j}`} d={`M ${points[i * numLinesX + j].x} ${points[i * numLinesX + j].y} L ${points[(i + 1) * numLinesX + j].x} ${points[(i + 1) * numLinesX + j].y}`} stroke={gridColor} strokeWidth="1"/>
                    ))
                )}
            </>}
        </svg>
    );
};

const MouseFollower = ({ size, text }) => {
    const { theme } = useTheme();
    const [position, setPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const lightModeBg = 'rgba(120, 117, 105, 0.2)';
    const darkModeBg = 'rgba(0, 255, 119, 0.15)';   
    
    const lightModeBorder = '#787569';
    const darkModeBorder = '#0fa';

    return (
        <div
            className="fixed rounded-full pointer-events-none z-50 transition-all duration-300 ease-out flex items-center justify-center border-2"
            style={{
                left: position.x,
                top: position.y,
                width: `${size}px`,
                height: `${size}px`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: theme === 'light' ? lightModeBg : darkModeBg,
                borderColor: theme === 'light' ? lightModeBorder : darkModeBorder,
                backdropFilter: 'blur(5px)',
            }}
        >
            {text && (
                 <span className={theme === 'light' ? 'text-brown-text font-medium' : 'text-white font-medium'}>
                    {text}
                </span>
            )}
        </div>
    );
};

const TypingEffect = () => {
    const [text, setText] = useState('');
    const fullText = "Oblikovalsky";
    const typingSpeed = 150;
    const pauseDuration = 3000;

    useEffect(() => {
        let timeoutId;
        if (text.length < fullText.length) {
            timeoutId = setTimeout(() => setText(fullText.slice(0, text.length + 1)), typingSpeed);
        } else {
            timeoutId = setTimeout(() => setText(''), pauseDuration);
        }
        return () => clearTimeout(timeoutId);
    }, [text]);

    return (
        <h1 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white h-12 sm:h-14">
            {text}
            <span className="blinking-cursor">|</span>
        </h1>
    );
};

const MarqueeStripe = ({ onClick, onMouseEnter, onMouseLeave }) => (
    <div className="marquee-container cursor-none relative w-fullvw py-12 bg-beige-soft dark:bg-neutral-900 text-brown-muted dark:text-neutral-500 whitespace-nowrap overflow-hidden z-10"
        onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="marquee-content flex text-3xl font-bold uppercase tracking-widest animate-[marquee_25s_linear_infinite]">
            {Array(10).fill("Available for new projects").map((text, i) => <span key={i} className="px-8">{text} &bull;</span>)}
        </div>
    </div>
);

const ContactForm = ({ onMouseEnter, onMouseLeave }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! (This is a demo)');
    };

    const inputStyles = "w-full bg-beige-soft dark:bg-neutral-900 border-2 border-beige-border dark:border-neutral-800 p-3 text-brown-text dark:text-neutral-200 focus:border-brown-muted dark:focus:border-neutral-600 focus:outline-none transition-colors rounded-md";

    return (
        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-wider text-brown-muted dark:text-neutral-400 mb-2">Name</label>

                <input type="text" id="name" name="name" required className={inputStyles} />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-wider text-brown-muted dark:text-neutral-400 mb-2">Email</label>
                <input type="email" id="email" name="email" required className={inputStyles} />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-wider text-brown-muted dark:text-neutral-400 mb-2">Message</label>
                <textarea id="message" name="message" rows="5" required className={inputStyles}></textarea>
            </div>
             <GlassRippleButton
                type="submit"
                className="py-3 px-6 border w-full rounded-lg"
                onMouseEnter={() => onMouseEnter('', 40)}
                onMouseLeave={onMouseLeave}
            >
                Send Message
            </GlassRippleButton>
        </form>
    );
};


// --- Page Components ---

const HomePage = ({ onProjectClick, onContactClick, handleMouseEnter, handleMouseLeave }) => {
    const portfolioItems = [
         { id: 'pokvirjenka-zine', title: "POKVIRJENKA ZINE", description: "INTERACTIVE MAGAZINE", year: "2025", longDescription: "Design and layout for 'Pokvirjenka', an independent art zine, presented as a fully interactive digital experience.", images: [ "https://placehold.co/600x800/1a1a1a/ffffff?text=Zine+Cover", "https://placehold.co/800x600/2a2a2a/ffffff?text=Zine+Spread+1", "https://placehold.co/800x600/0a0a0a/ffffff?text=Zine+Spread+2" ] },
         { id: 'cernigoj-animacija', title: "UMETNIK NI VEČ UMETNIK", description: "MOTION GRAPHICS", year: "2024", longDescription: "An animated short inspired by the works of Avgust Černigoj, exploring constructivist themes.", images: [ "https://placehold.co/800x600/1a1a1a/ffffff?text=Animation+Still+1", "https://placehold.co/800x600/2a2a2a/ffffff?text=Animation+Still+2" ] },
         { id: 'naj-ti-ne-vzame-sape', title: "NAJ TI NE VZAME SAPE", description: "DIGITAL DESIGN", year: "2023", longDescription: "A digital campaign for a public health initiative, focusing on clear communication and impactful visuals.", images: [ "https://placehold.co/800x600/1a1a1a/ffffff?text=Campaign+Visual", "https://placehold.co/600x600/2a2a2a/ffffff?text=Social+Media+Post" ] },
         { id: 'zha-music', title: "ZHA MUSIC", description: "PHOTOGRAPHY", year: "2024", longDescription: "A series of promotional photographs for the musician ZHA, focusing on capturing the artist's unique aesthetic and energy.", images: [ zhaMidvaCoverSmall, zhaPrinc3Pokoncna, zhaPrinc2Pokoncna, zhaPrinc1 ] },
    ];

    return (
        <>
            <header className="mb-16">
                <TypingEffect />
                <p className="text-xl text-brown-text/80 dark:text-neutral-300 mt-4 tracking-wide">
                    A dynamic and versatile graphic designer with a strong foundation in visual communication and media technology.
                </p>
                <p className="text-base mt-4 leading-relaxed text-brown-muted dark:text-neutral-400">
                    Creating unapologetically bold designs with a focus on raw expression, structural honesty, and interactive experiences.
                </p>
                <div className="mt-8">
                    <GlassRippleButton
                        onClick={onContactClick}
                        className="py-2 px-5 rounded-lg border"
                        onMouseEnter={() => handleMouseEnter('', 40)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Get in touch
                    </GlassRippleButton>
                </div>
            </header>

            <div className="border-t-2 border-beige-border dark:border-neutral-800">
                {portfolioItems.map((item) => (
                    <div key={item.id} className="group block border-b-2 border-beige-border dark:border-neutral-800 py-8 transition-colors hover:bg-beige-soft/50 dark:hover:bg-neutral-900/50 cursor-pointer" onMouseEnter={() => handleMouseEnter('View', 80)} onMouseLeave={handleMouseLeave} onClick={() => onProjectClick(item)}>
                        <div className="flex justify-between items-center px-4">
                            <div className="flex-grow">
                                <h3 className="text-3xl font-bold text-brown-text dark:text-neutral-200">{item.title}</h3>
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
    )
}

const ImageModal = ({ src, onClose, onNext, onPrev, onMouseEnter, onMouseLeave }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    const buttonStyles = "absolute top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white p-2 hover:bg-black/60 transition-colors focus:outline-none";

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
            onClick={onClose}
            onMouseEnter={() => onMouseEnter('Close', 60)}
            onMouseLeave={onMouseLeave}
        >
            <button
                className={`${buttonStyles} left-4`}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                onMouseEnter={() => onMouseEnter('<', 50)}
                onMouseLeave={() => onMouseEnter('Close', 60)}
            >
                <Icon path="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </button>
            <img
                src={src}
                alt="Enlarged project view"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
                onMouseEnter={() => onMouseEnter('', 0)}
                onMouseLeave={() => onMouseEnter('Close', 60)}
            />
            <button
                className={`${buttonStyles} right-4`}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                onMouseEnter={() => onMouseEnter('>', 50)}
                onMouseLeave={() => onMouseEnter('Close', 60)}
            >
                <Icon path="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </button>
            <button
                className="absolute top-4 right-4 rounded-full bg-black/30 text-white p-2 hover:bg-black/60 transition-colors focus:outline-none"
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                onMouseEnter={() => onMouseEnter('Close', 60)}
                onMouseLeave={onMouseLeave}
            >
                <Icon path="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </button>
        </div>
    );
};

const ProjectPage = ({ project, onBack, onMouseEnter, onMouseLeave }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        onMouseLeave(); 
    };

    const showNextImage = () => {
        setSelectedImageIndex(prevIndex => (prevIndex + 1) % project.images.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex(prevIndex => (prevIndex - 1 + project.images.length) % project.images.length);
    };


    return (
        <>
            <div>
                <GlassRippleButton onClick={onBack} className="py-2 px-5 mb-8 rounded-lg border" onMouseEnter={() => onMouseEnter('', 40)} onMouseLeave={onMouseLeave}>
                    ← Back to Work
                </GlassRippleButton>
                <h2 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white mb-4">{project.title}</h2>
                <div className="flex items-center gap-x-4 mt-2 mb-8 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                    <span>{project.description}</span>
                    <span>{project.year}</span>
                </div>
                <p className="text-base leading-relaxed mb-8 text-brown-text dark:text-neutral-400">{project.longDescription}</p>

                <div className="border-t-2 border-beige-border dark:border-neutral-800 pt-8">
                     <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Media Library</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {project.images.map((image, index) => (
                            <div
                                key={index}
                                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                                onClick={() => openModal(index)}
                                onMouseEnter={() => onMouseEnter('View', 80)}
                                onMouseLeave={onMouseLeave}
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
                </div>
            </div>

            {isModalOpen && (
                <ImageModal
                    src={project.images[selectedImageIndex]}
                    onClose={closeModal}
                    onNext={showNextImage}
                    onPrev={showPrevImage}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
            )}
        </>
    );
};

const PokvirjenkaPage = ({ project, onBack, onMouseEnter, onMouseLeave }) => {
    if (!project) return null;

    return (
      <div>
            <GlassRippleButton onClick={onBack} className="py-2 px-5 mb-8 rounded-lg border" onMouseEnter={() => onMouseEnter('', 40)} onMouseLeave={onMouseLeave}>
                ← Back to Work
            </GlassRippleButton>
            <h2 className="text-4xl sm:text-5xl font-bold text-brown-text dark:text-white mb-4">{project.title}</h2>
            <div className="flex items-center gap-x-4 mt-2 mb-8 text-sm uppercase tracking-widest text-brown-muted dark:text-neutral-500">
                <span>{project.description}</span>
                <span>{project.year}</span>
            </div>
            <p className="text-base leading-relaxed mb-8 text-brown-text dark:text-neutral-400">{project.longDescription}</p>

            <div className="border-t-2 border-beige-border dark:border-neutral-800 pt-8">
                <h3 className="text-2xl font-bold text-brown-text dark:text-white mb-6">Interactive Experience</h3>
                <div 
                    className="w-full bg-beige-soft dark:bg-neutral-900 rounded-lg overflow-hidden mt-6 border-2 border-beige-border dark:border-neutral-800"
                    style={{ aspectRatio: '4 / 3' }}
                    onMouseEnter={() => onMouseEnter('Interact', 80)}
                    onMouseLeave={onMouseLeave}
                >
                    <iframe
                        src="/pokvirjenka/index-magazine.html"
                        title={project.title}
                        className="w-full h-full border-0"
                    />
                </div>
                <p className="text-sm text-center mt-4 text-brown-muted dark:text-neutral-500">
                    The interactive content is displayed above.
                </p>
            </div>
      </div>
    );
};


const ContactPage = ({ onBack, onMouseEnter, onMouseLeave }) => (
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


// --- Main App Component ---
function AppContent() {
    const [cursorState, setCursorState] = useState({ size: 20, text: '' });
    const [activePage, setActivePage] = useState('home');
    const [selectedProject, setSelectedProject] = useState(null);

    const handleMouseEnter = (text = '', size = 60) => setCursorState({ text, size });
    const handleMouseLeave = () => setCursorState({ text: '', size: 20 });

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setActivePage('project');
        window.scrollTo(0, 0);
    };

    const navigateTo = (page) => {
        setActivePage(page);
        window.scrollTo(0, 0);
    }

    const renderContent = () => {
        switch (activePage) {
            case 'project':
                if (selectedProject?.id === 'pokvirjenka-zine') {
                    return <PokvirjenkaPage project={selectedProject} onBack={() => navigateTo('home')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
                }
                return <ProjectPage project={selectedProject} onBack={() => navigateTo('home')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
            case 'contact':
                return <ContactPage onBack={() => navigateTo('home')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
            case 'home':
            default:
                return <HomePage onProjectClick={handleProjectClick} onContactClick={() => navigateTo('contact')} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />;
        }
    };

    return (
        <>
            <InteractiveGridBackground />

            <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-1" style={{ backgroundImage: 'var(--grain-texture)', opacity: 'var(--grain-opacity)', animation: 'grain 8s steps(10) infinite' }}></div>
            <MouseFollower size={cursorState.size} text={cursorState.text} />

            <div className="relative z-10 min-h-screen font-sans antialiased">
                <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
                    <main id="work">
                        {renderContent()}
                    </main>
                </div>

                <div className="my-16 md:my-24">
                    <MarqueeStripe
                        onClick={() => navigateTo('contact')}
                        onMouseEnter={() => handleMouseEnter('Contact Me', 89)}
                        onMouseLeave={handleMouseLeave}
                    />
                </div>

                <footer className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-brown-muted dark:text-neutral-600 uppercase">
                           &copy; {new Date().getFullYear()} Oblikovalsky
                        </p>
                        <div className="flex items-center space-x-4">
                            <a href="mailto:hello@oblikovalsky.xyz" className="text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><EmailIcon /></a>
                            <a href="#" className="text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><LinkedInIcon /></a>
                            <a href="#" className="text-brown-muted dark:text-neutral-500 hover:text-brown-text dark:hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><GitHubIcon /></a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

// Final export wrapped in the ThemeProvider
export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
