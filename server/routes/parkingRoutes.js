const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const { store } = require("../utils/ravenInstance");

router.get("/", async (req, res) => {
  const session = store.openSession();
  try {
    const parkingAreas = await session
      .query({ collection: "ParkingAreas" })
      .all();
    res.json(parkingAreas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const session = store.openSession();
  try {
    const newParkingArea = req.body;
    newParkingArea["@metadata"] = { "@collection": "ParkingAreas" };
    await session.store(newParkingArea);
    await session.saveChanges();
    res.status(201).json(newParkingArea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
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
});

router.delete("/:id", async (req, res) => {
  const session = store.openSession();
  try {
    const { id } = req.params;

    const parkingArea = await session.load(id);
    if (parkingArea) {
      session.delete(parkingArea);
      await session.saveChanges();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Parking area not found" });
    }
  } catch (error) {
    console.error("Error deleting parking area:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/calculate-fee", async (req, res) => {
  const { parkingAreaId, startTime, endTime, dayOfWeek, currency } = req.body;

  try {
    const session = store.openSession();
    const parkingArea = await session.load(parkingAreaId);

    if (!parkingArea) {
      return res.status(404).json({ error: "Parking area not found" });
    }

    const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60);
    const isWeekend = ["Saturday", "Sunday"].includes(dayOfWeek);
    const rate = isWeekend ? parkingArea.weekendRate : parkingArea.weekdayRate;

    let fee = rate * hours;
    if (parkingArea.discount > 0) {
      fee -= (fee * parkingArea.discount) / 100;
    }

    if (currency !== "USD") {
      const apiKey = "0886b9521e5ae95d000d2878c1872067"; // for demo
      const response = await fetch(
        `https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=USD,${currency}`
      );
      const exchangeData = await response.json();

      if (exchangeData.success) {
        const usdToEurRate = 1 / exchangeData.rates.USD;
        const feeInEur = fee * usdToEurRate;

        const finalFee = feeInEur * exchangeData.rates[currency];
        res.json({ fee: finalFee.toFixed(2), currency });
      } else {
        return res
          .status(500)
          .json({ error: "Failed to fetch exchange rates" });
      }
    } else {
      res.json({ fee: fee.toFixed(2), currency });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
