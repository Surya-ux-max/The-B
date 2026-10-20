import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experiments', href: '#experiments' },
    { name: 'Connect', href: 'mailto:tarunika.dev@gmail.com' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 sm:px-6 lg:px-12 transition-all">
      <div
        className={`max-w-6xl mx-auto rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border border-[var(--color-beige)] shadow-sm'
            : 'bg-white/60 backdrop-blur-sm border border-transparent'
        }`}
      >
        {/* Brand identity */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Tarunika B — Full Stack Developer"
        >
          {/* 4-color Google Labs inspired dot cluster */}
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B95F9] group-hover:scale-125 transition-transform" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFCE35] group-hover:scale-125 transition-transform delay-75" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F6B4F0] group-hover:scale-125 transition-transform delay-100" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] group-hover:scale-125 transition-transform delay-150" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-base text-[var(--color-text)] tracking-tight">
              Tarunika B
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-medium uppercase px-2 py-0.5 rounded-full bg-[#E8DED2]/50 text-[var(--color-muted)]">
              Full Stack Dev
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-black/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Contact CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="mailto:tarunika.dev@gmail.com"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-text)] text-white text-xs font-semibold hover:bg-[var(--color-blue)] transition-colors shadow-xs"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[var(--color-text)] hover:bg-black/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-2 bg-white rounded-2xl p-4 shadow-xl border border-[var(--color-beige)]"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text)] hover:bg-neutral-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-neutral-100">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center block py-2.5 rounded-xl bg-[var(--color-text)] text-white text-xs font-semibold"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
