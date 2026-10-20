import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';

export const ExperimentCard = ({ experiment, rotation = 0, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      animate={{
        rotate: isHovered ? 0 : rotation,
        y: isHovered ? -6 : 0
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="labs-surface group relative flex flex-col p-5 sm:p-6 cursor-pointer"
      onClick={() => onSelect && onSelect(experiment)}
      style={{
        borderColor: isHovered ? experiment.accent : 'var(--color-beige)'
      }}
    >
      {/* Top Header: Category Pill & Year */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className="label-filter px-2.5 py-0.5 rounded-full border"
          style={{
            backgroundColor: experiment.accentBg,
            color: experiment.accent,
            borderColor: `${experiment.accent}40`
          }}
        >
          {experiment.category}
        </span>

        <span className="text-[11px] font-mono text-[var(--color-muted)]">
          {experiment.year}
        </span>
      </div>

      {/* Card Visual / Thumbnail Block with Google Labs Geometry */}
      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#FAF8F5] border border-[var(--color-beige)]/70 mb-4 flex items-center justify-center p-4">
        {/* Abstract Geometric centerpiece matching the experiment */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: experiment.accentBg }}
          >
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: experiment.accent }}
            />
          </div>

          {/* Accent secondary float */}
          <div
            className="absolute top-2 right-2 w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: experiment.accent }}
          />

          <span className="absolute bottom-2 left-2 text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
            {experiment.status}
          </span>
        </div>
      </div>

      {/* Card Title & Body Copy */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="card-title text-base sm:text-lg mb-1.5 group-hover:text-[var(--color-blue)] transition-colors leading-snug">
            {experiment.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-4 line-clamp-2">
            {experiment.description}
          </p>
        </div>

        {/* Tech Stack Chips & Action Link */}
        <div className="pt-3 border-t border-[var(--color-beige)]/60 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {experiment.techStack.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[var(--color-text)] border border-[var(--color-beige)]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="p-1 rounded-full text-[var(--color-muted)] group-hover:text-[var(--color-blue)] transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperimentCard;
