// I.1 Repository Definition
// I.2 Test Data integration
import type { Bus } from "../types/Bus";
import { busTestData } from "../data/busTestData";

export class BusRepository {

  getAll(): Bus[] {
    return busTestData;
  }

  getById(id: string): Bus | undefined {
    return busTestData.find(bus => bus.id === id);
  }

  create(bus: Bus): void {
    busTestData.push(bus);
  }

  update(updatedBus: Bus): void {
    const index = busTestData.findIndex(bus => bus.id === updatedBus.id);
    if (index !== -1) {
      busTestData[index] = updatedBus;
    }
  }

  delete(id: string): void {
    const index = busTestData.findIndex(bus => bus.id === id);
    if (index !== -1) {
      busTestData.splice(index, 1);
    }
  }
}