/**
 * T.4: Shared-page-state - useTrackedBuses Hook
 * 
 * Purpose:
 * This hook manages shared state between pages (LiveBusTracker and Favorites).
 * It replaces prop drilling from App.tsx with a centralized state management.
 * 
 * Architecture:
 * - Presentation Layer: Components use this hook
 * - Hook Layer: This hook handles presentation logic for tracked buses
 * 
 * Used by:
 * - LiveBusTrackerPage (refactored to use this hook)
 * - FavoritesPage (refactored to use this hook)
 * 
 * Note: This replaces the prop drilling that was previously in App.tsx
 */

import { useState, useCallback } from "react";
import type { Bus } from "../types/Bus";

export const useTrackedBuses = () => {
  const [trackedBuses, setTrackedBuses] = useState<Bus[]>([]);
  const [favorites, setFavorites] = useState<Bus[]>([]);

  // Add a bus to tracking
  const addBus = useCallback((bus: Bus) => {
    setTrackedBuses(prev => [...prev, bus]);
  }, []);

  // Remove a bus from tracking
  const removeBus = useCallback((id: number) => {
    setTrackedBuses(prev => prev.filter(bus => bus.id !== id));
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((bus: Bus) => {
    setFavorites(prev => {
      const isFav = prev.some(fav => fav.id === bus.id);
      if (isFav) {
        return prev.filter(fav => fav.id !== bus.id);
      }
      return [...prev, bus];
    });
  }, []);

  // Check if a bus is a favorite
  const isFavorite = useCallback((id: number): boolean => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  return {
    trackedBuses,
    setTrackedBuses,
    favorites,
    setFavorites,
    addBus,
    removeBus,
    toggleFavorite,
    isFavorite,
  };
};
