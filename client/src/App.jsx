import React from 'react';
import LandingSection from './components/sections/LandingSection';

export function App() {
  return (
    <div className="w-full h-full min-h-screen bg-[var(--color-background)] text-[var(--color-text)] overflow-hidden font-sans selection:bg-[#5B95F9] selection:text-white">
      <main>
        <LandingSection />
      </main>
    </div>
  );
}

export default App;
