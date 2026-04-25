import * as stopRepo from "../repositories/StopRepository";

export const stopService = {
  getStops(token: string) {
    return stopRepo.getStops(token);
  },

  addStop(name: string, token: string) {
    if (!name.trim()) return;
    return stopRepo.createStop(
      {
        name,
        latitude: 49.8951,
        longitude: -97.1384,
      },
      token
    );
  },

  removeStop(id: number, token: string) {
    return stopRepo.deleteStop(id, token);
  },
};
