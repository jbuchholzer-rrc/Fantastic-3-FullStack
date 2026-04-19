import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import * as repo from "../repositories/StopRepository";

export const useStops = () => {
  const [stops, setStops] = useState<any[]>([]);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      loadStops();
    }
  }, [isSignedIn]);

  const loadStops = async () => {
    const token = await getToken();

    if (!token) return; 

    const data = await repo.getStops(token);
    setStops(data);
  };

  const addStop = async (name: string) => {
    if (!name.trim()) return;

    const token = await getToken();
    if (!token) return;

    await repo.createStop(
      {
        name,
        latitude: 49.8951,
        longitude: -97.1384,
      },
      token
    );

    await loadStops();
  };

  const deleteStop = async (id: number) => {
    const token = await getToken();
    if (!token) return;

    await repo.deleteStop(id, token);
    await loadStops();
  };

  return { stops, addStop, deleteStop };
};