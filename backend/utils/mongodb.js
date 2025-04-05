require('dotenv').config(); // load .env
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectToDB() {
  try {
    await client.connect();
    console.log('✅ MongoDB connected');
    db = client.db('myDatabase'); // Replace with your DB name
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

function getDB() {
  return db;
}

module.exports = { connectToDB, getDB };