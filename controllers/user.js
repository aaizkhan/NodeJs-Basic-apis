const User = require("../models/user");

async function getAllUsers(req, res) {
  const allDbUser = await User.find({});
  return res.json(allDbUser);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ status: "no user found" });
  return res.json(user);
}

async function editUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    lastName: req.body.lastName,
  });
  return res.json({ status: "success" });
}

async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required" });
  }
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  console.log("Result : ", result);
  return res.status(201).json({ message: "Success", id: result.id });
}

module.exports = {
  getAllUsers,
  getUserById,
  editUserById,
  deleteUser,
  createUser,
};
