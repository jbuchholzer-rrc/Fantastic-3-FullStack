import prisma from "../lib/prisma";

export const getAllStops = (userId: string) => {
  return prisma.stop.findMany({
    where: { userId },
  });
};

export const createStop = (data: any) => {
  return prisma.stop.create({ data });
};

export const deleteStop = async (id: number, userId: string) => {
  return prisma.stop.deleteMany({
    where: {
      id,
      userId,
    },
  });
};