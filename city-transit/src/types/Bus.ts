// I.1: TypeScript type defining the resource
export type Bus = {
  id: string;
  routeNumber: string;
  destination: string;
  nextStop: string;
  eta: number;
  status: "On Time" | "Delayed";
};