import { Request, Response } from "express";
import * as busService from "../services/busService";

export async function getBuses(req: Request, res: Response) {
  try {
    const buses = await busService.getAllBuses();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buses" });
  }
}

export async function getBus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const bus = await busService.getBusById(id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bus" });
  }
}

export async function createBus(req: Request, res: Response) {
  try {
    const newBus = await busService.createBus(req.body);
    res.status(201).json(newBus);
  } catch (error) {
    res.status(500).json({ message: "Failed to create bus" });
  }
}

export async function updateBus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const existingBus = await busService.getBusById(id);
    if (!existingBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const updatedBus = await busService.updateBus(id, req.body);
    res.json(updatedBus);
  } catch (error) {
    res.status(500).json({ message: "Failed to update bus" });
  }
}

export async function deleteBus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const existingBus = await busService.getBusById(id);
    if (!existingBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    await busService.deleteBus(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete bus" });
  }
}