const bcrypt = require("bcrypt");

const pool = require("../config/db");

const AppError = require("../utils/AppError");

const userRepository = require("../repositories/user.repository");
const employeeRepository = require("../repositories/employee.repository");

const createEmployee = async (employeeData) => {

    // Check email already exists
    const existingUser = await userRepository.findUserByEmail(
        employeeData.email
    );

    if (existingUser) {
        throw new AppError("Email already exists", 400);
    }

    // Temporary Password
    const temporaryPassword =
        process.env.DEFAULT_PASSWORD || "Welcome@123";

    // Hash Password
    const hashedPassword = await bcrypt.hash(
        temporaryPassword,
        10
    );

    // Get Transaction Connection
    const client = await pool.connect();

    try {

        // Start Transaction
        await client.query("BEGIN");

        // Create User
        const user = await userRepository.createUser(
            client,
            {
                email: employeeData.email,
                password: hashedPassword,
                roleId: employeeData.roleId
            }
        );

        // Create Employee
        const employee =
            await employeeRepository.createEmployee(
                client,
                {
                    userId: user.id,

                    employeeCode: employeeData.employeeCode,

                    firstName: employeeData.firstName,

                    lastName: employeeData.lastName,

                    phone: employeeData.phone,

                    gender: employeeData.gender,

                    dateOfBirth: employeeData.dateOfBirth,

                    salary: employeeData.salary,

                    joiningDate: employeeData.joiningDate,

                    departmentId: employeeData.departmentId,

                    designationId: employeeData.designationId,

                    managerId: employeeData.managerId
                }
            );

        // Commit Transaction
        await client.query("COMMIT");

        return employee;

    } catch (error) {

        // Rollback Transaction
        await client.query("ROLLBACK");

        throw error;

    } finally {

        // Release Connection
        client.release();

    }
};

module.exports = {
    createEmployee
};