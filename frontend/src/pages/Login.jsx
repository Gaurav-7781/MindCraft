import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email, password
      });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid login details');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-purple/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <img src="/logo.png" alt="" className="absolute inset-0 w-full h-full object-cover scale-125 md:scale-150 pointer-events-none select-none bg-watermark" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 rounded-2xl w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-glow text-cyber-cyan">Access Portal</h2>
        
        {error && <div className="bg-cyber-pink/20 text-cyber-pink p-3 rounded mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-cyber-light/80">Email ID</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-cyber-dark/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
              placeholder="student@mindcraft.edu"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-cyber-light/80">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-cyber-dark/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyber-purple to-cyber-blue font-bold tracking-wider hover:opacity-90 transition-opacity shadow-btn-glow"
          >
            INITIALIZE LINK
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-cyber-light/60">
          New innovator? <Link to="/register" className="text-cyber-cyan hover:underline">Register here</Link>
        </div>
      </motion.div>
    </div>
  );
}
