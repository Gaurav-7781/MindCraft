import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

export default function MindyMascot({ message, hint }) {
  const [isOpen, setIsOpen] = useState(false);

  // Automatically open when a new message is passed
  useEffect(() => {
    if (message) {
      setIsOpen(true);
    }
  }, [message]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-64 glass-panel p-4 rounded-2xl rounded-br-none border-cyber-cyan shadow-[0_0_15px_rgba(0,245,212,0.3)] text-sm text-cyber-light"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 bg-cyber-darker text-cyber-light/50 hover:text-cyber-pink border border-white/10 rounded-full p-1"
            >
              <X size={14} />
            </button>
            <div className="flex gap-2 items-start mb-2">
              <span className="text-xl">🤖</span>
              <strong className="text-cyber-cyan">Mindy says:</strong>
            </div>
            <p>{message || "Hi! I'm Mindy. Let's learn about Intellectual Property Rights!"}</p>
            {hint && (
              <div className="mt-2 text-cyber-purple text-xs border-t border-white/10 pt-2 flex items-start gap-1">
                <span className="shrink-0 pt-0.5">💡</span>
                <span>{hint}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyber-purple to-cyber-cyan p-1 shadow-[0_0_20px_rgba(157,78,221,0.6)] flex items-center justify-center relative"
      >
        <div className="absolute inset-1 bg-cyber-darker rounded-full flex items-center justify-center text-3xl">
          🤖
        </div>
        {!isOpen && message && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyber-pink"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
