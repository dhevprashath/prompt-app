import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromptGenerator from './components/PromptGenerator';

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 relative selection:bg-primary/30">
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <PromptGenerator />
      </main>
    </div>
  );
}

export default App;
