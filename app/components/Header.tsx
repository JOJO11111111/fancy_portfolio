import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { title: 'HOME', path: '/' },
    { title: 'ABOUT', path: '#about' },
    { title: 'PROJECTS', path: '#projects' },
    { title: 'SKILLS', path: '#skills' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cyber-dark/80 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="font-cyber text-xl md:text-2xl font-bold text-white">
                MARTIAN<span className="text-cyber-blue">.SYS</span>
              </span>
              <span className="absolute -inset-0.5 bg-cyber-blue/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={link.path}
                  className="font-cyber text-sm tracking-wider hover:text-cyber-blue transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{link.title}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
            >
              <button
                className="font-cyber text-sm tracking-wider text-cyber-black bg-cyber-blue px-4 py-2 rounded hover:bg-cyber-blue/80 transition-colors duration-300 shadow-neon-blue"
              >
                INITIALIZE
              </button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden flex flex-col space-y-1.5 cursor-pointer z-50"
            onClick={toggleMenu}
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-cyber-blue"
            ></motion.span>
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-cyber-blue"
            ></motion.span>
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-cyber-blue"
            ></motion.span>
          </motion.button>

          {/* Mobile Menu */}
          <motion.div
            className={`fixed inset-0 bg-cyber-dark/95 z-40 md:hidden cyber-grid-bg flex flex-col items-center justify-center ${isMenuOpen ? 'flex' : 'hidden'
              }`}
            initial={{ opacity: 0 }}
            animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className="font-cyber text-xl tracking-wider hover:text-cyber-blue transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
              >
                <button
                  className="font-cyber text-sm tracking-wider text-cyber-black bg-cyber-blue mt-4 px-6 py-3 rounded hover:bg-cyber-blue/80 transition-colors duration-300 shadow-neon-blue"
                >
                  INITIALIZE
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header; 