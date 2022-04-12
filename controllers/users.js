// IMPORT PACKEGE
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

// IMPORT MODELS
const { users } = require("../models");

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
    console.log("error > ", error.message);
    next(error);
  }
};

// login
exports.userLogin = async (req, res, next) => {
  const { password } = req.body;
  const email = req.body.email || "";
  const phone = req.body.phone || "";
  try {
    const data = await users.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (!data) {
      return res.status(400).json({
        status: "failed",
        message: "email and password dosnt match",
      });
    }

    res.status(200).json({
      status: data ? "success" : "failed",
      data: data || "no data",
      password,
    });
  } catch (error) {
    error.message = `userLogin => ${error.message}`;
    console.log("error > ", error.message);
    next(error);
  }
};

// get users
exports.getUsers = async (req, res, next) => {
  try {
    const data = await users.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "isDelete", "password"],
      },
    });

    res.status(200).json({
      status: "success",
      data: data.length > 0 ? data : "no data user",
    });
  } catch (error) {
    console.log("error > ", error.message);
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
      status: data ? "success" : "failed",
      data: data || `Id.${id}, has no data`,
    });
  } catch (error) {
    console.log("error > ", error.message);
    next(error);
  }
};

// update data user
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const data = await users.update(newData, { where: { id } });

    res.status(200).json({
      status: data > 0 ? "success" : "failed",
      message: `${data} data updated`,
    });
  } catch (error) {
    console.log("error > ", error.message);
    next(error);
  }
};

// delete user by id
exports.delUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await users.destroy({ where: { id } });
    res.status(200).json({
      status: data > 0 ? "success" : "failed",
      message: `${data} data deleted`,
    });
  } catch (error) {
    console.log("error > ", error.message);
    next(error);
  }
};
