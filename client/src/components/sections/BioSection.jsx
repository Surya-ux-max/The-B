import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDownRight, Terminal } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { SectionHeader } from '../common/SectionHeader';
import { GeometricShape } from '../common/GeometricShape';
import { BioMetricsStrip } from './bio/BioMetricsStrip';
import { BioDisciplineCard } from './bio/BioDisciplineCard';
import { BioPrinciples } from './bio/BioPrinciples';

/**
 * BioSection
 * Interactive Labs Bento & Spec Sheet showcasing:
 * - Editorial Statement & Live Availability Indicator
 * - Research Instrumentation Telemetry Metrics
 * - 3 Core Engineering Disciplines
 * - Interactive Guiding Engineering Principles
 */
export const BioSection = () => {
  const { personal, bio } = portfolioData;

  return (
    <section id="bio" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#F3EFEA] overflow-hidden">
      {/* Decorative Google Geometric Shapes in background */}
      <div className="absolute top-12 -left-10 opacity-30 pointer-events-none">
        <GeometricShape type="square" color="#34A853" size={140} rotate={15} />
      </div>
      <div className="absolute top-1/3 -right-12 opacity-25 pointer-events-none">
        <GeometricShape type="circle" color="#FFCE35" size={170} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8 sm:space-y-10">

        {/* ── Section Header ── */}
        <SectionHeader
          badge={bio?.badge || "About the Engineer"}
          badgeColor="#5B95F9"
          title="Engineering at the intersection of scale, physics, and interface."
          highlightWord="scale"
          highlightColor="#34A853"
          description={bio?.statement || personal.heroSubheadline}
        />

        {/* ── Editorial Narrative & Status Card (Bento Master) ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5 }}
          className="labs-surface p-6 sm:p-8 lg:p-10 relative overflow-hidden"
        >
          {/* Subtle Google 4-color accent bar at top */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <span className="flex-1 bg-[#5B95F9]" />
            <span className="flex-1 bg-[#FFCE35]" />
            <span className="flex-1 bg-[#F6B4F0]" />
            <span className="flex-1 bg-[#34A853]" />
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              {/* Availability Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DED2]/50 border border-[var(--color-beige)] mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]" />
                </span>
                <span className="text-[11px] font-mono text-[var(--color-text)] font-medium">
                  {personal.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[var(--color-text)] tracking-tight leading-snug">
                {bio?.title || personal.sectionHeadline}
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Currently focusing on: <strong className="text-[var(--color-text)] font-semibold">{bio?.currentFocus || "Distributed Systems & Browser Inference"}</strong>. Combining backend performance with tactile frontend micro-interactions.
              </p>
            </div>

            {/* Quick Connect Pill Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
              <a
                href={`mailto:${personal.email}`}
                className="pill-button active justify-center text-xs px-5 py-2.5 shadow-xs"
              >
                <span>Initiate Contact</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="pill-button justify-center text-xs px-5 py-2.5"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--color-blue)]" />
                <span>Inspect GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Telemetry & Metrics Strip ── */}
        <BioMetricsStrip stats={personal.stats} />

        {/* ── Engineering Disciplines Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {bio?.disciplines?.map((discipline, idx) => (
            <BioDisciplineCard
              key={discipline.id}
              discipline={discipline}
              index={idx}
            />
          ))}
        </div>

        {/* ── Guiding Principles Spec ── */}
        <BioPrinciples principles={bio?.principles} />

      </div>
    </section>
  );
};

export default BioSection;

