import prisma from "../lib/prisma";

export type CreateBusInput = {
  routeNumber: string;
  destination: string;
  nextStop: string;
  eta: number;
  status: "On Time" | "Delayed";
};

export type UpdateBusInput = Partial<CreateBusInput>;

export async function getAllBuses() {
  return prisma.bus.findMany({
    orderBy: { id: "asc" },
  });
}

export async function getBusById(id: number) {
  return prisma.bus.findUnique({
    where: { id },
  });
}

export async function createBus(data: CreateBusInput) {
  return prisma.bus.create({
    data,
  });
}

export async function updateBus(id: number, data: UpdateBusInput) {
  return prisma.bus.update({
    where: { id },
    data,
  });
}

export async function deleteBus(id: number) {
  return prisma.bus.delete({
    where: { id },
  });
}