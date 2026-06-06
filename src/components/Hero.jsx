import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="pt-20 pb-12 text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Turn Simple Ideas Into <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Powerful AI Prompts
          </span>
        </h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          Don't know how to structure your prompt? Just type a short idea like "build a weather app" and our AI will generate a highly detailed, professional software development prompt ready for any AI coding assistant.
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;
