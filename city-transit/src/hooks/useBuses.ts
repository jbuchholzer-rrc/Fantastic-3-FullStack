import { useEffect, useState, useCallback } from "react";
import type { Bus } from "../types/Bus";
import { BusService } from "../services/BusServices";

export const useBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const service = new BusService();

  const loadBuses = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await service.getAllBuses();
      setBuses(data);
    } catch {
      setError("Could not load buses from the backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBuses();
  }, [loadBuses]);

  const addBus = async (bus: Omit<Bus, "id">) => {
    await service.addBus(bus);
    await loadBuses();
  };

  const toggleFavorite = async (id: number, favorite: boolean) => {
    await service.toggleFavorite(id, favorite);
    await loadBuses();
  };

  const deleteBus = async (id: number) => {
    await service.deleteBus(id);
    await loadBuses();
  };

  return {
    buses,
    loading,
    error,
    addBus,
    toggleFavorite,
    deleteBus,
  };
};