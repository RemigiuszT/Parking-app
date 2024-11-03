const store = require("../models/parkingAreaModel");

const getParkingAreas = async (req, res) => {
  const session = store.openSession();
  try {
    const parkingAreas = await session
      .query({ collection: "ParkingAreas" })
      .all();
    res.json(parkingAreas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createParkingArea = async (req, res) => {
  const session = store.openSession();
  try {
    const newParkingArea = req.body;
    await session.store(newParkingArea, "ParkingAreas/");
    session.advanced.getMetadataFor(newParkingArea)["@collection"] =
      "ParkingAreas";
    await session.saveChanges();
    res.status(201).json(newParkingArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateParkingArea = async (req, res) => {
  const session = store.openSession();
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const parkingArea = await session.load(id);
    if (parkingArea) {
      Object.assign(parkingArea, updatedData);
      await session.saveChanges();
      res.json(parkingArea);
    } else {
      res.status(404).json({ error: "Parking area not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteParkingArea = async (req, res) => {
  const session = store.openSession();
  try {
    const { id } = req.params;
    session.delete(id);
    await session.saveChanges();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getParkingAreas,
  createParkingArea,
  updateParkingArea,
  deleteParkingArea,
};
