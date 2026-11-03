import React from 'react';
import Navbar from './components/layout/Navbar';
import LandingSection from './components/sections/LandingSection';
import BioSection from './components/sections/BioSection';
import Footer from './components/layout/Footer';

export function App() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-text)] overflow-x-hidden font-sans selection:bg-[#5B95F9] selection:text-white">
      <Navbar />
      <main>
        <LandingSection />
        <BioSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
