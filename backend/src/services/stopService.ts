import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStops = () => {
  return prisma.stop.findMany();
};

export const createStop = (data: any) => {
  return prisma.stop.create({ data });
};

export const deleteStop = (id: number) => {
  return prisma.stop.delete({ where: { id } });
};