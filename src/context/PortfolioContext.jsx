import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultPortfolioData } from '../data/portfolioData';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(() => {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : defaultPortfolioData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
  };

  const resetToDefault = () => {
    setPortfolioData(defaultPortfolioData);
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData, resetToDefault }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
