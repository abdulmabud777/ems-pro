const pool = require("../config/db");

/**
 * Find user by email
 */
const findUserByEmail = async (email) => {
  const query = `
    SELECT id, email
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

/**
 * Find role by role name
 */
const findRoleByName = async (roleName) => {
  const query = `
    SELECT id, name
    FROM roles
    WHERE name = $1;
  `;

  const result = await pool.query(query, [roleName]);

  return result.rows[0];
};

/**
 * Create new user
 */
const createUser = async (userData) => {
  const query = `
    INSERT INTO users
    (
      first_name,
      last_name,
      email,
      password,
      role_id
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      first_name,
      last_name,
      email,
      role_id,
      created_at;
  `;

  const values = [
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.password,
    userData.roleId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findRoleByName,
  createUser,
};