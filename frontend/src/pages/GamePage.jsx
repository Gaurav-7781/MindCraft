import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IPRGame from '../games/IPRGame';
import TrademarkGame from '../games/TrademarkGame';
import MindyMascot from '../components/MindyMascot';

export default function GamePage() {
  const [activeGame, setActiveGame] = useState(null); // 'ip_catcher' or 'tm_matcher'
  const [lastScore, setLastScore] = useState(null);
  const [gamificationResult, setGamificationResult] = useState(null);
  const [mindyMessage, setMindyMessage] = useState("Ready for a challenge? Choose a game to test your IP knowledge!");

  const handleGameOver = async (score) => {
    setActiveGame(null);
    setLastScore(score);
    
    if (score > 50) {
      setMindyMessage(`Wow! You scored ${score} points! That's an amazing display of IP knowledge!`);
    } else {
      setMindyMessage(`You scored ${score} points. Keep practicing to protect those original ideas!`);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/games/score`, 
        { game_name: activeGame || 'unknown', score }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGamificationResult(response.data.gamification);
    } catch (err) {
      console.error('Failed to save score', err);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-darker via-cyber-darker to-cyber-dark pointer-events-none -z-10"></div>
      
      <header className="mb-8 text-center relative z-10 w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-blue m-0">
          IP Arcade
        </h1>
        <Link to="/dashboard" className="px-4 py-2 bg-cyber-dark/80 border border-white/20 rounded-lg text-cyber-light hover:bg-white/10 transition-colors">
          Back to Dashboard
        </Link>
      </header>

      <main className="w-full max-w-4xl relative z-10 flex flex-col items-center">
        {!activeGame ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl"
          >
            {lastScore !== null && (
              <div className="mb-8 p-6 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl relative overflow-hidden text-center">
                {gamificationResult?.leveled_up && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 animate-pulse -z-10" />
                )}
                <h3 className="text-2xl font-bold text-cyber-cyan mb-2">Last Score: {lastScore}</h3>
                {gamificationResult && (
                  <div>
                    <p className="text-cyber-light font-semibold">+{gamificationResult.xp_added} XP</p>
                    {gamificationResult.leveled_up && (
                      <p className="text-cyber-purple font-bold mt-2 animate-bounce">LEVEL UP! You are now Level {gamificationResult.new_level}</p>
                    )}
                  </div>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-8 rounded-3xl text-center flex flex-col border border-cyber-blue/30 hover:border-cyber-cyan transition-colors">
                <h2 className="text-3xl font-bold mb-4 text-cyber-blue">IP Catcher</h2>
                <p className="text-cyber-light/80 mb-8 flex-1">
                  Use arrow keys to move. Catch original ideas (purple) and avoid infringements (pink)!
                </p>
                <button 
                  onClick={() => { setActiveGame('ip_catcher'); setMindyMessage("Go go go! Protect that IP!"); }}
                  className="w-full py-4 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-cyber-darker text-xl font-bold rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-transform"
                >
                  Play
                </button>
              </div>

              <div className="glass-panel p-8 rounded-3xl text-center flex flex-col border border-cyber-purple/30 hover:border-cyber-pink transition-colors">
                <h2 className="text-3xl font-bold mb-4 text-cyber-purple">Trademark Matcher</h2>
                <p className="text-cyber-light/80 mb-8 flex-1">
                  Flip cards to match famous brands with their protected trademark types. Minimize your moves!
                </p>
                <button 
                  onClick={() => { setActiveGame('tm_matcher'); setMindyMessage("Match the brand to what's protected. Good luck!"); }}
                  className="w-full py-4 bg-gradient-to-r from-cyber-purple to-cyber-pink text-white text-xl font-bold rounded-xl shadow-[0_0_15px_rgba(255,0,128,0.4)] hover:scale-105 transition-transform"
                >
                  Play
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full"
          >
            {activeGame === 'ip_catcher' && <IPRGame onGameOver={handleGameOver} />}
            {activeGame === 'tm_matcher' && <TrademarkGame onGameOver={handleGameOver} />}
          </motion.div>
        )}
      </main>

      <MindyMascot message={mindyMessage} />
    </div>
  );
}
