import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AccessCodeInput = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [codeCorrect, setCodeCorrect] = useState(false);
  const router = useRouter();

  const CORRECT_CODE = '08042'; // Changed back to 5 digits

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccessCode(value);

    // Check if code matches but don't immediately redirect
    if (value === CORRECT_CODE) {
      console.log('Access code correct');
      setCodeCorrect(true);
    } else {
      setCodeCorrect(false);
    }
  };

  // Use effect to handle the delay and redirection
  useEffect(() => {
    let redirectTimer: NodeJS.Timeout;
    let animationTimer: NodeJS.Timeout;

    if (codeCorrect) {
      // Immediately start prefetching the Mars page
      router.prefetch('/mars');

      // Add a slight delay before showing the redirect animation
      redirectTimer = setTimeout(() => {
        // Show the redirection animation first
        setIsRedirecting(true);

        // Wait for animation to fade out completely before navigating
        // The CSS animation duration is 4s (smoothFadeOut), so wait a bit longer
        animationTimer = setTimeout(() => {
          router.push('/mars');
        }, 3000); // Complete fade-out animation before navigation
      }, 200); // 300ms delay to show the completed code
    }

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [codeCorrect, router]);

  return (
    <div className="relative flex items-center">
      {/* Mars Portal Icon with more compact dimensions to match social icons */}
      <button
        onClick={() => setIsInputVisible(!isInputVisible)}
        className="flex items-center justify-center w-6 h-6 focus:outline-none transform transition-transform duration-200 hover:scale-110"
        aria-label="Access portal"
      >
        {/* Updated SVG with dimensions matching social icons */}
        <svg className="mars-portal-icon w-6 h-6" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          {/* Base face centered but moved down slightly and scaled down */}
          <circle className="face" cx="50" cy="55" r="38" fill="#555555" opacity="0.7" />
          {/* Vertically thinner oval eyes */}
          <ellipse className="eye" cx="37" cy="47" rx="3" ry="6" fill="#000" opacity="0.9" />
          <ellipse className="eye" cx="63" cy="47" rx="3" ry="6" fill="#000" opacity="0.9" />
          <path className="smile" d="M37 67 Q50 79 63 67" stroke="#000" strokeWidth="4" fill="none" opacity="0.9" />

          {/* Flower (initially hidden) - adjusted for new face position */}
          <g className="flower" opacity="0">
            <g className="bloom" opacity="0" transform="translate(50, 25) scale(0)">
              <circle cx="0" cy="0" r="7" fill="#FF3E3E" />
              <circle cx="6" cy="-6" r="6" fill="#FF3E3E" />
              <circle cx="-6" cy="-6" r="6" fill="#FF3E3E" />
              <circle cx="6" cy="6" r="6" fill="#FF3E3E" />
              <circle cx="-6" cy="6" r="6" fill="#FF3E3E" />
              <circle cx="0" cy="0" r="4" fill="#FFFF00" />
            </g>
          </g>
        </svg>
      </button>

      {/* Hidden input field with adjusted position */}
      {isInputVisible && !isRedirecting && (
        <div className="absolute bottom-8 -left-3 transform -translate-x-1/4 z-10">
          <div className={`bg-cyber-dark/80 backdrop-blur-sm p-2 rounded border ${codeCorrect ? 'border-cyber-green/50 shadow-neon-green' : 'border-cyber-blue/30 shadow-neon-blue'} transition-all duration-300`}>
            <input
              type="text"
              maxLength={5}
              value={accessCode}
              onChange={handleChange}
              placeholder="Enter code"
              className={`w-28 bg-transparent border-b ${codeCorrect ? 'border-cyber-green text-cyber-green' : 'border-cyber-blue/50 text-gray-200'} text-xs px-2 py-1 focus:outline-none transition-colors duration-300`}
              autoFocus
            />
          </div>
        </div>
      )}


      {/* Access Granted Overlay - shown when correct code is entered */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center smooth-fade-out">
          <div className="text-center">
            <h2 className="font-cyber text-5xl text-cyber-red mb-3 neon-text-red pulse-glow">ACCESS GRANTED</h2>
            <p className="text-mars-dust/80 font-mars text-xl fade-up">REDIRECTING TO MARS...</p>
            <div className="mt-6 w-64 h-1 mx-auto bg-gradient-to-r from-transparent via-mars-red to-transparent loading-bar"></div>
          </div>
        </div>
      )}

      {/* CSS for the Mars Icon Animations - update the animation coordinates */}
      <style jsx>{`
        .mars-portal-icon:hover .flower {
          opacity: 1;
        }

        /* Bloom animation - appears directly on hover with adjusted coordinates */
        .mars-portal-icon:hover .bloom {
          animation: 
            bloomAppear 1.2s ease-out forwards,
            bloomSway 2s ease-in-out 1.2s infinite alternate;
          transform-origin: 0 0;
        }

        @keyframes bloomAppear {
          0% {
            opacity: 0;
            transform: translate(50px, 15px) scale(0);
          }
          100% {
            opacity: 1;
            transform: translate(50px, 15px) scale(1.2);
          }
        }

        @keyframes bloomSway {
          0% {
            transform: translate(50px, 15px) scale(1.2) rotate(-3deg);
          }
          100% {
            transform: translate(50px, 15px) scale(1.2) rotate(3deg);
          }
        }

        /* Improved Access Granted Fade-out Animation */
        .smooth-fade-out {
          animation: smoothFadeOut 4s ease-in-out forwards;
          background: radial-gradient(circle at center, rgba(20,5,5,0.95) 0%, rgba(0,0,0,0.98) 100%);
        }

        @keyframes smoothFadeOut {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .pulse-glow {
          animation: pulseGlow 3.5s ease-in-out forwards;
          text-shadow: 0 0 15px rgba(255, 0, 60, 0.8), 0 0 25px rgba(255, 0, 60, 0.5);
        }

        @keyframes pulseGlow {
          0% {
            opacity: 0;
            transform: scale(0.9);
            text-shadow: 0 0 5px rgba(255, 0, 60, 0.5), 0 0 15px rgba(255, 0, 60, 0.3);
          }
          15% {
            opacity: 1;
            transform: scale(1);
            text-shadow: 0 0 15px rgba(255, 0, 60, 0.8), 0 0 25px rgba(255, 0, 60, 0.5);
          }
          30% {
            text-shadow: 0 0 20px rgba(255, 0, 60, 0.9), 0 0 30px rgba(255, 0, 60, 0.7);
          }
          50% {
            text-shadow: 0 0 15px rgba(255, 0, 60, 0.8), 0 0 25px rgba(255, 0, 60, 0.5);
          }
          70% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.1);
            text-shadow: 0 0 0px rgba(255, 0, 60, 0);
          }
        }

        .fade-up {
          animation: fadeUp 3.5s ease-in-out forwards;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          15% {
            opacity: 1;
            transform: translateY(0);
          }
          70% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .loading-bar {
          position: relative;
          overflow: hidden;
          height: 2px;
          opacity: 0.7;
        }

        .loading-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(232, 93, 4, 0.8), transparent);
          animation: loadingBar 3.5s ease-in-out forwards;
          transform: translateX(-100%);
        }

        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(232, 93, 4, 0.8), 0 0 20px rgba(232, 93, 4, 0.4);
        }
      `}</style>
    </div>
  );
};

export default AccessCodeInput;