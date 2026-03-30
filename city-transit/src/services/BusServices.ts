import { BusRepository } from "../repositories/BusRepository";
import type { Bus } from "../types/Bus";

export class BusService {
  private repository = new BusRepository();

  async getAllBuses(): Promise<Bus[]> {
    return this.repository.getAll();
  }

  async addBus(bus: Omit<Bus, "id">): Promise<Bus> {
    return this.repository.create(bus);
  }

  async deleteBus(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
