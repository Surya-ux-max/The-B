import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({
  badge = 'Experiments',
  badgeColor = '#5B95F9',
  title,
  highlightWord,
  highlightColor = '#5B95F9',
  description,
  align = 'left',
  className = ''
}) => {
  const renderHighlightedTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span
          className="relative inline-block"
          style={{ color: highlightColor }}
        >
          {highlightWord}
          <span
            className="absolute bottom-1 left-0 right-0 h-1.5 rounded-full opacity-30"
            style={{ backgroundColor: highlightColor }}
            aria-hidden="true"
          />
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className={`max-w-3xl mb-10 md:mb-14 ${
        align === 'center' ? 'mx-auto text-center' : ''
      } ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-3.5"
        >
          <span
            className="label-filter inline-flex items-center gap-1.5 px-3 py-1 rounded-full border"
            style={{
              backgroundColor: `${badgeColor}15`,
              color: badgeColor,
              borderColor: `${badgeColor}35`
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: badgeColor }}
            />
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="section-headline mb-4"
      >
        {renderHighlightedTitle()}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
