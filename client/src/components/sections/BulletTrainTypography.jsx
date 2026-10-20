import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BulletTrainTypography
 * Pure, distraction-free oversized typography for:
 * "Tarunika B - Full stack Developer"
 * Loops a high-speed bullet train kinetic rush with speed streaks every 5 seconds.
 */
export const BulletTrainTypography = () => {
  const [trainCycle, setTrainCycle] = useState(0);
  const [isWhooshing, setIsWhooshing] = useState(false);

  useEffect(() => {
    // High-speed bullet train animation triggers every 5 seconds
    const interval = setInterval(() => {
      setIsWhooshing(true);
      setTrainCycle((prev) => prev + 1);

      const timeout = setTimeout(() => {
        setIsWhooshing(false);
      }, 850);

      return () => clearTimeout(timeout);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 select-none pointer-events-none w-full max-w-7xl mx-auto">
      {/* High-speed bullet train supersonic streaks */}
      <AnimatePresence>
        {isWhooshing && (
          <motion.div
            initial={{ opacity: 0, x: '-100%', skewX: -30 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: ['-100%', '0%', '115%'],
              skewX: [-30, -15, 10]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 pointer-events-none flex flex-col justify-center gap-6 overflow-hidden z-30"
          >
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#2979FF] to-transparent shadow-[0_0_16px_#2979FF]" />
            <div className="w-4/5 mx-auto h-[2.5px] bg-gradient-to-r from-transparent via-[#FFD600] to-transparent shadow-[0_0_12px_#FFD600]" />
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF1776] to-transparent shadow-[0_0_16px_#FF1776]" />
            <div className="w-3/4 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#00E676] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Big Typo: Tarunika B */}
      <div className="overflow-visible relative py-2">
        <motion.h1
          key={`name-${trainCycle}`}
          initial={{
            opacity: 0.15,
            x: '-75vw',
            scaleX: 1.7,
            skewX: -24,
            filter: 'blur(12px)'
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
          className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tighter text-[#111318] leading-[0.9] drop-shadow-sm"
        >
          Tarunika B
        </motion.h1>
      </div>

      {/* Sub-headline Big Typo: Full stack Developer */}
      <div className="overflow-visible relative mt-2 sm:mt-4">
        <motion.div
          key={`role-${trainCycle}`}
          initial={{
            opacity: 0.15,
            x: '75vw',
            scaleX: 1.6,
            skewX: 24,
            filter: 'blur(12px)'
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
            delay: 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
        >
          <span className="text-[#111318]">Full stack</span>
          <span className="relative inline-block text-[#2979FF]">
            Developer
            <span className="absolute -bottom-1.5 left-0 right-0 h-2 bg-[#2979FF]/20 rounded-full" />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BulletTrainTypography;
