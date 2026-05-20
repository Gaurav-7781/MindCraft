import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, Star, Shield, Lock } from 'lucide-react';
import MindyMascot from '../components/MindyMascot';
import { Link } from 'react-router-dom';

const modules = [
  {
    id: 'copyright',
    title: 'Copyrights',
    icon: <BookOpen className="w-8 h-8 text-cyber-blue" />,
    description: 'Protect your original creative works like books, music, and art.',
    content: [
      {
        term: 'What is it?',
        definition: 'A legal right that grants the creator of an original work exclusive rights to its use and distribution.'
      },
      {
        term: 'Duration',
        definition: 'Usually the life of the author plus 70 years.'
      },
      {
        term: 'Examples',
        definition: 'Novels, paintings, movies, software code, and songs.'
      }
    ]
  },
  {
    id: 'trademark',
    title: 'Trademarks',
    icon: <Star className="w-8 h-8 text-cyber-purple" />,
    description: 'Protect your brand identity: logos, names, and slogans.',
    content: [
      {
        term: 'What is it?',
        definition: 'A recognizable sign, design, or expression which identifies products or services of a particular source.'
      },
      {
        term: 'Duration',
        definition: 'Can last forever as long as it is being used in commerce and defended against infringement.'
      },
      {
        term: 'Examples',
        definition: 'The Nike swoosh, Apple logo, "Just Do It" slogan.'
      }
    ]
  },
  {
    id: 'patent',
    title: 'Patents',
    icon: <Shield className="w-8 h-8 text-cyber-cyan" />,
    description: 'Protect your inventions and new technical solutions.',
    content: [
      {
        term: 'What is it?',
        definition: 'An exclusive right granted for an invention, which is a product or a process that provides a new way of doing something.'
      },
      {
        term: 'Duration',
        definition: 'Generally 20 years from the filing date.'
      },
      {
        term: 'Examples',
        definition: 'A new type of solar panel, a pharmaceutical drug formula, a unique mechanical gear.'
      }
    ]
  },
  {
    id: 'trade-secret',
    title: 'Trade Secrets',
    icon: <Lock className="w-8 h-8 text-cyber-pink" />,
    description: 'Protect valuable confidential business information.',
    content: [
      {
        term: 'What is it?',
        definition: 'Intellectual property rights on confidential information which may be sold or licensed.'
      },
      {
        term: 'Duration',
        definition: 'As long as the secret is maintained.'
      },
      {
        term: 'Examples',
        definition: 'The Coca-Cola recipe, Google search algorithm, customer lists.'
      }
    ]
  }
];

export default function LearningModules() {
  const [activeModule, setActiveModule] = useState(null);
  const [mindyMessage, setMindyMessage] = useState("Select a module to start learning! I recommend starting with Copyrights.");

  const handleModuleClick = (mod) => {
    if (activeModule === mod.id) {
      setActiveModule(null);
      setMindyMessage("Great! What do you want to explore next?");
    } else {
      setActiveModule(mod.id);
      setMindyMessage(`Excellent choice! Let's dive into ${mod.title}. Click the flip cards to reveal the details.`);
    }
  };

  return (
    <div className="min-h-screen p-8 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-1/4 w-1/3 h-1/3 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <header className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-4">
          IPR Learning Center
        </h1>
        <p className="text-cyber-light/80 text-lg max-w-2xl mx-auto">
          Master the fundamentals of Intellectual Property Rights. Learn how to protect your creativity and inventions.
        </p>
        <div className="mt-6">
           <Link to="/dashboard" className="text-cyber-cyan hover:underline text-sm font-semibold">&larr; Back to Dashboard</Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full relative z-10 grid gap-6 md:grid-cols-2">
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            layout
            className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${activeModule === mod.id ? 'border-cyber-purple shadow-[0_0_20px_rgba(157,78,221,0.3)]' : 'hover:border-white/20'}`}
          >
            <div 
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => handleModuleClick(mod)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyber-dark/80 rounded-xl border border-white/5">
                  {mod.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white m-0">{mod.title}</h2>
                  <p className="text-sm text-cyber-light/60 mt-1">{mod.description}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: activeModule === mod.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-cyber-light/50" />
              </motion.div>
            </div>

            <AnimatePresence>
              {activeModule === mod.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 overflow-hidden"
                >
                  <div className="grid gap-4 mt-4 grid-cols-1 sm:grid-cols-3">
                    {mod.content.map((item, idx) => (
                      <FlipCard key={idx} term={item.term} definition={item.definition} />
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/quizzes" className="inline-block px-6 py-2 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-full font-bold shadow-[0_0_15px_rgba(58,134,255,0.4)] hover:opacity-90 transition-opacity">
                      Take {mod.title} Quiz
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </main>

      <MindyMascot message={mindyMessage} hint="Pay attention to the examples, they often appear in quizzes!" />
    </div>
  );
}

function FlipCard({ term, definition }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-32 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-cyber-darker border border-white/10 rounded-xl flex items-center justify-center p-4 group-hover:border-cyber-cyan/50 transition-colors">
          <h3 className="font-bold text-cyber-cyan text-center">{term}</h3>
          <div className="absolute bottom-2 right-2 text-xs text-cyber-light/30">Click to flip</div>
        </div>
        
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-cyber-purple/20 to-cyber-blue/20 border border-cyber-purple/50 rounded-xl flex items-center justify-center p-4 text-sm text-center">
          <p>{definition}</p>
        </div>
      </motion.div>
    </div>
  );
}
