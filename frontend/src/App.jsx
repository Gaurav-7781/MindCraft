import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LearningModules from './pages/LearningModules';
import GamePage from './pages/GamePage';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <img src="/logo.png" alt="" className="absolute inset-0 w-full h-full object-cover scale-125 md:scale-150 pointer-events-none select-none bg-watermark -z-10" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-12 rounded-3xl max-w-2xl text-center"
      >
        <img src="/logo.png" alt="MindCraft Logo" className="w-32 h-32 mx-auto mb-6 drop-glow-cyan" />
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">
          Welcome to MindCraft
        </h1>
        <p className="text-xl mb-8 text-cyber-light/80">
          The interactive learning platform for Intellectual Property Rights.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="px-8 py-3 rounded-full bg-cyber-purple hover:bg-cyber-purple/80 transition-colors font-semibold shadow-btn-glow">
            Start Learning
          </Link>
          <Link to="/login" className="px-8 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/10 transition-colors font-semibold">
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

import Quizzes from './pages/Quizzes';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <>
      <ThemeToggle />
      <Link to="/" className="fixed top-6 left-8 z-50 flex items-center gap-3 hover:scale-105 transition-transform">
        <img src="/logo.png" alt="MindCraft" className="w-8 h-8 drop-glow-cyan" />
        <span className="text-2xl font-bold font-heading text-white text-glow tracking-wide hidden sm:block">MindCraft</span>
      </Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<LearningModules />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
    </>
  );
}

export default App;
