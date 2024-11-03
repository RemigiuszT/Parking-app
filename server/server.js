const express = require("express");
const parkingRoutes = require("./routes/parkingRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/parking-areas", parkingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
