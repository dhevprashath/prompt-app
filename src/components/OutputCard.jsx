import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const OutputCard = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  if (!prompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto mt-8 relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-xl transition-opacity group-hover:opacity-30"></div>
      <div className="glass-panel rounded-xl overflow-hidden relative border border-white/10">
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-slate-800/50">
          <span className="font-semibold text-slate-200">Generated Prompt</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 px-3 py-1.5 rounded-md transition-all"
          >
            {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
        <div className="p-6 overflow-x-auto max-h-[60vh] overflow-y-auto">
          <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
            {prompt}
          </pre>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputCard;
