const { body } = require("express-validator");

const createEmployeeValidation = [

    body("employeeCode")
        .trim()
        .notEmpty()
        .withMessage("Employee code is required")
        .matches(/^EMP\d{3,}$/)
        .withMessage("Employee code must be in format EMP001"),

    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),

    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("phone")
        .optional({ nullable: true, checkFalsy: true })
        .isMobilePhone("en-IN")
        .withMessage("Please enter a valid mobile number"),

    body("gender")
        .optional({ nullable: true })
        .isIn(["MALE", "FEMALE", "OTHER"])
        .withMessage("Gender must be MALE, FEMALE or OTHER"),

    body("dateOfBirth")
        .optional({ nullable: true })
        .isISO8601()
        .withMessage("Date of birth must be a valid date"),

    body("salary")
        .notEmpty()
        .withMessage("Salary is required")
        .isFloat({ min: 0 })
        .withMessage("Salary must be greater than or equal to 0"),

    body("joiningDate")
        .notEmpty()
        .withMessage("Joining date is required")
        .isISO8601()
        .withMessage("Joining date must be a valid date"),

    body("departmentId")
        .notEmpty()
        .withMessage("Department is required")
        .isInt({ min: 1 })
        .withMessage("Department Id must be a positive integer"),

    body("designationId")
        .notEmpty()
        .withMessage("Designation is required")
        .isInt({ min: 1 })
        .withMessage("Designation Id must be a positive integer"),

    body("managerId")
        .optional({ nullable: true })
        .isInt({ min: 1 })
        .withMessage("Manager Id must be a positive integer"),

    body("roleId")
        .notEmpty()
        .withMessage("Role is required")
        .isInt({ min: 1 })
        .withMessage("Role Id must be a positive integer")

];

module.exports = {
    createEmployeeValidation
};