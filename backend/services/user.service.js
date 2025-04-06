const User = require('../models/User');

async function getAllUsers() {
  const users = await User.find();
  return users.map(user => ({
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  }));
}

async function createUser(name, email) {
  const user = await User.create({ name, email });
  return user;
}

module.exports = {
  getAllUsers,
  createUser,
};
