const express = require("express");

const employeeController = require("../controllers/employee.controller");
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/authorize.middleware");
const validate = require("../middleware/validation.middleware");
const ROLES = require("../constants/roles");

const {
    createEmployeeValidation
} = require("../validators/employee.validator");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize([ROLES.ADMIN, ROLES.HR]),
    createEmployeeValidation,
    validate,
    employeeController.createEmployee
);

module.exports = router;