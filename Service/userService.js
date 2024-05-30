const User = require("../model/user");
const bcrypt = require('bcrypt');

class UserService {
  static async getAllUsers() {
    try {
      const allUsers = await User.find();
      return allUsers;
    } catch (error) {
      console.log(`Could not fetch users: ${error}`);
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const cryptedPass = await bcrypt.hashSync(userData.password, bcrypt.genSaltSync(10));
      userData.password = cryptedPass;
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      console.log(`Could not create user: ${error}`);
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      console.log(`User not found: ${error}`);
      throw error;
    }
  }

  static async updateUser(userId, userData) {
    try {
      if (userData.password) {
        const cryptedPass = await bcrypt.hashSync(userData.password, bcrypt.genSaltSync(10));
        userData.password = cryptedPass;
      }
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
      return updatedUser;
    } catch (error) {
      console.log(`Could not update user: ${error}`);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      console.log(`Could not delete user: ${error}`);
      throw error;
    }
  }
}

module.exports = UserService;
