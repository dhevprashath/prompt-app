import React, { useState } from 'react';
import { FaWandMagicSparkles, FaTrashCan } from 'react-icons/fa6';
import { generatePrompt } from '../services/aiService';
import OutputCard from './OutputCard';

const PromptGenerator = () => {
  const [idea, setIdea] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!idea.trim()) return;
    
    setLoading(true);
    setError('');
    setOutput('');

    try {
      const generated = await generatePrompt(idea);
      setOutput(generated);
    } catch (err) {
      setError(err.message || 'Something went wrong while generating the prompt.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setIdea('');
    setOutput('');
    setError('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-20">
      <div className="glass-panel rounded-2xl p-2 border border-white/10 shadow-2xl relative overflow-hidden transition-all focus-within:border-primary/50">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="E.g., Build a modern weather app with a 5-day forecast..."
          className="w-full h-32 p-4 bg-transparent text-white placeholder-slate-500 resize-none outline-none text-lg"
          disabled={loading}
        />
        
        <div className="flex justify-between items-center p-2 border-t border-white/5 bg-slate-800/30 rounded-xl mt-2">
          <button
            onClick={handleClear}
            disabled={!idea && !output}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaTrashCan />
            Clear
          </button>
          
          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg font-medium shadow-lg shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FaWandMagicSparkles />
                Generate Prompt
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
          {error}
        </div>
      )}

      <OutputCard prompt={output} />
    </div>
  );
};

export default PromptGenerator;
