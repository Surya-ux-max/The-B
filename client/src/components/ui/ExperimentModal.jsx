import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';

export const ExperimentModal = ({ experiment, onClose }) => {
  if (!experiment) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[var(--color-beige)] overflow-hidden z-10 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-beige)]/60 bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: experiment.accent }}
              />
              <span className="label-filter text-[var(--color-muted)]">
                {experiment.category} // Case Study
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="label-filter px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: experiment.accentBg,
                    color: experiment.accent
                  }}
                >
                  {experiment.status}
                </span>
                <span className="text-xs font-mono text-[var(--color-muted)]">
                  Performance: {experiment.metrics}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--color-text)]">
                {experiment.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
              {experiment.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[var(--color-beige)] space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-[var(--color-text)]">
                Architectural Highlights
              </h4>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Designed and built by Tarunika B with end-to-end full stack principles, rigorous type safety, modular component interfaces, and high-performance execution.
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="label-filter text-[var(--color-muted)] mb-2.5">
                Technologies &amp; Libraries
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {experiment.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-neutral-100 text-[var(--color-text)] border border-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-[var(--color-beige)]/60 bg-[#FAF8F5] flex items-center justify-between">
            <span className="text-xs font-mono text-[var(--color-muted)]">
              Year: {experiment.year}
            </span>

            <div className="flex items-center gap-2">
              <a
                href={experiment.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 text-xs font-semibold text-[var(--color-text)] hover:bg-neutral-100 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[var(--color-text)] text-white text-xs font-semibold hover:bg-[var(--color-blue)] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExperimentModal;
