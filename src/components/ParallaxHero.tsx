import React, { useEffect, useState } from 'react';

const ParallaxHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Layer 1 - Distant Mountains */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-800 to-indigo-900"
          style={{
            transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Layer 2 - Mid Mountains */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
            transition: 'transform 0.1s ease-out',
            background: `url('https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover no-repeat`
          }}
        />
        
        {/* Layer 3 - Foreground Mountains */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
            transition: 'transform 0.1s ease-out',
            background: `url('https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop') center/cover no-repeat`
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <a 
          href="https://bolt.new" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform duration-300 hover:scale-110"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Bolt Logo" 
            className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </a>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Elevate Your Prompts
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Discover powerful AI prompts that transform your creative workflow and unlock new possibilities
          </p>
          <button 
            onClick={() => document.getElementById('prompts')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Explore Prompts
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;