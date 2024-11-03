import React, { useEffect, useState } from "react";
import {
  Container,
  Title,
  SubTitle,
  Field,
  Input,
  Button,
  List,
  ListItem,
  ListItemDetails,
  ItemButton,
  ErrorText,
  ButtonContainer,
} from "./styles";

interface ParkingArea {
  id: string;
  name: string;
  weekdayRate: number;
  weekendRate: number;
  discount: number;
}

const ParkingAreaManagement: React.FC = () => {
  const [parkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);
  const [newParkingArea, setNewParkingArea] = useState({
    name: "",
    weekdayRate: 0,
    weekendRate: 0,
    discount: 0,
  });
  const [originalParkingArea, setOriginalParkingArea] =
    useState(newParkingArea);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchParkingAreas();
  }, []);

  const fetchParkingAreas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/parking-areas");
      if (!response.ok) throw new Error("Failed to fetch parking areas");
      const data = await response.json();
      setParkingAreas(data);
    } catch (error) {
      setError("Failed to load parking areas. Please try again later.");
    }
  };

  const hasChanges =
    JSON.stringify(newParkingArea) !== JSON.stringify(originalParkingArea);

  const handleAddOrEditParkingArea = async () => {
    if (!newParkingArea.name) {
      setError("Parking area name is required.");
      return;
    }
    if (newParkingArea.weekdayRate <= 0 || newParkingArea.weekendRate <= 0) {
      setError("Weekday and weekend rates must be positive numbers.");
      return;
    }
    if (newParkingArea.discount < 0 || newParkingArea.discount > 100) {
      setError("Discount must be between 0 and 100.");
      return;
    }

    try {
      const url = editId
        ? `http://localhost:5000/api/parking-areas/${editId}`
        : "http://localhost:5000/api/parking-areas";
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParkingArea),
      });
      if (!response.ok) throw new Error("Failed to save parking area");

      fetchParkingAreas();
      setNewParkingArea({
        name: "",
        weekdayRate: 0,
        weekendRate: 0,
        discount: 0,
      });
      setOriginalParkingArea({
        name: "",
        weekdayRate: 0,
        weekendRate: 0,
        discount: 0,
      });
      setError(null);
      setEditId(null);
    } catch (error) {
      setError("Failed to save parking area. Please try again later.");
    }
  };

  const handleDeleteParkingArea = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/parking-areas/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete parking area");

      fetchParkingAreas();
    } catch (error) {
      setError("Failed to delete parking area. Please try again later.");
    }
  };

  const handleEditParkingArea = (area: ParkingArea) => {
    setNewParkingArea({
      name: area.name,
      weekdayRate: area.weekdayRate,
      weekendRate: area.weekendRate,
      discount: area.discount,
    });
    setOriginalParkingArea({
      name: area.name,
      weekdayRate: area.weekdayRate,
      weekendRate: area.weekendRate,
      discount: area.discount,
    });
    setEditId(area.id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setNewParkingArea({
      name: "",
      weekdayRate: 0,
      weekendRate: 0,
      discount: 0,
    });
    setError(null);
  };

  return (
    <Container>
      <Title>Manage Parking Areas</Title>
      <SubTitle>
        {editId ? "Edit Parking Area" : "Add New Parking Area"}
      </SubTitle>

      <Field>
        <label>Parking Area Name</label>
        <Input
          placeholder="Enter parking area name"
          value={newParkingArea.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewParkingArea((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Field>
      <Field>
        <label>Weekday Rate (USD)</label>
        <Input
          type="number"
          placeholder="Enter weekday rate"
          value={newParkingArea.weekdayRate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewParkingArea((prev) => ({
              ...prev,
              weekdayRate: parseFloat(e.target.value),
            }))
          }
        />
      </Field>
      <Field>
        <label>Weekend Rate (USD)</label>
        <Input
          type="number"
          placeholder="Enter weekend rate"
          value={newParkingArea.weekendRate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewParkingArea((prev) => ({
              ...prev,
              weekendRate: parseFloat(e.target.value),
            }))
          }
        />
      </Field>
      <Field>
        <label>Discount (%)</label>
        <Input
          type="number"
          placeholder="Enter discount percentage"
          value={newParkingArea.discount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewParkingArea((prev) => ({
              ...prev,
              discount: parseFloat(e.target.value),
            }))
          }
        />
      </Field>
      {error && <ErrorText>{error}</ErrorText>}

      <ButtonContainer>
        <Button onClick={handleAddOrEditParkingArea} disabled={!hasChanges}>
          {editId ? "Save Changes" : "Add Parking Area"}
        </Button>
        {editId && (
          <Button onClick={handleCancelEdit} style={{ marginLeft: "10px" }}>
            Cancel
          </Button>
        )}
      </ButtonContainer>

      <SubTitle>Existing Parking Areas</SubTitle>
      <List>
        {parkingAreas.length === 0 && !error ? (
          <p>No parking areas available. Please add a new parking area.</p>
        ) : (
          parkingAreas.map((area) => (
            <ListItem key={area.id}>
              <ListItemDetails>
                <strong>{area.name}</strong>
                <span>Weekday Rate: ${area.weekdayRate}</span>
                <span>Weekend Rate: ${area.weekendRate}</span>
                <span>Discount: {area.discount}%</span>
              </ListItemDetails>
              <ButtonContainer>
                <ItemButton onClick={() => handleEditParkingArea(area)}>
                  Edit
                </ItemButton>
                <ItemButton
                  onClick={() => handleDeleteParkingArea(area.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </ItemButton>
              </ButtonContainer>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default ParkingAreaManagement;
