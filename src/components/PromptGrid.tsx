import React, { useState, useEffect } from 'react';
import { prompts, Prompt } from '../data/prompts';
import PromptCard from './PromptCard';
import PromptModal from './PromptModal';

const PromptGrid: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [displayedPromptCount, setDisplayedPromptCount] = useState(9);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [displayedPromptCount]);

  const handleCardClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPrompt(null), 300);
  };

  const handleLoadMore = () => {
    setDisplayedPromptCount(prev => Math.min(prev + 9, prompts.length));
  };

  const displayedPrompts = prompts.slice(0, displayedPromptCount);
  const hasMorePrompts = displayedPromptCount < prompts.length;

  return (
    <section id="prompts" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Prompts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our curated collection of AI prompts designed to enhance your productivity and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPrompts.map((prompt, index) => (
            <div
              key={index}
              data-index={index}
              className={`transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <PromptCard
                prompt={prompt}
                onClick={() => handleCardClick(prompt)}
              />
            </div>
          ))}
        </div>

        {/* Load More Button - Only show if there are more prompts */}
        {hasMorePrompts && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Load More Prompts ({prompts.length - displayedPromptCount} remaining)
            </button>
          </div>
        )}
      </div>

      <PromptModal
        prompt={selectedPrompt}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default PromptGrid;