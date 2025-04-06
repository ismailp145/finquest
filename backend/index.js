const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routers/userRoutes');
const aiRoutes = require('./routers/aiRoutes');
const decisionRoutes = require('./routers/decisionRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/decisions', decisionRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");

  // Start the server only after connection
  app.listen(PORT, () => console.log("🚀 Server running on port 3000"));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});