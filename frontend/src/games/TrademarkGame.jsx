import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const TM_PAIRS = [
  { id: 1, text: 'Apple Logo', match: 'Brand Identity', icon: '🍎' },
  { id: 2, text: 'Nike Swoosh', match: 'Slogan / Logo', icon: '✔️' },
  { id: 3, text: 'McDonald\'s', match: 'Golden Arches', icon: '🍔' },
  { id: 4, text: 'Coca-Cola', match: 'Unique Font', icon: '🥤' },
  { id: 5, text: 'Intel Inside', match: 'Audio Jingle', icon: '🎵' },
  { id: 6, text: 'Tiffany', match: 'Robin Egg Blue', icon: '💎' }
];

export default function TrademarkGame({ onGameOver }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const duplicatedPairs = [...TM_PAIRS, ...TM_PAIRS].map((item, index) => ({
      ...item,
      uniqueId: index
    }));
    
    // Shuffle
    const shuffled = duplicatedPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setDisabled(false);
  };

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(cards[index].id)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves(m => m + 1);
      
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.id === secondCard.id) {
        setSolved([...solved, firstCard.id]);
        setFlipped([]);
        setDisabled(false);
        
        if (solved.length + 1 === TM_PAIRS.length) {
          // Do not automatically end game, let user see they won
          // We will render a button to submit score
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const submitScore = () => {
    const baseScore = 100;
    const penalty = Math.max(0, (moves - TM_PAIRS.length) * 5);
    onGameOver(Math.max(10, baseScore - penalty));
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="bg-cyber-dark/40 border border-cyber-purple/30 p-4 rounded-xl mb-6 w-full text-center">
        <p className="text-cyber-light">
          <strong>How to play:</strong> Flip the cards to find identical matching pairs! Each pair teaches you what specific type of trademark protection a famous brand asset has.
        </p>
      </div>

      <div className="flex justify-between items-center w-full mb-6">
        <div className="text-xl font-bold text-cyber-cyan">Moves: {moves}</div>
        <button 
          onClick={initializeGame}
          className="p-2 rounded-full bg-cyber-dark border border-cyber-light/20 hover:bg-white/10 transition-colors"
          title="Restart Game"
        >
          <RefreshCw className="w-5 h-5 text-cyber-light" />
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 w-full">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(card.id);
          
          return (
            <motion.div
              key={card.uniqueId}
              className={`aspect-square relative cursor-pointer perspective-[1000px] ${isFlipped ? 'pointer-events-none' : ''}`}
              onClick={() => handleCardClick(index)}
              whileHover={{ scale: isFlipped ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full absolute inset-0 preserve-3d"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Front (Hidden state) */}
                <div className="absolute inset-0 backface-hidden bg-cyber-dark border-2 border-cyber-purple/50 rounded-xl flex items-center justify-center shadow-[0_0_10px_rgba(157,78,221,0.2)]">
                  <span className="text-3xl opacity-20">?</span>
                </div>
                
                {/* Back (Revealed state) */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20 border-2 border-cyber-cyan rounded-xl flex flex-col items-center justify-center text-center p-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]" style={{ transform: 'rotateY(180deg)' }}>
                  <div className="text-3xl mb-1">{card.icon}</div>
                  <div className="text-sm font-bold text-white leading-tight mb-1">{card.text}</div>
                  <div className="text-[10px] uppercase tracking-wider text-cyber-cyan mt-auto">{card.match}</div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {solved.length === TM_PAIRS.length && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 glass-panel rounded-2xl border-green-400 text-center flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold text-green-400 mb-2">Trademark Master!</h2>
          <p className="text-white mb-4">You matched all the assets with their trademark protection types in {moves} moves.</p>
          <button 
            onClick={submitScore}
            className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-600 text-cyber-darker font-bold rounded-lg shadow-btn-glow hover:scale-105 transition-transform"
          >
            Submit Score
          </button>
        </motion.div>
      )}
    </div>
  );
}
