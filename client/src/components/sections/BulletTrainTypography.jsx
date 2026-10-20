import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BulletTrainTypography
 * Clean, high-impact responsive typography for:
 * "Tarunika B - Full stack Developer"
 *
 * Loops a high-speed bullet train kinetic rush every 5 seconds:
 * - Fluid typography scaling seamlessly across any mobile, tablet, or desktop screen
 * - No horizontal line strips or artifacts
 * - Clean, distraction-free Google typography
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
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 select-none pointer-events-none w-full max-w-7xl mx-auto">
      {/* Primary Headline: Tarunika B */}
      <div className="overflow-visible relative py-1 sm:py-2 w-full">
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
          className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tighter text-[#111318] leading-[0.95] drop-shadow-xs"
        >
          Tarunika B
        </motion.h1>
      </div>

      {/* Sub-headline: Full stack Developer */}
      <div className="overflow-visible relative mt-2 sm:mt-4 w-full">
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
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
        >
          <span className="text-[#111318]">Full stack</span>
          <span className="relative inline-block text-[#5490F8]">
            Developer
            <span className="absolute -bottom-1 left-0 right-0 h-1.5 sm:h-2 bg-[#5490F8]/20 rounded-full" />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BulletTrainTypography;
