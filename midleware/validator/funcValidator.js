// IMPORT PACKAGE
const { body, param, validationResult } = require("express-validator");

//IMPORT MODELS
const { users } = require("../../models");

// FUNCTION VALIDATION
module.exports = {
  registerValidation: [
    body("name")
      .notEmpty()
      .withMessage("The name cant empty")
      .bail()
      .isString()
      .withMessage("The name must be string")
      .matches(/^[a-zA-Z]+\.?\s?([a-zA-Z]+\.?\s?)+$/)
      .withMessage("Invalid name, must not contain numbers or symbols"),
    body("email")
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
      .isLength({ min: 8 })
      .withMessage("phone number length at least 8 digits")
      .bail(),
    // body("jenis_kelamin"),
    // body("status"),

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
