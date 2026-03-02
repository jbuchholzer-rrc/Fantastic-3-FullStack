import { stopRepository } from "../repositories/StopRepository";

export const stopService = {
  getStops() {
    return stopRepository.getAll();
  },

  addStop(name: string) {
    if (!name.trim()) return;
    return stopRepository.add(name);
  },

  removeStop(id: number) {
    stopRepository.remove(id);
  }
};