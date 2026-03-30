import type { Bus } from "../types/Bus";

const API_BASE_URL = "/api/buses";

export class BusRepository {
  async getAll(): Promise<Bus[]> {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch buses");
    }

    return response.json();
  }

  async create(bus: Omit<Bus, "id">): Promise<Bus> {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bus),
    });

    if (!response.ok) {
      throw new Error("Failed to create bus");
    }

    return response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete bus");
    }
  }
}