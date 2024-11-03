import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Heading,
  Field,
  Select,
  DatePickerWrapper,
  Button,
  Result,
} from "./styles";

interface ParkingArea {
  id: string;
  name: string;
  weekdayRate: number;
  weekendRate: number;
  discount: number;
}

const PaymentCalculator: React.FC = () => {
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<string>("Monday");
  const [currency, setCurrency] = useState<string>("USD");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [fee, setFee] = useState<number | null>(null);

  useEffect(() => {
    fetchParkingAreas();
  }, []);

  const fetchParkingAreas = async () => {
    const response = await fetch("http://localhost:5000/api/parking-areas");
    const data = await response.json();
    setParkingAreas(data);
  };

  const handleCalculateFee = async () => {
    if (startTime && endTime) {
      const response = await fetch(
        "http://localhost:5000/api/parking-areas/calculate-fee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            parkingAreaId: selectedArea,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            dayOfWeek,
            currency: selectedCurrency,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFee(data.fee);
        setCurrency(selectedCurrency);
      } else {
        console.error("Failed to calculate fee");
      }
    }
  };

  const isFormComplete = selectedArea && startTime && endTime && dayOfWeek;

  return (
    <Container>
      <Heading>Calculate Parking Payment</Heading>

      <Field>
        <label>Select Parking Area</label>
        <Select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">Choose a parking area</option>
          {parkingAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <label>Start Time</label>
        <DatePickerWrapper>
          <DatePicker
            selected={startTime}
            onChange={(date: Date | null) => setStartTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy HH:mm"
            placeholderText="Select start time"
          />
        </DatePickerWrapper>
      </Field>

      <Field>
        <label>End Time</label>
        <DatePickerWrapper>
          <DatePicker
            selected={endTime}
            onChange={(date: Date | null) => setEndTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy HH:mm"
            placeholderText="Select end time"
          />
        </DatePickerWrapper>
      </Field>

      <Field>
        <label>Day of the Week</label>
        <Select
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <label>Currency</label>
        <Select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="PLN">PLN</option>
        </Select>
      </Field>

      <Button onClick={handleCalculateFee} disabled={!isFormComplete}>
        Calculate Fee
      </Button>

      {fee !== null && (
        <Result>
          Amount to pay: {fee} {currency}
        </Result>
      )}
    </Container>
  );
};

export default PaymentCalculator;
