import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BioPrinciples
 * Interactive laboratory spec cards showcasing guiding engineering principles.
 */
export const BioPrinciples = ({ principles = [] }) => {
  const [activePrinciple, setActivePrinciple] = useState(0);

  return (
    <div className="labs-surface p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[var(--color-beige)]/70 mb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
            Core Methodologies
          </span>
          <h4 className="card-title text-base sm:text-lg text-[var(--color-text)]">
            Guiding Engineering Principles
          </h4>
        </div>
        <span className="text-xs font-mono text-[var(--color-muted)]">
          04 / 04 Verified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {principles.map((principle, idx) => {
          const isActive = activePrinciple === idx;
          return (
            <motion.div
              key={principle.id}
              onClick={() => setActivePrinciple(idx)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-[#FAF8F5] border-[var(--color-text)] shadow-xs'
                  : 'bg-white border-[var(--color-beige)]/80 hover:border-[var(--color-muted)]'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--color-blue)]">
                  [{principle.id}]
                </span>
                <h5 className="font-display font-semibold text-xs sm:text-sm text-[var(--color-text)] mt-1.5 mb-2 leading-snug">
                  {principle.label}
                </h5>
              </div>

              <p className="text-[11px] text-[var(--color-muted)] leading-relaxed">
                {principle.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BioPrinciples;

