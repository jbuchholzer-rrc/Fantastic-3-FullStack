/**
 * T.4: Bus Context - Shared Page State
 * 
 * Purpose:
 * This context provides shared state between pages (LiveBusTrackerPage and FavoritesPage).
 * It replaces prop drilling from App.tsx.
 * 
 * Architecture:
 * - Uses useTrackedBuses hook internally
 * - Provides state and actions to child components via React Context
 * 
 * Used by:
 * - LiveBusTrackerPage
 * - FavoritesPage
 * 
 * Note: This is the preferred pattern for sharing state that doesn't rely on external data.
 * For state that relies on external data, use the hook-service-repository pattern.
 */

import { createContext, useContext, type ReactNode } from "react";
import { useTrackedBuses } from "../hooks/useTrackedBuses";
import type { Bus } from "../types/Bus";

interface BusContextType {
  trackedBuses: Bus[];
  setTrackedBuses: React.Dispatch<React.SetStateAction<Bus[]>>;
  favorites: Bus[];
  setFavorites: React.Dispatch<React.SetStateAction<Bus[]>>;
  addBus: (bus: Bus) => void;
  removeBus: (id: string) => void;
  toggleFavorite: (bus: Bus) => void;
  isFavorite: (id: string) => boolean;
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
