import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags,
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative rounded overflow-hidden cyber-border bg-cyber-dark h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent z-10" />
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-cyber-dark/40 backdrop-blur-sm z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ opacity: 1 }}
          />

          {/* Glowing Border */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              boxShadow: isHovered ? '0 0 20px rgba(0, 240, 255, 0.7)' : 'none',
              borderColor: isHovered ? 'rgba(0, 240, 255, 0.7)' : 'transparent',
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 relative z-30">
          <motion.h3
            className="font-cyber text-xl mb-2 text-white"
            animate={{
              color: isHovered ? '#00F0FF' : '#FFFFFF',
              textShadow: isHovered ? '0 0 8px rgba(0, 240, 255, 0.7)' : 'none',
            }}
          >
            {title}
          </motion.h3>
          <p className="text-gray-300 font-futuristic mb-4">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-sm bg-cyber-dark border border-cyber-blue/30 text-cyber-blue"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Button */}
          <motion.a
            href={link}
            className="font-cyber text-sm inline-block py-2 px-4 border border-cyber-blue text-cyber-blue rounded hover:bg-cyber-blue/10 transition-colors duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 8px rgba(0, 240, 255, 0.7)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE PROJECT
          </motion.a>
        </div>

        {/* Particle burst on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyber-blue rounded-full"
                initial={{
                  opacity: 1,
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  opacity: 0,
                  x: `${50 + (Math.random() * 100 - 50)}%`,
                  y: `${50 + (Math.random() * 100 - 50)}%`,
                  scale: Math.random() * 3,
                }}
                transition={{
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: Math.random() * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard; 