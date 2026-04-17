/**
 * I.2: Test Data for Bus Resource
 * Contains pre-made TypeScript objects for testing the bus tracking functionality.
 * This data will be replaced with database data in the next module.
 */
import type { Bus } from "../types/Bus";

export const busTestData: Bus[] = [
  { id: 1, routeNumber: "D19", destination: "Corydon", nextStop: "Stafford St", eta: 2, status: "On Time", favorite: false },
  { id: 2, routeNumber: "FX3", destination: "Transcona", nextStop: "Plessis Rd", eta: 7, status: "Delayed", favorite: false },
  { id: 3, routeNumber: "F8", destination: "Pembina", nextStop: "Plaza Dr", eta: 3, status: "On Time", favorite: false },
  { id: 4, routeNumber: "16", destination: "Downtown", nextStop: "Main St", eta: 5, status: "On Time", favorite: false },
  { id: 5, routeNumber: "21", destination: "St. Vital", nextStop: "St. Mary's Rd", eta: 12, status: "Delayed", favorite: false },
  { id: 6, routeNumber: "55", destination: "Fort Garry", nextStop: "University", eta: 8, status: "On Time", favorite: false },
  { id: 7, routeNumber: "60", destination: "Waverley", nextStop: "Taylor Ave", eta: 4, status: "On Time", favorite: false },
  { id: 8, routeNumber: "71", destination: "Selkirk", nextStop: "McPhillips St", eta: 15, status: "Delayed", favorite: false },
  { id: 9, routeNumber: "10", destination: "St. Boniface", nextStop: "Goulet St", eta: 6, status: "On Time", favorite: false },
  { id: 10, routeNumber: "18", destination: "North Kildonan", nextStop: "Henderson Hwy", eta: 9, status: "On Time", favorite: false },
  { id: 11, routeNumber: "35", destination: "River Heights", nextStop: "Corydon Ave", eta: 3, status: "Delayed", favorite: false },
  { id: 12, routeNumber: "44", destination: "East Kildonan", nextStop: "Regent Ave", eta: 11, status: "On Time", favorite: false },
];