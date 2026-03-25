import { Request, Response } from "express";
import * as stopService from "../services/stopService";

export const getStops = async (req: Request, res: Response) => {
  const stops = await stopService.getAllStops();
  res.json(stops);
};

export const createStop = async (req: Request, res: Response) => {
  const stop = await stopService.createStop(req.body);
  res.json(stop);
};

export const deleteStop = async (req: Request, res: Response) => {
  await stopService.deleteStop(Number(req.params.id));
  res.json({ message: "Deleted" });
};