require("dotenv").config(); // load .env
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
// console.log("✅ uri:", uri);
const client = new MongoClient(uri);

let db;

async function connectToDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");
    db = client.db("finquest"); // Replace with your DB name
    console.log("✅ DB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

function getDB() {
  console.log("✅ getDB hit");
  return db;
}

module.exports = { connectToDB, getDB };
