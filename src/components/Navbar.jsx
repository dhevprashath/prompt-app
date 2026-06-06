import React from 'react';
import { FaTerminal } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-white/10 glass-panel sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-lg text-white">
              <FaTerminal size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">PromptGen<span className="text-primary">.AI</span></span>
          </div>
          <div className="hidden md:block">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
