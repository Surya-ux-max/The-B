import React from 'react';
import { motion } from 'framer-motion';

const accentColors = ['#5B95F9', '#34A853', '#FFCE35', '#F6B4F0'];

/**
 * BioMetricsStrip
 * Research instrumentation telemetry strip displaying key engineering stats
 * with monospace typography and Google dot indicators.
 */
export const BioMetricsStrip = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
      {stats.map((stat, idx) => {
        const dotColor = accentColors[idx % accentColors.length];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="labs-surface p-4 sm:p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
                SPEC.0{idx + 1}
              </span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dotColor }}
                aria-hidden="true"
              />
            </div>

            <div>
              <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[var(--color-text)] tracking-tight leading-none mb-1.5">
                {stat.value}
              </div>
              <p className="text-xs text-[var(--color-muted)] font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BioMetricsStrip;

