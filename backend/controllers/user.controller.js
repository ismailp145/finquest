const userService = require("../services/user.service");

async function getUsers(req, res) {

  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users" });
  }
}

async function addUser(req, res) {
  const { name, email } = req.body;
  try {
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to add user" });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to get user" });
  }
}

module.exports = {
  getUsers,
  addUser,
  getUserById,
};
