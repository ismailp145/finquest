const { getDB } = require("../utils/mongodb");

async function getAllUsers() {
  const db = getDB();
  return await db.collection("users").find().toArray();
}

async function createUser(userData) {
  const db = getDB();
  const result = await db.collection("users").insertOne(userData);
  return result;
}

module.exports = {
  getAllUsers,
  createUser,
};
