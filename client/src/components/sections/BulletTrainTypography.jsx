import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BulletTrainTypography
 * Styled after the Google Labs reference composition:
 * - Massive, bold typography: "Tarunika B - Full stack Developer"
 * - Huge organic green shape positioned in the background behind the text
 * - Vivid magenta accent color on the overlapping keyword, exactly matching the reference
 * - Repeating 5-second bullet train kinetic animation
 */
export const BulletTrainTypography = () => {
  const [trainCycle, setTrainCycle] = useState(0);

  useEffect(() => {
    // Kinetic bullet train animation triggers every 5 seconds
    const interval = setInterval(() => {
      setTrainCycle((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 select-none pointer-events-none w-full max-w-full mx-auto">
      {/* Primary Headline: Tarunika B — Massive edge-to-edge typography */}
      <div className="overflow-visible relative py-1 sm:py-2 w-full flex items-center justify-center">
        <motion.h1
          key={`name-${trainCycle}`}
          initial={{
            opacity: 0.1,
            x: '-80vw',
            scaleX: 1.5,
            skewX: -20,
            filter: 'blur(10px)'
          }}
          animate={{
            opacity: 1,
            x: 0,
            scaleX: 1,
            skewX: 0,
            filter: 'blur(0px)'
          }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="font-display font-black text-[16vw] sm:text-[15.5vw] md:text-[15vw] lg:text-[14.5vw] xl:text-[14vw] tracking-tighter text-[#111318] leading-[0.86] whitespace-nowrap drop-shadow-xs"
        >
          Tarunika B
        </motion.h1>
      </div>

      {/* Sub-headline: Full stack Developer with reference-inspired magenta accent */}
      <div className="overflow-visible relative mt-2 sm:mt-5 w-full">
        <motion.div
          key={`role-${trainCycle}`}
          initial={{
            opacity: 0.1,
            x: '80vw',
            scaleX: 1.4,
            skewX: 20,
            filter: 'blur(10px)'
          }}
          animate={{
            opacity: 1,
            x: 0,
            scaleX: 1,
            skewX: 0,
            filter: 'blur(0px)'
          }}
          transition={{
            duration: 0.8,
            delay: 0.04,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[6.5rem] tracking-tight leading-none"
        >
          <span className="text-[#111318]">Full stack</span>
          <span className="relative inline-block text-[#C2185B] drop-shadow-xs">
            Developer
            <span className="absolute -bottom-1.5 left-0 right-0 h-2 sm:h-3 bg-[#C2185B]/20 rounded-full" />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BulletTrainTypography;
