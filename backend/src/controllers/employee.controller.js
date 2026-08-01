const employeeService = require("../services/employee.service");
const asyncHandler = require("../utils/asyncHandler");

const createEmployee = asyncHandler(async (req, res) => {
    const employee = await employeeService.createEmployee(req.body);

    res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
    });
});

module.exports = {
    createEmployee,
};