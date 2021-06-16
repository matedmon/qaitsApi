const { check } = require("express-validator");

//validating the person's details

let personValidation = [
  check("identity").trim().not().isEmpty().withMessage("Identity is required!"),
  // .isNumeric()
  // .withMessage("Invalid identity value!"),
  check("firstname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Firstname is required!")
    .isLength({ min: 2, max: 30 })
    .withMessage("Firstname must be at least 2 characters long!"),
  check("surname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Surname is required!")
    .isLength({ min: 2, max: 30 })
    .withMessage("Surname must be at least 2 characters long!"),
  check("age").trim().not().isEmpty().withMessage("Age is required!"),
  // .isNumeric()
  // .withMessage("Invalid age value!"),
  check("sex").trim().not().isEmpty().withMessage("Sex is required!"),
  check("mobile").trim().not().isEmpty().withMessage("Mobile is required!"),
  // .isNumeric()
  // .withMessage("Invalid mobile value!"),
  check("active").trim().not().isEmpty().withMessage("Active is required!"),
];

module.exports.personValidation = personValidation;
