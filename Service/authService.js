const User = require("../model/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Roles = require("../model/role");

const router = express.Router();
module.exports = class authService {
  static async registerExposant(data) {
    try {
      const cryptedPass = await bcrypt.hashSync(
        data.password,
        bcrypt.genSaltSync(10)
      );
      const newUser = {
        FullName: data.FullName,
        email: data.email,
        photo: data.photo,
        password: cryptedPass,
        role: data.role,
        username: data.username,
        Phone: data.Phone,
      };

      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async userLogin(data, req, res) {
    // First Check if the username is in the database
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        message: "Username is not found. Invalid login credentials.",
        success: false,
      });
    }

    // That means user is existing and trying to signin fro the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      var token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "123564895",
        { expiresIn: "1h" }
      );

      let result = {
        _id: user._id,
        role: user.role,
        token: `${token}`,
      };

      return result;
    }
  }
};
