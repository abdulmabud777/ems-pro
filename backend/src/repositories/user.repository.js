const pool = require("../config/db");

const findUserByEmail = async (email) => {

    const query = `
        SELECT id, email, password, role_id, is_active
        FROM users
        WHERE email = $1
    `;

    const result = await pool.query(query, [email]);

    return result.rows[0];
};

const createUser = async (client, userData) => {

    const query = `
        INSERT INTO users (
            email,
            password,
            role_id
        )
        VALUES ($1, $2, $3)
        RETURNING id, email, role_id, is_active;
    `;

    const values = [
        userData.email,
        userData.password,
        userData.roleId
    ];

    const result = await client.query(query, values);

    return result.rows[0];
};

const findUserById = async (id) => {

    const query = `
        SELECT id, email, role_id, is_active
        FROM users
        WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
};