const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
} = require("../services/userService");

const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

router.put(
  "/changPassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
router
  .route("/")
  .post(uploadUserImage, resizeImage, createUserValidator, createUser)
  .get(getUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateLoggedUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
