import React from 'react';
import { Prompt } from '../data/prompts';
import { Star, Code, Zap } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
  onClick: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick }) => {
  const getIcon = () => {
    if (prompt.title.toLowerCase().includes('developer') || prompt.title.toLowerCase().includes('javascript')) {
      return <Code className="w-6 h-6" />;
    }
    if (prompt.title.toLowerCase().includes('terminal') || prompt.title.toLowerCase().includes('linux')) {
      return <Zap className="w-6 h-6" />;
    }
    return <Star className="w-6 h-6" />;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 cursor-pointer p-6 border border-gray-100 hover:border-blue-200 group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${prompt.title} prompt`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 transition-colors duration-300">
            {getIcon()}
          </div>
          {prompt.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Featured
            </span>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {prompt.title}
      </h3>
      
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
        {prompt.description.length > 150 
          ? `${prompt.description.substring(0, 150)}...` 
          : prompt.description
        }
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
          Click to expand
        </span>
        <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center">
          <div className="w-2 h-2 bg-gray-400 group-hover:bg-blue-500 rounded-full transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default PromptCard;