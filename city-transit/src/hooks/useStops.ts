import { useEffect, useState } from "react";
import * as repo from "../repositories/StopRepository";

export const useStops = () => {
  const [stops, setStops] = useState<any[]>([]);

  useEffect(() => {
    loadStops();
  }, []);

  const loadStops = async () => {
    const data = await repo.getStops();
    setStops(data);
  };

  const addStop = async (name: string) => {
    if (!name.trim()) return;

    await repo.createStop({
      name,
      latitude: 49.8951,   // temp
      longitude: -97.1384,
    });

    await loadStops(); // refresh from DB
  };

  const deleteStop = async (id: number) => {
    await repo.deleteStop(id);
    await loadStops();
  };

  return { stops, addStop, deleteStop };
};