import { useState } from "react";
import { stopService } from "../services/StopService";
import type { Stop } from "../types/Stop";

/**
 * Custom hook for managing stops UI state
 * Returns stop list and UI handlers
 */
export function useStops() {
  const [stops, setStops] = useState<Stop[]>(stopService.getStops());

  function addStop(name: string) {
    stopService.addStop(name);
    setStops([...stopService.getStops()]);
  }

  function removeStop(id: number) {
    stopService.removeStop(id);
    setStops([...stopService.getStops()]);
  }

  return { stops, addStop, removeStop };
}