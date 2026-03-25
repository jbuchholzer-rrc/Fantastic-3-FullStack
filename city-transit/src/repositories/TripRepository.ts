import type { Trip } from "../types/Trip";

let trips: Trip[] = [];

const getAllTrips = () => trips;

const addTrip = (trip: Omit<Trip, "id">) => {
  const newTrip = { ...trip, id: Date.now() };
  trips.push(newTrip);
  return newTrip;
};

const removeTrip = (id: number) => {
  trips = trips.filter(t => t.id !== id);
  return true;
};

const getTripById = (id: number) => {
  return trips.find(t => t.id === id);
};

const getAllStops = () => {
  return ["Stop A", "Stop B", "Stop C"];
};

export default {
  getAllTrips,
  addTrip,
  removeTrip,
  getTripById,
  getAllStops
};