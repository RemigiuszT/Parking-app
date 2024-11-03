import { ParkingArea } from "../types/parkingArea";

const API_URL = "http://localhost:5000/api/parking-areas";

export const parkingAreaService = {
  async getParkingAreas() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch parking areas");
    }
    return await response.json();
  },

  async createParkingArea(parkingArea: {
    name: string;
    weekdayRate: number;
    weekendRate: number;
    discount: number;
  }) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parkingArea),
    });
    if (!response.ok) {
      throw new Error("Failed to create parking area");
    }
    return await response.json();
  },

  async updateParkingArea(id: string, updatedData: Partial<ParkingArea>) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to update parking area");
    }
    return await response.json();
  },

  async deleteParkingArea(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete parking area");
    }
  },
};

export default parkingAreaService;
