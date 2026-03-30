import { createContext, useContext, type ReactNode } from "react";
import { useTrackedBuses } from "../hooks/useTrackedBuses";
import type { Bus } from "../types/Bus";

interface BusContextType {
  trackedBuses: Bus[];
  setTrackedBuses: React.Dispatch<React.SetStateAction<Bus[]>>;
  favorites: Bus[];
  setFavorites: React.Dispatch<React.SetStateAction<Bus[]>>;
  addBus: (bus: Bus) => void;
  removeBus: (id: number) => void;
  toggleFavorite: (bus: Bus) => void;
  isFavorite: (id: number) => boolean;
}

const BusContext = createContext<BusContextType | undefined>(undefined);

export const BusProvider = ({ children }: { children: ReactNode }) => {
  const busState = useTrackedBuses();
  return (
    <BusContext.Provider value={busState}>
      {children}
    </BusContext.Provider>
  );
};

export const useBusContext = () => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error("useBusContext must be used within a BusProvider");
  }
  return context;
};
