import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, MailIcon } from '../common/SocialIcons';
import { GeometricShape } from '../common/GeometricShape';
import { portfolioData } from '../../data/portfolioData';

export const Footer = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[var(--color-background)] border-t border-[var(--color-beige)] pt-16 pb-12 px-6 sm:px-8 lg:px-12 overflow-hidden">
      {/* Decorative Google Geometric Shapes */}
      <div className="absolute -top-10 -left-10 opacity-30 pointer-events-none">
        <GeometricShape type="circle" color="#5B95F9" size={130} />
      </div>
      <div className="absolute top-1/2 -right-12 opacity-25 pointer-events-none">
        <GeometricShape type="blob" color="#FFCE35" size={160} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top: Massive Editorial Wordmark */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[var(--color-beige)]">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B95F9]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFCE35]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F6B4F0]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] ml-2">
                Full Stack Developer · Google Labs Inspired Theme
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-text)] leading-none">
              TARUNIKA B
            </h2>
            <p className="mt-3 text-sm text-[var(--color-muted)] max-w-md">
              Full Stack Developer building ideas into reliable systems, reactive applications, and experimental tools.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start md:self-end flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[var(--color-beige)] text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-blue)] hover:text-[var(--color-blue)] transition-all shadow-xs cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Secondary Links & Connect */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 text-xs text-[var(--color-muted)]">
          <div>
            <h4 className="font-semibold text-[var(--color-text)] uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#experiments" className="hover:text-[var(--color-blue)] transition-colors">Experiments &amp; Work</a></li>
              <li><a href="#stack" className="hover:text-[var(--color-blue)] transition-colors">Full Stack Architecture</a></li>
              <li><a href="#about" className="hover:text-[var(--color-blue)] transition-colors">About &amp; Principles</a></li>
              <li><a href="#contact" className="hover:text-[var(--color-blue)] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-text)] uppercase tracking-wider mb-3">
              Channels
            </h4>
            <div className="flex flex-col space-y-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-text)] transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub (@tarunika-b)</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-text)] transition-colors flex items-center gap-2"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn (/in/tarunika-b)</span>
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="hover:text-[var(--color-text)] transition-colors flex items-center gap-2"
              >
                <MailIcon className="w-3.5 h-3.5" />
                <span>{personal.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-text)] uppercase tracking-wider mb-3">
              Theme Tokens
            </h4>
            <p className="leading-relaxed">
              Theme applied across the entire site: Warm Ivory (<code className="text-[10px] font-mono">#F3EFEA</code>), Near Black (<code className="text-[10px] font-mono">#111318</code>), Blue (<code className="text-[10px] font-mono">#5B95F9</code>), Yellow (<code className="text-[10px] font-mono">#FFCE35</code>), Pink (<code className="text-[10px] font-mono">#F6B4F0</code>), and Green (<code className="text-[10px] font-mono">#34A853</code>).
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[var(--color-beige)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
          <p>
            &copy; {new Date().getFullYear()} Tarunika B. All rights reserved.
          </p>
          <p className="font-mono text-[11px]">
            Designed with Google Labs Design System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
