// I.1: TypeScript type defining the resource
export type Bus = {
  id: number;
  routeNumber: string;
  destination: string;
  nextStop: string;
  eta: number;
  status: string;
  favorite: boolean;
};