import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background3D from './components/Background3D';

function App() {
  const [theme, setTheme] = useState('dark');

  const themes = [
    { id: 'dark', color: '#050505', label: 'Dark' },
    { id: 'light', color: '#ffffff', label: 'Light' },
    { id: 'red', color: '#ff0a54', label: 'Red' },
    { id: 'blue', color: '#00f0ff', label: 'Blue' },
    { id: 'green', color: '#4ade80', label: 'Green' }
  ];

  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-red', 'theme-blue', 'theme-green');
    // Add current theme class if not dark
    if (theme !== 'dark') {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <>
      <div className="theme-switcher">
        {themes.map(t => (
          <div 
            key={t.id}
            className={`theme-dot ${theme === t.id ? 'active' : ''}`}
            style={{ backgroundColor: t.color }}
            onClick={() => setTheme(t.id)}
            title={`${t.label} Theme`}
          />
        ))}
      </div>

      <Background3D theme={theme} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
