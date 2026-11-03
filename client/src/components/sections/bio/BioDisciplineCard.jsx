import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * BioDisciplineCard
 * Individual Google Labs spec card highlighting a core engineering discipline.
 */
export const BioDisciplineCard = ({ discipline, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="labs-surface group relative flex flex-col justify-between p-5 sm:p-6"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: discipline.accent }}
            />
            <span
              className="label-filter px-2.5 py-0.5 rounded-full border text-[10px]"
              style={{
                backgroundColor: discipline.accentBg,
                color: discipline.accent,
                borderColor: `${discipline.accent}40`
              }}
            >
              TRACK.0{index + 1}
            </span>
          </div>

          <span className="text-[11px] font-mono text-[var(--color-muted)]">
            Active Focus
          </span>
        </div>

        <h3 className="card-title text-base sm:text-lg mb-2 text-[var(--color-text)] group-hover:text-[var(--color-blue)] transition-colors leading-snug">
          {discipline.title}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-5">
          {discipline.description}
        </p>
      </div>

      {/* Tags & Tech Chips */}
      <div className="pt-4 border-t border-[var(--color-beige)]/70">
        <div className="flex flex-wrap gap-1.5">
          {discipline.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[var(--color-text)] border border-[var(--color-beige)] group-hover:border-[var(--color-muted)]/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BioDisciplineCard;

