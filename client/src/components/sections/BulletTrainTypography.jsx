import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BulletTrainTypography
 * Balanced, refined headline with kinetic bullet-train entry animation.
 * Sub-headline: "Full Stack Developer" with magenta accent on "Developer".
 */
export const BulletTrainTypography = () => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 select-none pointer-events-none w-full max-w-4xl mx-auto -translate-y-6 sm:-translate-y-10">

      {/* ── Primary name — refined scale ── */}
      <div className="overflow-visible w-full flex items-center justify-center">
        <motion.h1
          key={`name-${cycle}`}
          initial={{ opacity: 0.05, x: '-60vw', skewX: -14, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black leading-[0.95] whitespace-nowrap tracking-tight drop-shadow-xs"
          style={{ fontSize: 'clamp(2.2rem, 6.2vw, 5.25rem)', color: '#111318' }}
        >
          Zera Shahadiya S
        </motion.h1>
      </div>

      {/* ── Sub-headline — Full Stack Developer ── */}
      <div className="overflow-visible w-full mt-2 sm:mt-3.5">
        <motion.div
          key={`role-${cycle}`}
          initial={{ opacity: 0.05, x: '60vw', skewX: 14, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.72, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-display font-bold tracking-normal leading-none"
          style={{ fontSize: 'clamp(1.05rem, 2.4vw, 2.15rem)' }}
        >
          <span style={{ color: '#111318' }}>Full Stack</span>
          <span className="relative inline-block" style={{ color: '#C2185B' }}>
            Developer
            <span className="absolute -bottom-1 left-0 right-0 h-1 sm:h-1.5 rounded-full bg-[#C2185B]/20" />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BulletTrainTypography;
