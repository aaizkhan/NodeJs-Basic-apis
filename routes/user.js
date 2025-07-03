const express = require("express");

const {
  getAllUsers,
  getUserById,
  editUserById,
  deleteUser,
  createUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

// Get Single User by Id
router.route("/:id").get(getUserById).patch(editUserById).delete(deleteUser);

module.exports = router;
