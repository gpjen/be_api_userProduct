const express = require("express");
const router = express.Router();

//VALIDATION
const {
  registerValidation,
  validationOneParamsId,
} = require("../midleware/validator/usersValidator");

//USER
const {
  getUsers,
  getUserById,
  userRegister,
  delUserById,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/user/:id", validationOneParamsId, getUserById);
router.post("/register", registerValidation, userRegister);
router.delete("/user/:id", validationOneParamsId, delUserById);

module.exports = router;
