/**
 * T.1: Custom Hook - useBuses
 * 
 * Purpose:
 * This hook provides presentation logic for fetching and managing bus data.
 * It abstracts the business logic from components, making the code more reusable.
 * 
 * Returns:
 * - buses: Array of all buses from the service
 * - delayedBuses: Array of buses that are delayed
 * - sortByETA(): Function to get buses sorted by ETA
 * 
 * Used in:
 * - LiveBusTracker component (I.3)
 * - DelayedBuses component (T.1)
 * 
 * Note: This hook defines PRESENTATION LOGIC only. Business logic is delegated to BusService.
 */

import { useEffect, useState, useCallback } from "react";
import type { Bus } from "../types/Bus";
import { BusService } from "../service/BusServices";

export const useBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const service = new BusService();

  // Fetch buses on component mount
  useEffect(() => {
    const fetchBuses = () => {
      const data = service.getAllBuses();
      setBuses(data);
      setLoading(false);
    };
    fetchBuses();
  }, []);

  // Get delayed buses
  const delayedBuses = service.getDelayedBuses();

  // Sort by ETA - memoized for performance
  const sortByETA = useCallback((): Bus[] => {
    return service.sortByETA();
  }, []);

  return {
    buses,
    delayedBuses,
    sortByETA,
    loading,
  };
};