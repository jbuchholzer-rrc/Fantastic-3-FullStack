import type { Stop } from "../types/Stop";

export type Route = {
  id: string;
  label: string;
  color: string;
  stops: Stop[];
};

export const transitRoutes: Route[] = [

  // BLUE
  {
  id: "BLUE",
  label: "Blue Line – Rapid Transit",
  color: "#0074D9",
  stops: [
    { id: 1, name: "Unicity", lat: 49.8814, lng: -97.2872 },
    { id: 2, name: "Polo Park", lat: 49.8815, lng: -97.1967 },
    { id: 3, name: "Downtown (Portage & Main)", lat: 49.8951, lng: -97.1384 },
    { id: 4, name: "Osborne Station", lat: 49.8761, lng: -97.1453 },
    { id: 5, name: "Fort Rouge Station", lat: 49.8550, lng: -97.1527 },
    { id: 6, name: "University of Manitoba", lat: 49.8094, lng: -97.1328 },
    { id: 7, name: "St Norbert", lat: 49.7496, lng: -97.1492 }
  ]
},

  // F8
  {
  id: "F8",
  label: "F8 – Henderson",
  color: "#2ECC40",
  stops: [
    { id: 1, name: "Glenway", lat: 49.9307, lng: -97.0710 },
    { id: 2, name: "Kildonan Park", lat: 49.9293, lng: -97.1190 },
    { id: 3, name: "City Hall", lat: 49.8988, lng: -97.1376 },
    { id: 4, name: "Pembina", lat: 49.8430, lng: -97.1436 },
    { id: 5, name: "University of Manitoba", lat: 49.8094, lng: -97.1328 }
  ]
},

  // D16
  {
  id: "D16",
  label: "D16 – Academy",
  color: "#033606",
  stops: [
    { id: 1, name: "Polo Park", lat: 49.8815, lng: -97.1967 },
    { id: 2, name: "Academy & Stafford", lat: 49.8782, lng: -97.1701 },
    { id: 3, name: "Downtown", lat: 49.8951, lng: -97.1384 },
    { id: 4, name: "Notre Dame", lat: 49.9057, lng: -97.1639 },
    { id: 5, name: "RRC Polytech", lat: 49.9036, lng: -97.1586 }
  ]
},

// FX4
{
  id: "FX4",
  label: "FX4 – Gateway",
  color: "#800080",
  stops: [
    { id: 1, name: "Raleigh", lat: 49.9441, lng: -97.0582 },
    { id: 2, name: "Kildonan Place", lat: 49.8948, lng: -97.0630 },
    { id: 3, name: "Downtown", lat: 49.8951, lng: -97.1384 },
    { id: 4, name: "Portage Ave", lat: 49.8810, lng: -97.1917 },
    { id: 5, name: "Polo Park", lat: 49.8815, lng: -97.1967 }
  ]
},

// 74
{
  id: "74",
  label: "74 – Kenaston",
  color: "#00008B",
  stops: [
    { id: 1, name: "Waterford Green", lat: 49.9520, lng: -97.1970 },
    { id: 2, name: "Polo Park", lat: 49.8815, lng: -97.1967 },
    { id: 3, name: "Kenaston Common", lat: 49.8444, lng: -97.2137 },
    { id: 4, name: "Victoria Hospital", lat: 49.8151, lng: -97.1895 },
    { id: 5, name: "University of Manitoba", lat: 49.8094, lng: -97.1328 }
  ]
}
];
