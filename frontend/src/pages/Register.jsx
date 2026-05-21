import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name, email, password
      });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.dispatchEvent(new Event('authChange'));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyber-pink/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none"></div>
      <img src="/logo.png" alt="" className="absolute inset-0 w-full h-full object-cover scale-125 md:scale-150 pointer-events-none select-none bg-watermark" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-10 rounded-2xl w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-glow text-cyber-purple">Register Now</h2>
        
        {error && <div className="bg-cyber-pink/20 text-cyber-pink p-3 rounded mb-4 text-center">{error}</div>}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-cyber-light/80">Codename</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-cyber-dark/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple transition-colors"
              placeholder="e.g. CyberNinja"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-cyber-light/80">Communication Link (Email)</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-cyber-dark/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple transition-colors"
              placeholder="student@mindcraft.edu"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-cyber-light/80">Access Code (Password)</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-cyber-dark/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple transition-colors"
              placeholder="••••••••"
              required
              minLength="6"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 mt-4 rounded-lg bg-gradient-to-r from-cyber-cyan to-cyber-blue font-bold tracking-wider hover:opacity-90 transition-opacity shadow-btn-glow text-cyber-darker"
          >
            CONFIRM REGISTRATION
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-cyber-light/60">
          Already registered? <Link to="/login" className="text-cyber-purple hover:underline">Access Portal</Link>
        </div>
      </motion.div>
    </div>
  );
}
