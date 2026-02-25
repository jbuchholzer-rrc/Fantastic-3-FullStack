import { stopTestData } from "../data/stopTestData";
import { Stop } from "../types/Stop";

let stops: Stop[] = [...stopTestData];

export const stopRepository = {
  getAll(): Stop[] {
    return stops;
  },

  add(name: string): Stop {
    const newStop: Stop = { id: Date.now(), name };
    stops.push(newStop);
    return newStop;
  },

  remove(id: number): void {
    stops = stops.filter(s => s.id !== id);
  }
};