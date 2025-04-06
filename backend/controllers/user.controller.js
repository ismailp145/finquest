const userService = require("../services/user.service");

async function getUsers(req, res) {
  console.log("before GET /users");
  try {
    console.log("Received GET /users");
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users" });
  }
}

async function addUser(req, res) {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
}

module.exports = {
  getUsers,
  addUser,
};
