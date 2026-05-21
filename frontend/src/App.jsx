import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LearningModules from './pages/LearningModules';
import GamePage from './pages/GamePage';

import Home from './pages/Home';

import Quizzes from './pages/Quizzes';
import Achievements from './pages/Achievements';
import Leaderboard from './pages/Leaderboard';
import ScenarioPlayer from './pages/ScenarioPlayer';
import AdminDashboard from './pages/AdminDashboard';
import ThemeToggle from './components/ThemeToggle';

import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<LearningModules />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/scenarios" element={<ScenarioPlayer />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
