import { Request, Response } from "express";
import * as stopService from "../services/stopService";
import { getAuth } from "@clerk/express";

export const getStops = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  const stops = await stopService.getAllStops(userId!);
  res.json(stops);
};

export const createStop = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  const stop = await stopService.createStop({
    ...req.body,
    userId,
  });

  res.json(stop);
};

export const deleteStop = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);

  await stopService.deleteStop(Number(req.params.id), userId!);
  res.json({ message: "Deleted" });
};