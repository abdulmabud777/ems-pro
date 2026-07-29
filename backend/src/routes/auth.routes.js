const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');

const {
  registerValidation,
} = require("../validators/auth.validator");

const validate = require("../middleware/validation.middleware");

router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);

// router.post('/login');

module.exports = router;