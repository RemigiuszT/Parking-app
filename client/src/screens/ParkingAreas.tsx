import React, { useEffect, useState } from "react";
import parkingAreaService from "../services/parkingAreaService";

interface ParkingArea {
  id: string;
  name: string;
  weekdayRate: number;
  weekendRate: number;
  discount: number;
}

const ParkingAreas: React.FC = () => {
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const areas = await parkingAreaService.getParkingAreas();
        setParkingAreas(areas);
      } catch (err) {
        setError("Failed to load parking areas");
      }
    };

    fetchParkingAreas();
  }, []);

  return (
    <div>
      <h1>Parking Areas</h1>
      {error && <p>{error}</p>}
      <ul>
        {parkingAreas.length === 0 && !error ? (
          <p>No parking areas available. Please add a new parking area.</p>
        ) : (
          <ul>
            {parkingAreas.map((area) => (
              <li key={area.id}>
                {area.name} - Weekday Rate: ${area.weekdayRate}, Weekend Rate: $
                {area.weekendRate}, Discount: {area.discount}%
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default ParkingAreas;
