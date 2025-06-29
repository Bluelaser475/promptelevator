import React from 'react';
import ParallaxHero from './components/ParallaxHero';
import PromptGrid from './components/PromptGrid';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <ParallaxHero />
      <PromptGrid />
      <Footer />
    </div>
  );
}

export default App;