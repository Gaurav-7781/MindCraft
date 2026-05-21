import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setIsAdmin(!!user.is_admin);
      } catch (e) {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth); // For multi-tab support

    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('authChange'));
      navigate('/');
    }
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`px-3 py-2 rounded-lg transition-all duration-300 font-semibold ${
          isActive 
            ? 'text-cyber-cyan bg-cyber-cyan/10' 
            : 'text-cyber-light/80 hover:text-white hover:bg-white/5'
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-40 bg-cyber-darker/80 backdrop-blur-lg border-b border-white/10 px-6 flex items-center justify-between">
      <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 hover:scale-105 transition-transform">
        <img src="/logo.png" alt="MindCraft" className="w-8 h-8 drop-glow-cyan" />
        <span className="text-2xl font-bold font-heading text-white text-glow tracking-wide hidden md:block">MindCraft</span>
      </Link>

      <div className="flex-1 flex justify-center max-w-3xl mx-4 overflow-x-auto hide-scrollbar">
        {isAuthenticated && (
          <div className="flex gap-2 items-center whitespace-nowrap">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/learning">Modules</NavLink>
            <NavLink to="/scenarios">Scenarios</NavLink>
            <NavLink to="/game">Arcade</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/achievements">Badges</NavLink>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isAuthenticated ? (
          <>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-colors text-sm font-bold shadow-btn-glow hidden sm:block"
              >
                Admin
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-cyber-pink/20 text-cyber-pink border border-cyber-pink/30 hover:bg-cyber-pink hover:text-white transition-colors text-sm font-bold shadow-btn-glow"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-cyber-light hover:text-white transition-colors font-semibold mr-2">Login</Link>
            <Link to="/register" className="px-5 py-2 rounded-lg bg-cyber-purple text-white font-bold hover:bg-cyber-purple/80 transition-colors shadow-btn-glow hidden sm:block">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
