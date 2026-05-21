import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ScenarioPlayer() {
  const [scenarios, setScenarios] = useState([]);
  const [activeScenario, setActiveScenario] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/scenarios`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setScenarios(response.data);
    } catch (err) {
      console.error('Failed to fetch scenarios', err);
    } finally {
      setLoading(false);
    }
  };

  const startScenario = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/scenarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setActiveScenario(response.data);
      // Find the first node
      const firstNode = response.data.nodes.find(n => n.id === response.data.first_node_id);
      setCurrentNode(firstNode);
    } catch (err) {
      console.error('Failed to start scenario', err);
    } finally {
      setLoading(false);
    }
  };

  const selectOption = (nextNodeId) => {
    if (!nextNodeId) {
      // End of branch with no specific next node
      return;
    }
    const nextNode = activeScenario.nodes.find(n => n.id === nextNodeId);
    setCurrentNode(nextNode);
  };

  const exitScenario = () => {
    setActiveScenario(null);
    setCurrentNode(null);
  };

  if (loading && !activeScenario) {
    return <div className="min-h-screen p-8 text-center text-cyber-light">Loading Scenarios...</div>;
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="absolute top-0 right-1/4 w-1/3 h-1/3 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none"></div>

      <header className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-cyan mb-4">
          IP Scenarios
        </h1>
        <p className="text-cyber-light/80 text-lg max-w-2xl mx-auto">
          Navigate real-world intellectual property disputes. Your choices matter.
        </p>
        <div className="mt-6">
           <Link to="/dashboard" className="text-cyber-purple hover:underline text-sm font-semibold">&larr; Back to Dashboard</Link>
        </div>
      </header>

      <main className="w-full max-w-4xl relative z-10 flex-1 flex flex-col">
        {!activeScenario ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map(scen => (
              <motion.div
                key={scen.id}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-6 rounded-2xl border border-cyber-purple/30 shadow-[0_0_15px_rgba(157,78,221,0.1)] flex flex-col"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{scen.title}</h3>
                <p className="text-cyber-light/70 mb-6 flex-1">{scen.description}</p>
                <button
                  onClick={() => startScenario(scen.id)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-cyan text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Start Scenario
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full">
            <button onClick={exitScenario} className="self-start mb-6 text-cyber-light hover:text-white">&larr; Exit Scenario</button>
            
            <AnimatePresence mode="wait">
              {currentNode && (
                <motion.div
                  key={currentNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col flex-1"
                >
                  <div className="glass-panel p-8 rounded-2xl mb-8 border-l-4 border-cyber-cyan relative">
                    <span className="absolute -top-4 left-6 bg-cyber-darker border border-cyber-cyan px-4 py-1 rounded-full text-sm font-bold text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                      {currentNode.character_name || 'Narrator'}
                    </span>
                    <p className="text-xl text-white leading-relaxed mt-2">
                      {currentNode.text}
                    </p>
                  </div>

                  {!currentNode.is_end ? (
                    <div className="flex flex-col gap-4 mt-auto">
                      <p className="text-sm text-cyber-light/60 uppercase tracking-widest font-bold ml-2">Your Choices:</p>
                      {currentNode.options?.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => selectOption(opt.next_node_id)}
                          className="text-left p-4 rounded-xl glass-panel border border-white/5 hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all font-semibold text-white flex justify-between items-center group"
                        >
                          <span>{opt.text}</span>
                          <span className="text-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-auto text-center">
                      <div className="inline-block p-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 mb-6">
                        <div className="bg-cyber-darker px-8 py-3 rounded-full font-bold text-white">
                          Scenario Completed!
                        </div>
                      </div>
                      <br/>
                      <button
                        onClick={exitScenario}
                        className="px-8 py-3 bg-cyber-dark border border-cyber-light/30 rounded-xl text-white hover:bg-white/5 transition-colors"
                      >
                        Return to Scenarios
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
