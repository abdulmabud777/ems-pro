const createEmployee = async (client, employeeData) => {

    const query = `
        INSERT INTO employees (
            user_id,
            employee_code,
            first_name,
            last_name,
            phone,
            gender,
            date_of_birth,
            salary,
            joining_date,
            department_id,
            designation_id,
            manager_id
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12
        )
        RETURNING *;
    `;

    const values = [
        employeeData.userId,
        employeeData.employeeCode,
        employeeData.firstName,
        employeeData.lastName,
        employeeData.phone,
        employeeData.gender,
        employeeData.dateOfBirth,
        employeeData.salary,
        employeeData.joiningDate,
        employeeData.departmentId,
        employeeData.designationId,
        employeeData.managerId
    ];

    const result = await client.query(query, values);

    return result.rows[0];
};

module.exports = {
    createEmployee
};