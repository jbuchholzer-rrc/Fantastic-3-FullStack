import { Request, Response, NextFunction } from "express";

export const validateStop = (req: Request, res: Response, next: NextFunction) => {
  const { name, latitude, longitude } = req.body;

  if (!name || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Invalid data" });
  }

  next();
};