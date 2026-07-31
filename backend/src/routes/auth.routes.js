const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const { validateLogin } = require("../validators/login.validator");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/authorize.middleware");
const ROLES = require("../constants/roles");

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

router.post(
  "/login",
  validateLogin,
  authController.login
);

router.get(
  "/profile",
  authenticate,
  authController.profile
);

router.get(
    "/admin",
    authenticate,
    authorize([1]),   // assuming ADMIN role_id = 1
    (req, res) => {
        res.json({
            success: true,
            message: "Welcome Admin"
        });
    }
);

router.get(
  "/admin",
  authenticate,
  authorize([ROLES.ADMIN]),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;