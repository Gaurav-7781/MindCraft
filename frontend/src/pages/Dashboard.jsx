import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));

    // Refresh user data to get latest XP and Level
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (err) {
        console.error('Failed to fetch latest user data', err);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <img src="/logo.png" alt="" className="absolute inset-0 w-full h-full object-cover scale-125 md:scale-150 pointer-events-none select-none bg-watermark -z-10" />

      <header className="glass-panel rounded-2xl p-6 flex justify-between items-center mb-8 relative z-10 mt-12">
        <div>
          <h1 className="text-3xl font-bold text-glow text-cyber-cyan m-0">MindCraft Dashboard</h1>
          <p className="text-cyber-light/60 m-0">Welcome back, Innovator {user.name}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <div className="text-sm text-cyber-light/80">Level {user.level || 1}</div>
            <div className="text-xl font-bold text-cyber-purple">{user.xp || 0} XP</div>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyber-purple">Active Missions</h2>
          <div className="bg-cyber-dark/50 border border-white/5 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-cyber-light/60 mb-4">
              Learn about Copyrights, Trademarks, and Patents.
            </p>
            <button 
              onClick={() => navigate('/learning')}
              className="px-6 py-2 bg-gradient-to-r from-cyber-purple to-cyber-cyan text-cyber-darker font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Learning
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyber-cyan">Knowledge Check</h2>
          <div className="bg-cyber-dark/50 border border-white/5 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-cyber-light/60 mb-4">
              Take quizzes to test your knowledge and earn XP!
            </p>
            <button 
              onClick={() => navigate('/quizzes')}
              className="px-6 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-cyber-darker font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              View Quizzes
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyber-blue">Mini-Games</h2>
          <div className="bg-cyber-dark/50 border border-white/5 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-cyber-light/60 mb-4">
              Test your reflexes and earn XP!
            </p>
            <button 
              onClick={() => navigate('/game')}
              className="px-6 py-2 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darker font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Play IP Catcher
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-cyber-pink">Achievements</h2>
          <div className="bg-cyber-dark/50 border border-white/5 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-cyber-light/60 mb-4">
              View your badges and track your progress!
            </p>
            <button 
              onClick={() => navigate('/achievements')}
              className="px-6 py-2 bg-gradient-to-r from-cyber-pink to-cyber-purple text-cyber-darker font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              View Trophies
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Leaderboard</h2>
          <div className="bg-cyber-dark/50 border border-white/5 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-cyber-light/60 mb-4">
              See where you stand globally!
            </p>
            <button 
              onClick={() => navigate('/leaderboard')}
              className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-amber-600 text-cyber-darker font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Check Rankings
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col md:col-span-2 lg:col-span-3 xl:col-span-1"
        >
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">IP Scenarios</h2>
          <div className="bg-cyber-dark/50 border border-white/5 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-cyber-light/60 mb-4">
              Navigate real-world IP disputes and make critical decisions!
            </p>
            <button 
              onClick={() => navigate('/scenarios')}
              className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-cyber-darker font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Play Scenarios
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
