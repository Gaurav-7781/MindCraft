import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen p-8 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <header className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-cyan mb-4">
          Global Leaderboard
        </h1>
        <p className="text-cyber-light/80 text-lg max-w-2xl mx-auto">
          See how you stack up against other IP learners around the world!
        </p>
        <div className="mt-6">
           <Link to="/dashboard" className="text-cyber-blue hover:underline text-sm font-semibold">&larr; Back to Dashboard</Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full relative z-10">
        {loading ? (
          <div className="text-center text-cyber-light">Loading top players...</div>
        ) : (
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-cyber-dark/80 border-b border-white/10 text-cyber-light/60 font-bold text-sm">
              <div className="col-span-2 text-center">RANK</div>
              <div className="col-span-6">INNOVATOR</div>
              <div className="col-span-2 text-center">LEVEL</div>
              <div className="col-span-2 text-right">XP</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {users.map((user, index) => {
                const rank = index + 1;
                let RankIcon = null;
                let rankColor = "text-cyber-light/50";
                
                if (rank === 1) { RankIcon = Trophy; rankColor = "text-yellow-400"; }
                else if (rank === 2) { RankIcon = Medal; rankColor = "text-gray-300"; }
                else if (rank === 3) { RankIcon = Award; rankColor = "text-amber-600"; }

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={user.id}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors"
                  >
                    <div className={`col-span-2 text-center font-bold text-lg flex justify-center items-center gap-2 ${rankColor}`}>
                      {RankIcon ? <RankIcon className="w-5 h-5" /> : `#${rank}`}
                    </div>
                    <div className="col-span-6 font-semibold text-white truncate">
                      {user.name}
                    </div>
                    <div className="col-span-2 text-center text-cyber-cyan font-bold">
                      {user.level || 1}
                    </div>
                    <div className="col-span-2 text-right text-cyber-purple font-mono">
                      {user.xp || 0}
                    </div>
                  </motion.div>
                );
              })}
              
              {users.length === 0 && (
                <div className="p-8 text-center text-cyber-light/50">
                  No players found on the leaderboard yet.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
