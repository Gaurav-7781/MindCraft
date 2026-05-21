import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Users, FileText, Layout, Award } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Unauthorized access. Admin privileges required.');
      } else {
        setError('Failed to load admin data.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-cyber-light">Loading Admin Panel...</div>;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl text-red-500 font-bold mb-4">Access Denied</h1>
        <p className="text-cyber-light mb-8">{error}</p>
        <Link to="/dashboard" className="px-6 py-2 bg-cyber-dark border border-cyber-light/20 rounded hover:bg-white/10">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 relative flex flex-col">
      <header className="mb-12 border-b border-white/10 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Control Panel</h1>
          <p className="text-cyber-light/70">Manage MindCraft platform data and view statistics.</p>
        </div>
        <Link to="/dashboard" className="text-cyber-cyan hover:underline text-sm">Return to Main App</Link>
      </header>

      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-6 rounded-2xl border-l-4 border-blue-500 flex flex-col items-center">
          <Users className="w-10 h-10 text-blue-500 mb-4" />
          <h3 className="text-lg text-cyber-light font-semibold">Total Users</h3>
          <p className="text-4xl font-bold text-white">{stats?.users_count || 0}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-6 rounded-2xl border-l-4 border-green-500 flex flex-col items-center">
          <FileText className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="text-lg text-cyber-light font-semibold">Quizzes</h3>
          <p className="text-4xl font-bold text-white">{stats?.quizzes_count || 0}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-6 rounded-2xl border-l-4 border-purple-500 flex flex-col items-center">
          <Layout className="w-10 h-10 text-purple-500 mb-4" />
          <h3 className="text-lg text-cyber-light font-semibold">Scenarios</h3>
          <p className="text-4xl font-bold text-white">{stats?.scenarios_count || 0}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="glass-panel p-6 rounded-2xl border-l-4 border-yellow-500 flex flex-col items-center">
          <Award className="w-10 h-10 text-yellow-500 mb-4" />
          <h3 className="text-lg text-cyber-light font-semibold">Achievements</h3>
          <p className="text-4xl font-bold text-white">{stats?.achievements_count || 0}</p>
        </motion.div>
        
        <div className="col-span-full mt-12 glass-panel p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-cyber-dark/50 border border-white/10 rounded-lg text-cyber-light hover:bg-white/5 disabled:opacity-50" disabled>
              Manage Users (Coming Soon)
            </button>
            <button className="px-6 py-3 bg-cyber-dark/50 border border-white/10 rounded-lg text-cyber-light hover:bg-white/5 disabled:opacity-50" disabled>
              Add New Quiz (Coming Soon)
            </button>
            <button className="px-6 py-3 bg-cyber-dark/50 border border-white/10 rounded-lg text-cyber-light hover:bg-white/5 disabled:opacity-50" disabled>
              Export Stats (Coming Soon)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
