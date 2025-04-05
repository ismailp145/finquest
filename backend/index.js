const express = require('express');
require('dotenv').config(); // load .env
const { connectToDB } = require('./utils/mongodb');
const userRoutes = require('./routers/userRoutes');
const aiRoutes = require('./routers/aiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
