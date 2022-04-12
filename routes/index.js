const express = require("express");
const router = express.Router();

//VALIDATION
const { registerValidation } = require("../midleware/validator/funcValidator");

//USER
const { getUsers, getUserById, userRegister } = require("../controllers/users");

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/register", registerValidation, userRegister);

module.exports = router;
