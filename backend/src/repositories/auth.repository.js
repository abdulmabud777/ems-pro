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
      email,
      password,
      role_id
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      email,
      role_id,
      created_at;
  `;

  const values = [
    userData.email,
    userData.password,
    userData.roleId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const findUserForLogin = async (email) => {
  const query = `
    SELECT
      id,
      email,
      password,
      role_id
    FROM users
    WHERE email = $1;
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  findRoleByName,
  createUser,
  findUserForLogin
};