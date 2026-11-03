import React from 'react';
import { ArrowDown } from 'lucide-react';
import GravityShapesCanvas from '../interactive/GravityShapesCanvas';
import BulletTrainTypography from './BulletTrainTypography';

/**
 * LandingSection
 * Restored clean landing page styles:
 * - Pure warm ivory canvas (#F3EFEA) without the oval gradient mix
 * - Oversized typography: "Zera Shahadiya S - Full Stack Developer"
 * - 5-second bullet train kinetic text loop
 * - Interactive Google Labs geometric shapes with gravity & collision dispersion
 */
export const LandingSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[100dvh] max-w-full overflow-hidden bg-[#F3EFEA] flex items-center justify-center">
      {/* Interactive Movable Google Shapes Canvas with Gravity & Collision Dispersion */}
      <GravityShapesCanvas />

      {/* Massive Bullet Train Looping Typography */}
      <BulletTrainTypography />

      {/* Subtle Scroll Down Prompt to Bio */}
      <a
        href="#bio"
        className="absolute bottom-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-xs border border-[var(--color-beige)] text-[11px] font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] transition-all shadow-xs cursor-pointer select-none"
        aria-label="Scroll to Bio section"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#5B95F9] animate-pulse" />
        <span>Explore Bio &amp; Architecture</span>
        <ArrowDown className="w-3 h-3 text-[var(--color-muted)]" />
      </a>
    </section>
  );
};

export default LandingSection;
