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

import { BusRepository } from "../respositories/BusRepository";
import type { Bus } from "../types/Bus";

export class BusService {
  private repository = new BusRepository();

  /**
   * Get all buses from the repository
   * @returns Array of all Bus objects
   */
  getAllBuses(): Bus[] {
    return this.repository.getAll();
  }

  /**
   * Get only delayed buses
   * @returns Array of Bus objects with status "Delayed"
   */
  getDelayedBuses(): Bus[] {
    return this.repository.getAll().filter(bus => bus.status === "Delayed");
  }

  /**
   * Get all buses sorted by ETA (earliest first)
   * @returns Array of Bus objects sorted by eta
   */
  sortByETA(): Bus[] {
    return this.repository.getAll().sort((a, b) => a.eta - b.eta);
  }

  /**
   * Get a single bus by ID
   * @param id - The bus ID
   * @returns Bus object or undefined if not found
   */
  getBusById(id: string): Bus | undefined {
    return this.repository.getById(id);
  }

  /**
   * Add a new bus
   * @param bus - The Bus object to add
   */
  addBus(bus: Bus): void {
    this.repository.create(bus);
  }

  /**
   * Update an existing bus
   * @param bus - The Bus object with updated values
   */
  updateBus(bus: Bus): void {
    this.repository.update(bus);
  }

  /**
   * Delete a bus by ID
   * @param id - The ID of the bus to delete
   */
  deleteBus(id: string): void {
    this.repository.delete(id);
  }
}