'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic import for the 3D environment component to ensure it only loads on client
const MarsEnvironment = dynamic(
  () => import('../components/MarsEnvironment'),
  { ssr: false }
);

// Define concert data
const concerts = [
  {
    id: 1,
    title: 'TBD',
    date: 'TBD',
    venue: 'TBD',
    image: '/images/mars_concert.jpg', // Changed from URL to local path
    description: 'An unforgettable night with an amazing performance and incredible energy from the crowd.',
  },
  {
    id: 2,
    title: 'TBD',
    date: 'TBD',
    venue: 'TBD',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'The iconic venue was packed with fans singing along to every song. The acoustics were perfect.',
  },
  {
    id: 3,
    title: 'TBD',
    date: 'TBD',
    venue: 'TBD',
    image: '/images/mars_sunrise.jpg', // Changed from URL to local path
    description: 'A magical sunrise performance with the most incredible seaview.',
  },
];

export default function MarsPage() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [activeConcert, setActiveConcert] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-mars-dark relative overflow-hidden">
      {/* 3D Environment */}
      <MarsEnvironment isInteractive={isInteractive} />

      {/* Content Overlay */}
      <AnimatePresence>
        {!isInteractive && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 container mx-auto px-4 py-8"
          >
            {/* Back Button */}
            <Link
              href="/"
              className="inline-block mb-8 text-mars-orange hover:text-mars-dust transition-colors duration-300"
            >
              ← Back to Earth
            </Link>

            {/* Title */}
            <h1 className="font-mars text-4xl md:text-6xl font-bold mb-6 text-white">
              <span className="text-mars-orange">MARS</span> CONCERTS
            </h1>

            {/* Subtitle */}
            <p className="text-mars-dust text-lg md:text-xl mb-12 max-w-2xl">
              Experience the future of live music in our state-of-the-art Mars concert venues.
            </p>

            {/* Concert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {concerts.map((concert) => (
                <div
                  key={concert.id}
                  className="concert-card group relative bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-sm rounded-lg overflow-hidden border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500"
                  onMouseEnter={() => setActiveConcert(concert.id)}
                  onMouseLeave={() => setActiveConcert(null)}
                >
                  <div className="w-full overflow-hidden">
                    <div
                      className="w-full h-48 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${concert.image})`,
                        filter: 'sepia(0.5) brightness(0.7)'
                      }}
                    />
                    {/* VHS effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-30 mix-blend-overlay"></div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-orange-300 text-xl font-mars mb-2 tracking-wider group-hover:text-orange-200 transition-colors duration-300">
                      {concert.title}
                    </h3>
                    <div className="text-orange-200/80 text-sm mb-3">
                      <span className="mr-2">{concert.date}</span>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-orange-900/40 text-xs">
                        {concert.venue}
                      </span>
                    </div>
                    <p className="text-orange-100/60 text-sm">
                      {concert.description}
                    </p>
                  </div>

                  {/* Expanded view */}
                  {activeConcert === concert.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 to-red-900/90 backdrop-blur-lg p-6 transform transition-all duration-300 flex flex-col justify-center">
                      <h3 className="text-orange-300 text-2xl font-mars mb-4 tracking-wider">
                        {concert.title}
                      </h3>
                      <p className="text-orange-100/90 mb-4 leading-relaxed">
                        {concert.description}
                      </p>
                      <div className="mt-auto">
                        <div className="text-orange-200/80 text-sm">
                          <div className="mb-1">{concert.date}</div>
                          <div className="font-semibold">{concert.venue}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quote section */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-sm p-8 rounded-lg border border-orange-500/20 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500/40"></div>
                <div className="mx-3 text-orange-400/60">✧</div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-500/40"></div>
              </div>
              <blockquote className="text-orange-200 text-lg md:text-2xl font-mars leading-relaxed tracking-wide">
                {/* "这么努力还是干不掉我，那该怎么办呢？继续加油咯！" */}
              </blockquote>
              <div className="flex items-center justify-center mt-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-500/40"></div>
                <div className="mx-3 text-orange-400/60">✧</div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-500/40"></div>
              </div>
              <div className="mt-6 text-orange-300/60 font-mars tracking-wider">— MARS BASE COMMANDER</div>
            </div>

            {/* Enter Concert Button */}
            <motion.button
              onClick={() => setIsInteractive(true)}
              className="fixed bottom-8 right-8 bg-mars-orange text-white px-8 py-4 rounded-full font-mars text-lg hover:bg-mars-dust transition-colors duration-300 shadow-lg hover:shadow-mars-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ENTER CONCERT!
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Interactive Mode Button */}
      <AnimatePresence>
        {isInteractive && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsInteractive(false)}
            className="fixed top-8 right-8 bg-mars-orange/80 text-white px-6 py-3 rounded-full font-mars text-lg hover:bg-mars-dust transition-colors duration-300 shadow-lg hover:shadow-mars-glow z-20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXIT CONCERT
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 