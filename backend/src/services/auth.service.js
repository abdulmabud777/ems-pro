const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");

const register = async (userData) => {
  // 1. Check if email already exists
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // 2. Get EMPLOYEE role
  const employeeRole = await authRepository.findRoleByName("EMPLOYEE");

  if (!employeeRole) {
    throw new Error("Employee role not found");
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // 4. Create user
  const newUser = await authRepository.createUser({
    ...userData,
    password: hashedPassword,
    roleId: employeeRole.id,
  });

  return newUser;
};

module.exports = {
  register,
};