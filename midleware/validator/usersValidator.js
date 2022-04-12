// IMPORT PACKAGE
const { promise, reject } = require("bcrypt/promises");
const { body, param, validationResult } = require("express-validator");

//IMPORT MODELS
const { users } = require("../../models");

// FUNCTION VALIDATION
module.exports = {
  validationRegis: [
    body("name")
      .notEmpty()
      .withMessage("The name cant empty")
      .bail()
      .isString()
      .withMessage("The name must be string")
      .toLowerCase()
      .matches(/^[a-zA-Z]+\.?\s?([a-zA-Z]+\.?\s?)+$/)
      .withMessage("Invalid name, must not contain numbers or symbols"),

    body("email")
      .toLowerCase()
      .notEmpty()
      .withMessage("The email cant empty")
      .bail()
      .isEmail()
      .withMessage("Invalid email format ex: email@mail.com")
      .custom(async (value) => {
        const checking = await users.findOne({ where: { email: value } });
        if (checking) {
          return promise.reject();
        }
      })
      .withMessage("The email already exist"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("minimum character length 6")
      .bail()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)
      .withMessage(
        "The password must contain uppercase, lowercase and numbers"
      ),

    body("phone")
      .notEmpty()
      .withMessage("phone number is required")
      .bail()
      .matches(/^[0-9\+-]+\s?([0-9]+\s?)+$/)
      .withMessage("phone number isnt valid")
      .bail()
      .isLength({ min: 10 })
      .withMessage("phone number to sort, min: 10")
      .bail()
      .custom(async (value) => {
        const checking = await users.findOne({ where: { phone: value } });
        if (checking) {
          return promise.reject();
        }
      })
      .withMessage("The phone number alredy exist"),

    body("jenis_kelamin")
      .toLowerCase()
      .isIn(["laki-laki", "perempuan"])
      .withMessage("The gender invalid ex: laki-laki / perempuan"),

    body("status")
      .toLowerCase()
      .isIn(["admin", "seller", "buyer"])
      .withMessage("The status user invalid"),

    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({
          status: "failed",
          data: error.errors,
        });
      next();
    },
  ],
  validationOneParamsId: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .bail()
      .isNumeric()
      .withMessage("Id must be a number"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(422).json({
          status: "failed",
          data: error.errors,
        });
      next();
    },
  ],
};
