import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Award, BookOpen, Star, Shield, Lock, Medal } from 'lucide-react';

const iconMap = {
  BookOpen: BookOpen,
  Star: Star,
  Shield: Shield,
  Lock: Lock,
  Award: Award,
  Medal: Medal
};

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/achievements`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAchievements(response.data);
      } catch (err) {
        console.error('Failed to fetch achievements', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="min-h-screen p-8 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-1/4 w-1/3 h-1/3 bg-cyber-pink/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <header className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-pink to-cyber-purple mb-4">
          Your Achievements
        </h1>
        <p className="text-cyber-light/80 text-lg max-w-2xl mx-auto">
          Track your progress and unlock badges as you master Intellectual Property Rights.
        </p>
        <div className="mt-6">
           <Link to="/dashboard" className="text-cyber-pink hover:underline text-sm font-semibold">&larr; Back to Dashboard</Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full relative z-10">
        {loading ? (
          <div className="text-center text-cyber-light">Loading achievements...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((ach) => {
              const Icon = iconMap[ach.icon_url] || Award;
              const isUnlocked = ach.unlocked;

              return (
                <motion.div
                  key={ach.id}
                  whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
                  className={`glass-panel p-6 rounded-2xl flex flex-col items-center text-center transition-all duration-300 ${isUnlocked ? 'border-cyber-pink/50 shadow-[0_0_15px_rgba(255,0,128,0.2)]' : 'opacity-50 grayscale'}`}
                >
                  <div className={`p-4 rounded-full mb-4 ${isUnlocked ? 'bg-cyber-pink/20 text-cyber-pink' : 'bg-gray-800 text-gray-500'}`}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>{ach.name}</h3>
                  <p className="text-sm text-cyber-light/70">{ach.description}</p>
                  
                  {!isUnlocked && (
                    <div className="mt-4 px-3 py-1 bg-cyber-dark rounded-full text-xs text-cyber-light/50 border border-white/5">
                      Locked
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
