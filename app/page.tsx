'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import CyberBackground from './components/CyberBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Contact from './components/Contact';
import AccessCodeInput from './components/AccessCodeInput';
import type { KonamiFormRef } from './components/KonamiContactForm';

// Dynamically import the Konami component to avoid hydration errors with window-based effects
const KonamiContactForm = dynamic(
  () => import('./components/KonamiContactForm'),
  { ssr: false }
);

// Sample project data
const projects = [
  {
    title: 'NEURAL NETWORK',
    description: 'A deep learning project using TensorFlow for image recognition with advanced pattern matching.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    tags: ['AI', 'Machine Learning', 'TensorFlow'],
    link: '#',
  },
  {
    title: 'QUANTUM INTERFACE',
    description: 'Next-gen UI framework for scalable applications with interactive holographic elements.',
    image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e',
    tags: ['UX/UI', 'Framework', 'React'],
    link: '#',
  },
  {
    title: 'CYBER SECURITY',
    description: 'Advanced encryption system designed to protect data integrity across distributed networks.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    tags: ['Security', 'Blockchain', 'Cryptography'],
    link: '#',
  },
  {
    title: 'VIRTUAL REALITY',
    description: 'Immersive VR experience designed for scientific visualization and education.',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac',
    tags: ['VR', '3D', 'Education'],
    link: '#',
  },
];

export default function Home() {
  // Create a ref to the KonamiContactForm
  const konamiFormRef = useRef<KonamiFormRef>(null);

  // Function to directly show the form
  const showKonamiForm = () => {
    if (konamiFormRef.current) {
      konamiFormRef.current.showForm();
    } else {
      console.error("Konami form ref not available");
    }
  };

  return (
    <main className="relative">
      {/* 3D Background */}
      <CyberBackground />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-cyber text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">PROJECT</span>
              <span className="text-cyber-blue">.SHOWCASE</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-futuristic">
              Explore my digital creations. Each project represents a unique challenge and innovative solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative cyber-grid-bg">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyber-dark to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cyber text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="text-white">ABOUT</span>
              <span className="text-cyber-purple">.SYSTEM</span>
            </h2>

            <div className="bg-cyber-dark/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-cyber-purple/30 mb-10">
              <h3 className="font-cyber text-xl mb-4 text-cyber-blue">SYSTEM PROFILE</h3>
              <p className="text-gray-300 mb-4 font-futuristic">
                I am a creative developer specializing in building immersive digital experiences. With expertise in both design and development, I create solutions that are not only functional but visually striking and engaging.
              </p>
              <p className="text-gray-300 mb-4 font-futuristic">
                My work spans from futuristic interfaces to complex web applications, always with a focus on pushing the boundaries of what's possible on the web. I'm passionate about creating digital worlds that feel alive and interactive.
              </p>
              <p className="text-gray-300 font-futuristic">
                When I'm not coding, you can find me exploring new design trends, experimenting with creative coding, or diving into the latest technologies in AR/VR and 3D on the web.
              </p>
            </div>

            {/* Skills */}
            <div id="skills">
              <h3 className="font-cyber text-2xl mb-6 text-center">
                <span className="text-white">INSTALLED</span>
                <span className="text-cyber-blue">.MODULES</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['JavaScript', 'TypeScript', 'React', 'Three.js', 'WebGL', 'Node.js', 'Next.js', 'CSS/SCSS', 'Tailwind CSS', 'UI/UX Design', 'Animation', '3D Modeling'].map((skill, index) => (
                  <div
                    key={index}
                    className="bg-cyber-dark/60 backdrop-blur-sm p-4 rounded border border-cyber-blue/20 hover:border-cyber-blue/50 transition-colors duration-300 group"
                  >
                    <span className="font-cyber text-sm text-gray-200 group-hover:text-cyber-blue transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <footer className="py-10 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="font-cyber text-sm mb-2">
              <span className="text-gray-400">DESIGNED AND DEVELOPED BY</span>
              <span className="text-cyber-blue ml-2">THE MARTIAN</span>
            </p>
            <div className="mb-8">
              <p className="text-gray-300 text-sm mb-2 font-cyber">
                SECRET CONTACT ACCESS
              </p>
              <p className="text-gray-400 text-xs mb-3">
                Type the Konami code sequence to reveal a hidden contact form:<br />
                <span className="text-cyber-purple font-mono inline-block mt-2">
                  ↑ ↑ ↓ ↓ ← → ← → B A
                </span>
              </p>
              <p className="text-gray-500 text-xs mb-4">
                (Press the arrow keys, followed by letters B and A in sequence)
              </p>
            </div>
            <div className="mt-6 flex justify-center space-x-6 items-center">
              <div className="group relative">
                <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 whitespace-nowrap text-gray-500 opacity-0 group-hover:opacity-60 text-xs transition-opacity duration-300">
                  GitHub
                </span>
              </div>

              <div className="group relative">
                <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                  </svg>
                </a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 whitespace-nowrap text-gray-500 opacity-0 group-hover:opacity-60 text-xs transition-opacity duration-300">
                  LinkedIn
                </span>
              </div>

              <div className="group relative">
                <a href="#" className="text-gray-400 hover:text-cyber-blue transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 whitespace-nowrap text-gray-500 opacity-0 group-hover:opacity-60 text-xs transition-opacity duration-300">
                  Twitter
                </span>
              </div>

              {/* Hidden Mars Access Code trigger */}
              <div className="group relative">
                <AccessCodeInput />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0.5 whitespace-nowrap text-gray-500 opacity-0 group-hover:opacity-60 text-xs transition-opacity duration-300">
                  To MARS!
                </span>
              </div>
            </div>
            <div className="mt-8 text-gray-500 text-xs">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Easter Egg Contact Form */}
      <KonamiContactForm ref={konamiFormRef} />
    </main>
  );
} 