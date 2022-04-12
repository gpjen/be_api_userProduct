const express = require("express");
const router = express.Router();

//VALIDATION
const {
  validationRegis,
  validationOneParamsId,
} = require("../midleware/validator/usersValidator");

//USER
const {
  getUsers,
  getUserById,
  userRegister,
  delUserById,
  updateUser,
  userLogin,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/user/:id", validationOneParamsId, getUserById);
router.patch("/user/:id", updateUser);
router.post("/register", validationRegis, userRegister);
router.post("/login", userLogin);
router.delete("/user/:id", validationOneParamsId, delUserById);

module.exports = router;
