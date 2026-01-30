import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface StopsContextType {
  stops: string[];
  setStops: React.Dispatch<React.SetStateAction<string[]>>;
}

const StopsContext = createContext<StopsContextType | undefined>(undefined);

export const useStops = () => {
  const context = useContext(StopsContext);
  if (!context) {
    throw new Error('useStops must be used within a StopsProvider');
  }
  return context;
};

interface StopsProviderProps {
  children: ReactNode;
}

export const StopsProvider: React.FC<StopsProviderProps> = ({ children }) => {
  const [stops, setStops] = useState<string[]>([]);

  return (
    <StopsContext.Provider value={{ stops, setStops }}>
      {children}
    </StopsContext.Provider>
  );
};
