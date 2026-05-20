import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check if user has a preference saved
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-cyber-dark/80 border border-white/20 text-cyber-light shadow-btn-glow hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-colors backdrop-blur-md"
      aria-label="Toggle Theme"
    >
      {isLight ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
    </motion.button>
  );
}
