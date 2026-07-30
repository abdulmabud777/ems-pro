const authorize = (allowedRoles) => {
  return (req, res, next) => {

    if (!allowedRoles.includes(req.user.roleId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    next();
  };
};

module.exports = {
  authorize,
};