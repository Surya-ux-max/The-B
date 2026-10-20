import React from 'react';
import GravityShapesCanvas from '../interactive/GravityShapesCanvas';
import BulletTrainTypography from './BulletTrainTypography';

/**
 * LandingSection
 * Clean, high-impact Google Labs experimental landing section:
 * - Removed top header/navbar
 * - Removed paragraph body copy & card grid
 * - Massive typography: "Tarunika B - Full stack Developer"
 * - High-speed bullet train kinetic text effect looping every 5 seconds
 * - Interactive movable floating shapes with real gravity & drag physics
 */
export const LandingSection = () => {
  return (
    <section className="relative w-screen h-screen min-h-[600px] overflow-hidden bg-[var(--color-background)] flex items-center justify-center">
      {/* Interactive Movable Floating Shapes with Physics Gravity & Collisions */}
      <GravityShapesCanvas />

      {/* Massive Bullet Train Looping Typography */}
      <BulletTrainTypography />

      {/* Subtle Corner Google Dots Accent */}
      <div className="absolute bottom-6 left-8 z-20 flex items-center gap-1.5 pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-[#5B95F9]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFCE35]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F6B4F0]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
        <span className="text-[11px] font-mono text-[var(--color-muted)] ml-2">
          Tarunika B · Google Labs Theme
        </span>
      </div>

      <div className="absolute bottom-6 right-8 z-20 pointer-events-none font-mono text-[11px] text-[var(--color-muted)] hidden sm:block">
        Gravity: 0.38G · Restitution: 0.72
      </div>
    </section>
  );
};

export default LandingSection;
