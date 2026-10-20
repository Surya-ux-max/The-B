import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

/**
 * BulletTrainTypography
 * Displays "Tarunika B - Full stack Developer" in oversized bold typography
 * with a high-speed "bullet train" kinetic streak animation that triggers every 5 seconds.
 */
export const BulletTrainTypography = () => {
  const [trainCycle, setTrainCycle] = useState(0);
  const [isWhooshing, setIsWhooshing] = useState(false);

  useEffect(() => {
    // 5 second repeating cycle
    const interval = setInterval(() => {
      setIsWhooshing(true);
      setTrainCycle((prev) => prev + 1);

      // Animation duration: 800ms
      const timeout = setTimeout(() => {
        setIsWhooshing(false);
      }, 850);

      return () => clearTimeout(timeout);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 select-none pointer-events-none">
      {/* Bullet Train Speed Lines Streak Overlay */}
      <AnimatePresence>
        {isWhooshing && (
          <motion.div
            initial={{ opacity: 0, x: '-100%', skewX: -35 }}
            animate={{ opacity: [0, 1, 1, 0], x: ['-100%', '0%', '120%'], skewX: [-35, -20, 10] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 pointer-events-none flex flex-col justify-center gap-4 overflow-hidden z-30"
          >
            {/* Speed streak lines imitating bullet train rails and velocity */}
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#5B95F9] to-transparent shadow-[0_0_12px_#5B95F9]" />
            <div className="w-4/5 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#FFCE35] to-transparent" />
            <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#F6B4F0] to-transparent shadow-[0_0_12px_#F6B4F0]" />
            <div className="w-3/4 mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#34A853] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-beige)] text-xs font-mono font-medium text-[var(--color-text)] shadow-xs mb-6 pointer-events-auto"
      >
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#5B95F9] animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-[#FFCE35]" />
          <span className="w-2 h-2 rounded-full bg-[#F6B4F0]" />
          <span className="w-2 h-2 rounded-full bg-[#34A853]" />
        </div>
        <span>Bullet Train Loop (5s)</span>
        <span className="text-[10px] text-[var(--color-muted)] border-l border-[var(--color-beige)] pl-2">
          Gravitational Canvas
        </span>
      </motion.div>

      {/* MAIN BIG TYPOGRAPHY: Tarunika B */}
      <div className="overflow-visible relative py-2">
        <motion.h1
          key={`name-${trainCycle}`}
          initial={{
            opacity: 0.1,
            x: '-80vw',
            scaleX: 1.8,
            skewX: -25,
            filter: 'blur(14px)'
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
          className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tighter text-[var(--color-text)] leading-[0.9] drop-shadow-xs"
        >
          Tarunika B
        </motion.h1>
      </div>

      {/* SUB-HEADLINE BIG TYPO: Full Stack Developer */}
      <div className="overflow-visible relative mt-2 sm:mt-4">
        <motion.div
          key={`role-${trainCycle}`}
          initial={{
            opacity: 0.1,
            x: '80vw',
            scaleX: 1.6,
            skewX: 25,
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
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
        >
          <span className="text-[var(--color-text)]">Full stack</span>
          <span className="relative inline-block text-[var(--color-blue)]">
            Developer
            <span className="absolute -bottom-1 left-0 right-0 h-2 bg-[#5B95F9]/20 rounded-full" />
          </span>
        </motion.div>
      </div>

      {/* Playful Floating Helper Label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-xs sm:text-sm font-mono text-[var(--color-muted)] flex items-center gap-2 pointer-events-auto bg-white/70 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[var(--color-beige)] shadow-2xs"
      >
        <Zap className="w-3.5 h-3.5 text-[#FFCE35]" />
        <span>Click, drag &amp; fling floating shapes to test gravity physics</span>
      </motion.p>
    </div>
  );
};

export default BulletTrainTypography;
