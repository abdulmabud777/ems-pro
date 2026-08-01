const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const register = async (userData) => {
  // 1. Check if email already exists
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new AppError(
        "Email already exists",
        409
    );
  }

  // 2. Get ADMIN role
  const adminRole = await authRepository.findRoleByName("ADMIN");

  if (!adminRole) {
    throw new AppError(
        "Admin role not found",
        404
    );
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // 4. Create user
  const newUser = await authRepository.createUser({
    ...userData,
    password: hashedPassword,
    roleId: adminRole.id,
  });

  return newUser;
};

const login = async (loginData) => {

  const user = await authRepository.findUserForLogin(loginData.email);

  if (!user) {
    throw new AppError(
        "Invalid email or password",
        401
    );
  }

  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError(
        "Invalid email or password",
        401
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      roleId: user.role_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    accessToken: token,
  };
};

module.exports = {
  register,
  login,
};