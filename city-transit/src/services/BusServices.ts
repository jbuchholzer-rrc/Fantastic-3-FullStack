/**
 * T.2: Bus Service - Business Logic Layer
 *
 * Purpose:
 * This service defines BUSINESS LOGIC for bus operations.
 * It acts as an intermediary between the presentation layer (hooks/components)
 * and the data layer (repositories).
 *
 * Responsibilities:
 * - Get all buses
 * - Get delayed buses only
 * - Sort buses by ETA
 *
 * Used by:
 * - useBuses hook (T.1)
 * - LiveBusTracker component (I.3)
 *
 * Note: This service defines BUSINESS LOGIC only.
 * Data access is delegated to BusRepository.
 */

import { BusRepository } from "../repositories/BusRepository";
import type { Bus } from "../types/Bus";

export class BusService {
  private repository = new BusRepository();

  getAllBuses(): Bus[] {
    return this.repository.getAll();
  }

  getDelayedBuses(): Bus[] {
    return this.repository.getAll().filter(bus => bus.status === "Delayed");
  }

  sortByETA(): Bus[] {
    return this.repository.getAll().sort((a, b) => a.eta - b.eta);
  }

  getBusById(id: string): Bus | undefined {
    return this.repository.getById(id);
  }

  addBus(bus: Bus): void {
    this.repository.create(bus);
  }

  updateBus(bus: Bus): void {
    this.repository.update(bus);
  }

  deleteBus(id: string): void {
    this.repository.delete(id);
  }
}
