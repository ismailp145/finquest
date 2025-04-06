const express = require("express");
require("dotenv").config(); // load .env
const { connectToDB } = require("./utils/mongodb");
const userRoutes = require("./routers/userRoutes");
const aiRoutes = require("./routers/aiRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 8080;

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/", aiRoutes);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
