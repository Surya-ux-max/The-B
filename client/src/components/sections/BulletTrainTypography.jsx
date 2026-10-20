import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * BulletTrainTypography
 * Massive edge-to-edge name headline with kinetic bullet-train entry animation.
 * Sub-headline: "Full Stack Developer" with magenta accent on "Developer".
 */
export const BulletTrainTypography = () => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center px-2 sm:px-6 select-none pointer-events-none w-full">

      {/* ── Primary name — edge-to-edge ── */}
      <div className="overflow-visible w-full flex items-center justify-center">
        <motion.h1
          key={`name-${cycle}`}
          initial={{ opacity: 0.05, x: '-80vw', skewX: -18, filter: 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black leading-[0.88] whitespace-nowrap tracking-tighter drop-shadow-sm"
          style={{ fontSize: 'clamp(2.8rem, 13.5vw, 13rem)', color: '#111318' }}
        >
          Tarunika B
        </motion.h1>
      </div>

      {/* ── Sub-headline — Full Stack Developer ── */}
      <div className="overflow-visible w-full mt-2 sm:mt-4">
        <motion.div
          key={`role-${cycle}`}
          initial={{ opacity: 0.05, x: '80vw', skewX: 18, filter: 'blur(12px)' }}
          animate={{ opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.78, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 font-display font-black tracking-tight leading-none"
          style={{ fontSize: 'clamp(1.4rem, 5.5vw, 5.5rem)' }}
        >
          <span style={{ color: '#111318' }}>Full Stack</span>
          <span className="relative inline-block" style={{ color: '#C2185B' }}>
            Developer
            <span className="absolute -bottom-1 left-0 right-0 h-1.5 sm:h-2 rounded-full bg-[#C2185B]/20" />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default BulletTrainTypography;
