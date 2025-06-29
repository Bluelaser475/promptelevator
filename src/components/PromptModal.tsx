import React, { useEffect } from 'react';
import { X, Copy, Star, Code, Zap } from 'lucide-react';
import { Prompt } from '../data/prompts';

interface PromptModalProps {
  prompt: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ prompt, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const focusableElement = document.querySelector('[data-modal-focus]') as HTMLElement;
      focusableElement?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    if (prompt) {
      try {
        await navigator.clipboard.writeText(prompt.description);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const getIcon = () => {
    if (!prompt) return <Star className="w-8 h-8" />;
    
    if (prompt.title.toLowerCase().includes('developer') || prompt.title.toLowerCase().includes('javascript')) {
      return <Code className="w-8 h-8" />;
    }
    if (prompt.title.toLowerCase().includes('terminal') || prompt.title.toLowerCase().includes('linux')) {
      return <Zap className="w-8 h-8" />;
    }
    return <Star className="w-8 h-8" />;
  };

  if (!isOpen || !prompt) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                {getIcon()}
              </div>
              <div>
                <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                  {prompt.title}
                </h2>
                {prompt.featured && (
                  <span className="inline-block mt-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Featured Prompt
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close modal"
              data-modal-focus
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Prompt Description</h3>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                aria-label="Copy prompt to clipboard"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {prompt.description}
            </p>
          </div>

          {/* Usage Tips */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Usage Tips</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• Copy the prompt and paste it into your AI assistant</li>
              <li>• Customize the prompt to fit your specific needs</li>
              <li>• Experiment with different variations for better results</li>
              <li>• Save successful prompts for future use</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Press <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Esc</kbd> to close
            </p>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;