import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MindyMascot from '../components/MindyMascot';

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      setLoading(false);
    }
  };

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
  };

  const handleSelectAnswer = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitQuiz();
    }
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes/${activeQuiz.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ answers })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-cyber-cyan">Loading Quizzes...</div>;
  }

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-purple/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">
            IP Master Quizzes
          </h1>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 rounded-full border border-cyber-cyan/50 text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <MindyMascot message={activeQuiz ? "Read carefully! You can do this." : "Select a quiz to test your knowledge and earn XP!"} />

        {!activeQuiz ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {quizzes.map((quiz, i) => (
              <motion.div 
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyber-purple/50 transition-colors cursor-pointer group"
                onClick={() => handleStartQuiz(quiz)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white group-hover:text-cyber-purple transition-colors">{quiz.title}</h2>
                  <span className="px-3 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded-full text-sm font-semibold border border-cyber-cyan/30">
                    {quiz.reward_xp} XP
                  </span>
                </div>
                <p className="text-cyber-light/70">{quiz.description}</p>
                <div className="mt-4 flex justify-between items-center text-sm text-cyber-light/50">
                  <span>{quiz.questions.length} Questions</span>
                  <span className="text-cyber-cyan font-semibold group-hover:underline">Start Mission &rarr;</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            {!result ? (
              <motion.div 
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-panel p-8 rounded-3xl border border-white/10"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-cyber-cyan font-semibold">Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                  <div className="w-1/2 bg-black/50 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className="bg-gradient-to-r from-cyber-cyan to-cyber-purple h-full transition-all duration-300" 
                      style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-8">{activeQuiz.questions[currentQuestionIndex].question_text}</h2>
                
                <div className="space-y-4">
                  {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                    const isSelected = answers[activeQuiz.questions[currentQuestionIndex].id] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(activeQuiz.questions[currentQuestionIndex].id, option)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          isSelected 
                            ? 'border-cyber-purple bg-cyber-purple/20 text-white shadow-[0_0_15px_rgba(157,78,221,0.3)]' 
                            : 'border-white/10 text-cyber-light hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!answers[activeQuiz.questions[currentQuestionIndex].id]}
                    className="px-8 py-3 bg-cyber-purple hover:bg-cyber-purple/80 text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_15px_rgba(157,78,221,0.5)]"
                  >
                    {currentQuestionIndex === activeQuiz.questions.length - 1 ? 'Submit' : 'Next'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-12 rounded-3xl text-center border border-white/20 relative overflow-hidden"
              >
                {result.gamification?.leveled_up && (
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-cyan/20 to-cyber-purple/20 animate-pulse -z-10" />
                )}
                
                <h2 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h2>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple mb-6">
                  {Math.round(result.percentage)}%
                </div>
                <p className="text-xl text-cyber-light mb-8">You answered {result.score} out of {result.total} correctly.</p>
                
                {result.xp_earned > 0 && (
                  <div className="inline-block px-8 py-4 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-2xl mb-8">
                    <p className="text-cyber-cyan font-bold text-lg mb-1">XP Earned</p>
                    <p className="text-3xl font-black text-white">+{result.xp_earned}</p>
                    {result.gamification?.leveled_up && (
                      <p className="text-cyber-purple font-bold mt-2 animate-bounce">LEVEL UP! You are now Level {result.gamification.new_level}</p>
                    )}
                  </div>
                )}

                <div>
                  <button 
                    onClick={() => setActiveQuiz(null)}
                    className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold rounded-full transition-colors"
                  >
                    Return to Quizzes
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quizzes;
