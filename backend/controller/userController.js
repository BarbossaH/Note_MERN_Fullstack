//CRUD data from mongoBD

const User = require('../models/UserModel');
const Note = require('../models/NoteModel'); //if user was assigned to a note, we cannot delete it

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

//get all users

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean(); //just get the data, not need the methods of mongoose
  if (!users?.length > 0) {
    return res.status(400).json({ message: 'No users are found' });
  }
  return res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'id is invalid' });
  }
  const user = await User.findById(id).lean().exec();
  if (user) {
    return res.json(user);
  } else {
    return res.status(400).json({ message: 'Can not find this user' });
  }
});

//create user
const createUser = asyncHandler(async (req, res) => {
  //Check out the data from request
  const { username, password, roles } = req.body;
  // console.log(username, password, roles);
  if (!username || !password || !Array.isArray(roles) || !roles?.length) {
    return res.status(400).json({ message: 'Every field is needed' });
  }

  //check for duplicate username in the database
  const duplicateName = await User.findOne({ username }).lean().exec();

  if (duplicateName) {
    return res
      .status(409)
      .json({ message: `Username:${username} has been occupied` });
  }
  //encrypt the password
  const hashedPwd = await bcrypt.hash(password, 10);
  //after prepare all settings, we create the user now
  const newUser = { username, password: hashedPwd, roles };
  console.log(1232312);
  const userInDB = await User.create(newUser);
  if (userInDB) {
    return res.status(201).json({ message: `New user ${username} created` });
  } else {
    return res.status(400).json({ message: 'The data is invalid' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  //confirm every field
  const { id, username, roles, active, password } = req.body;
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length > 0 ||
    typeof active !== 'boolean'
  ) {
    return res
      .status(400)
      .json({ message: 'Every field is required except for password' });
  }
  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: 'user does not exist' });
  }
  //check the duplicate
  const duplicateUser = await User.findOne({ username }).lean().exec();
  if (duplicateUser && duplicateUser?._id.toString() !== id) {
    return res.status(409).json({ message: 'Duplicate username' });
  }
  user.username = username;
  user.roles = roles;
  user.active = active;
  if (password) {
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;
  }
  const updateUser = await user.save();
  return res.json({ message: `${updateUser.username} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'User Id is needed' });
  }
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: 'User has been assign to a note' });
  }
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
  // const result = User.deleteOne({ id })
  const result = await user.deleteOne();
  // console.log(result);
  return res.json({
    message: `Username ${result.username}with ID ${result._id} deleted`,
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
