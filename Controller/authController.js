const UserService = require("../Service/authService");
const Roles = require("../model/role");

module.exports = class User {
  static async apiCreateUser(req, res, next) {
    try {
      const user = {};
      user.name = req.body.name;
      user.email = req.body.email;
      user.photo = req.file ? `/uploads/${req.file.filename}` : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png";
      user.password = req.body.password;
      user.role = req.body.role;
      user.username = req.body.username;
      const createdUser = await UserService.registerExposant(user);

      if (user.role === Roles.user) {
        res.status(201).json(createdUser);
      } else if (user.role === Roles.admin) {
        res.status(201).json(createdUser);
      } else {
        res.status(201).json(createdUser);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiLoginUser(req, res, next) {
    const user = {};
    user.email = req.body.email;
    user.password = req.body.password;
    const LoginUser = await UserService.userLogin(user);
    res.status(201).json(LoginUser);
  }
};
