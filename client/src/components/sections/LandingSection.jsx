import React from 'react';
import GravityShapesCanvas from '../interactive/GravityShapesCanvas';
import BulletTrainTypography from './BulletTrainTypography';

/**
 * LandingSection
 * Restored clean landing page styles:
 * - Pure warm ivory canvas (#F3EFEA) without the oval gradient mix
 * - Oversized typography: "Tarunika B - Full stack Developer"
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
    </section>
  );
};

export default LandingSection;
