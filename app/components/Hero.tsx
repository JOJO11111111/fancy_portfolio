import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';

const Hero = () => {
  const glitchTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!glitchTextRef.current) return;

    // Setup glitch animation
    const glitchElement = glitchTextRef.current;

    const glitchAnimation = () => {
      // Random offset timing for natural glitch effect
      const glitchTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: gsap.utils.random(1, 3),
      });

      // Text shift animation
      glitchTimeline.to(glitchElement, {
        skewX: gsap.utils.random(-10, 10),
        duration: 0.1,
        ease: "power1.inOut",
      });

      // Color split animation
      glitchTimeline.to(glitchElement, {
        textShadow: `${gsap.utils.random(-5, 5)}px 0 #00F0FF, ${gsap.utils.random(-5, 5)}px 0 #FF00FF`,
        duration: 0.1,
        ease: "power1.inOut",
      }, "<");

      // Reset
      glitchTimeline.to(glitchElement, {
        skewX: 0,
        textShadow: "none",
        duration: 0.1,
        ease: "power1.inOut",
      });

      return glitchTimeline;
    };

    const masterTimeline = gsap.timeline();
    masterTimeline.add(glitchAnimation());

    return () => {
      masterTimeline.kill();
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden cyber-grid-bg">
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <p className="font-mono text-cyber-blue text-sm md:text-base tracking-wider">
              &lt;<span className="text-cyber-purple">initialize</span>/&gt;
            </p>
          </motion.div>

          <motion.h1
            ref={glitchTextRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-cyber text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            data-text="CYBERNETIC INTERFACE"
          >
            <span className="text-white">CYBER</span>
            <span className="text-cyber-blue">NETIC</span>
            <span className="text-white"> INTER</span>
            <span className="text-cyber-purple">FACE</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className="text-gray-300 text-lg md:text-xl mb-8 font-futuristic leading-relaxed max-w-3xl">
              Welcome to my digital realm. I create immersive digital experiences at the intersection of design and code. Navigate through my projects and abilities in this cyberpunk-inspired interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="#projects">
              <button className="bg-cyber-dark border border-cyber-blue text-cyber-blue font-cyber py-3 px-8 rounded hover:bg-cyber-blue/10 transition-all duration-300 relative overflow-hidden group">
                <span className="relative z-10 tracking-wider">EXPLORE PROJECTS</span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-cyber-blue/20 transition-all duration-300 group-hover:h-full -z-0"></span>
              </button>
            </Link>
            <Link href="#about">
              <button className="bg-cyber-blue text-cyber-black font-cyber py-3 px-8 rounded hover:bg-cyber-blue/80 transition-all duration-300 shadow-neon-blue tracking-wider">
                ACCESS PROFILE
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyber-dark to-transparent z-0"></div>

      {/* Animated circuit pattern */}
      <div className="absolute -bottom-10 right-0 w-96 h-96 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1"
            d="M10,10 L50,10 L50,50 L90,50 L90,90 L130,90 L130,130 L170,130 L170,170"
          />
          <path
            fill="none"
            stroke="#BD00FF"
            strokeWidth="1"
            d="M30,30 L70,30 L70,70 L110,70 L110,110 L150,110 L150,150 L190,150"
          />
          <circle cx="10" cy="10" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="50" cy="10" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="50" cy="50" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="90" cy="50" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="90" cy="90" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="130" cy="90" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="130" cy="130" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="170" cy="130" r="3" fill="#00F0FF" className="animate-glow-pulse" />
          <circle cx="170" cy="170" r="3" fill="#00F0FF" className="animate-glow-pulse" />

          <circle cx="30" cy="30" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="70" cy="30" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="70" cy="70" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="110" cy="70" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="110" cy="110" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="150" cy="110" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="150" cy="150" r="3" fill="#BD00FF" className="animate-glow-pulse" />
          <circle cx="190" cy="150" r="3" fill="#BD00FF" className="animate-glow-pulse" />
        </svg>
      </div>
    </section>
  );
};

export default Hero; 