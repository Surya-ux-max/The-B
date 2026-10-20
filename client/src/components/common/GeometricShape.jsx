import React from 'react';
import { motion } from 'framer-motion';

export const GeometricShape = ({
  type = 'circle',
  color = 'var(--color-blue)',
  size = 64,
  className = '',
  rotate = 0,
  animate = true,
  opacity = 0.9,
  style = {}
}) => {
  const getShapeStyle = () => {
    switch (type) {
      case 'circle':
        return { borderRadius: '50%' };
      case 'square':
        return { borderRadius: '24%' };
      case 'pill':
        return { borderRadius: '9999px' };
      case 'ring':
        return {
          borderRadius: '50%',
          border: `${Math.max(3, Math.round(size * 0.14))}px solid ${color}`,
          backgroundColor: 'transparent'
        };
      case 'blob':
        return {
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%'
        };
      default:
        return { borderRadius: '50%' };
    }
  };

  const baseStyle = {
    width: size,
    height: size,
    backgroundColor: type === 'ring' ? 'transparent' : color,
    opacity,
    ...getShapeStyle(),
    ...style
  };

  if (!animate) {
    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{ ...baseStyle, transform: `rotate(${rotate}deg)` }}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={baseStyle}
      initial={{ scale: 0.85, opacity: 0, rotate }}
      animate={{
        scale: 1,
        opacity,
        rotate: [rotate, rotate + 6, rotate - 6, rotate],
        y: [0, -5, 0, 5, 0]
      }}
      transition={{
        scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.5 },
        rotate: { repeat: Infinity, duration: 14, ease: 'easeInOut' },
        y: { repeat: Infinity, duration: 7, ease: 'easeInOut' }
      }}
      aria-hidden="true"
    />
  );
};

export default GeometricShape;
