// IMPORT PACKEGE
const bcrypt = require("bcrypt");

// IMPORT MODELS
const { users, sequelize } = require("../models");

// register CREATE
exports.userRegister = async (req, res, next) => {
  try {
    const newData = req.body;

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    newData.password = await bcrypt.hashSync(newData.password, salt);

    // CREATE NEW USERS
    const newUser = await users.create(newData);
    res.status(201).json({
      status: "success",
      message: `${newUser.email} registered successfully`,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// login

// get users
exports.getUsers = async (req, res, next) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete", "password"],
      },
    });

    if (data.length <= 0)
      return res.json({
        status: "success",
        data: "no data",
      });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get user by Id/email/phone
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const data = await users.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password", "isDelete"],
      },
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// delete user by id
