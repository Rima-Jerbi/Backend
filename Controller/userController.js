const UserService = require("../Service/userService");

class UserController {
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createUser(req, res, next) {
    try {
      const newUser = await UserService.createUser(req.body, req.file);
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res, next) {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const updatedUser = await UserService.updateUser(userId, req.body, req.file);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      const deletedUser = await UserService.deleteUser(userId);
      res.json("user deleted");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
