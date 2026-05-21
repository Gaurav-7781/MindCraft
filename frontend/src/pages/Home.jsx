import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Gamepad2, Award, Zap } from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full object-cover scale-125 md:scale-150 pointer-events-none select-none bg-watermark -z-10" 
           style={{ backgroundImage: 'url(/logo.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '40%' }}>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyber-purple/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyber-cyan/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <main className="flex-1 flex flex-col w-full max-w-6xl mx-auto px-6 pt-32 pb-16 z-10">
        
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-32 mt-12"
        >
          <motion.img 
            variants={itemVariants}
            src="/logo.png" 
            alt="MindCraft Logo" 
            className="w-32 h-32 mb-8 drop-glow-cyan" 
          />
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-purple leading-tight"
          >
            Master Intellectual <br /> Property Rights
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl mb-10 text-cyber-light/80 max-w-2xl"
          >
            MindCraft transforms complex legal concepts into an interactive, gamified learning experience. Protect your ideas and build the future.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            <Link to="/register" className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-cyan text-cyber-darker text-lg font-bold shadow-btn-glow hover:scale-105 transition-transform">
              Start Learning Now
            </Link>
            <Link to="/login" className="px-10 py-4 rounded-xl bg-cyber-dark/80 border border-cyber-cyan/30 text-white text-lg font-bold hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-colors backdrop-blur-sm">
              Account Login
            </Link>
          </motion.div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 relative"
        >
          <div className="glass-panel p-10 md:p-16 rounded-3xl border-l-4 border-cyber-purple relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-purple/20 blur-[80px] -z-10"></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About MindCraft</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-lg text-cyber-light/90 leading-relaxed">
                <p className="mb-4">
                  In today's digital age, your ideas are your most valuable currency. But navigating the world of Patents, Trademarks, Copyrights, and Trade Secrets can feel like decoding an ancient language.
                </p>
                <p>
                  <strong>MindCraft</strong> was built to bridge that gap. We believe that legal education doesn't have to be boring. By combining scenario-based learning with competitive mini-games and an achievement system, we empower innovators, creators, and entrepreneurs to understand and protect their intellectual property with confidence.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-48 h-48 rounded-full border-4 border-cyber-cyan/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                  <div className="absolute inset-2 rounded-full border border-cyber-purple/50 animate-[spin_10s_linear_infinite]"></div>
                  <Zap className="w-20 h-20 text-cyber-cyan drop-glow-cyan" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FEATURES SECTION */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Platform Features</h2>
            <p className="text-cyber-light/70 text-lg">Everything you need to master IP law.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border-t-4 border-cyber-blue flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyber-blue/20 flex items-center justify-center mb-6 border border-cyber-blue/30">
                <BookOpen className="w-8 h-8 text-cyber-blue" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Modules</h3>
              <p className="text-cyber-light/80">
                Dive into rich, scenario-based learning modules covering every aspect of Intellectual Property.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border-t-4 border-cyber-pink flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-cyber-pink/20 flex items-center justify-center mb-6 border border-cyber-pink/30">
                <Gamepad2 className="w-8 h-8 text-cyber-pink" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">IP Arcade</h3>
              <p className="text-cyber-light/80">
                Test your reflexes and knowledge in fast-paced mini-games like Trademark Matcher and IP Catcher.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl border-t-4 border-yellow-400 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-400/20 flex items-center justify-center mb-6 border border-yellow-400/30">
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global Leaderboards</h3>
              <p className="text-cyber-light/80">
                Earn XP, unlock achievements, level up, and compete with innovators around the world.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 bg-cyber-darker/80 backdrop-blur-lg py-8 z-10 relative">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-cyber-light/60 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/logo.png" alt="MindCraft" className="w-6 h-6 grayscale opacity-50" />
            <span>&copy; {new Date().getFullYear()} MindCraft Educational Platform. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-cyber-cyan transition-colors cursor-pointer">About Us</span>
            <span className="hover:text-cyber-cyan transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cyber-cyan transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
