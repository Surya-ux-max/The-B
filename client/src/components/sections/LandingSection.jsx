import React from 'react';
import GravityShapesCanvas from '../interactive/GravityShapesCanvas';
import BulletTrainTypography from './BulletTrainTypography';

/**
 * LandingSection
 * Features:
 * - Stunning multi-color oval background layout centered on the white/ivory canvas
 * - Massive typography: "Tarunika B - Full stack Developer"
 * - High-speed bullet train kinetic text streak looping every 5 seconds
 * - Interactive movable Bat, Balls, and Geometric shapes with real gravity, collisions, and dispersion
 * - Distraction-free: zero metadata text or unnecessary labels
 */
export const LandingSection = () => {
  return (
    <section className="relative w-screen h-screen min-h-[600px] overflow-hidden bg-[#F3EFEA] flex items-center justify-center">
      {/* Multi-Colored Oval Background Layout with White Center Surface */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Outer Multi-Color Glowing Gradient Halo */}
        <div
          className="w-[92vw] max-w-[1200px] h-[72vh] max-h-[640px] rounded-[50%] blur-[90px] opacity-45"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, #2979FF 0%, transparent 55%),
              radial-gradient(ellipse at 80% 30%, #FFD600 0%, transparent 55%),
              radial-gradient(ellipse at 35% 75%, #FF1776 0%, transparent 55%),
              radial-gradient(ellipse at 75% 75%, #00E676 0%, transparent 55%),
              radial-gradient(ellipse at 50% 50%, #7C4DFF 0%, transparent 60%)
            `
          }}
          aria-hidden="true"
        />

        {/* Clean Pure White Oval Stage on Top */}
        <div
          className="w-[86vw] max-w-[1080px] h-[64vh] max-h-[540px] rounded-[50%] bg-white/85 backdrop-blur-md border border-[#E8DED2]/80 shadow-[0_20px_60px_-20px_rgba(17,19,24,0.06)] flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Subtle Inner Accent Border Rim */}
          <div className="w-[96%] h-[92%] rounded-[50%] border border-[#E8DED2]/40" />
        </div>
      </div>

      {/* Interactive Movable Bat, Balls, and Shapes Canvas */}
      <GravityShapesCanvas />

      {/* Massive Bullet Train Looping Typography */}
      <BulletTrainTypography />
    </section>
  );
};

export default LandingSection;
