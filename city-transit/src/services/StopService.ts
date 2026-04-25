import * as stopRepo from "../repositories/StopRepository";

export const stopService = {
  getStops() {
    return stopRepo.getStops();
  },

  addStop(name: string) {
    if (!name.trim()) return;
    return stopRepo.createStop({
      name,
      latitude: 49.8951,
      longitude: -97.1384,
    });
  },

  removeStop(id: number) {
    return stopRepo.deleteStop(id);
  }
};