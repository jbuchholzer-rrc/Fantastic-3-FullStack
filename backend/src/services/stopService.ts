import prisma from "../lib/prisma";

export const getAllStops = () => {
  return prisma.stop.findMany();
};

export const createStop = (data: any) => {
  return prisma.stop.create({ data });
};

export const deleteStop = (id: number) => {
  return prisma.stop.delete({ where: { id } });
};