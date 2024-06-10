const User = require("../model/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authService {
  static async registerExposant(data) {
    try {
      // Vérifiez si l'email existe déjà
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const cryptedPass = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
      const newUser = {
        FullName: data.FullName,
        email: data.email,
        photo: data.photo,
        password: cryptedPass,
        role: data.role,
        username: data.username,
        Phone: data.Phone,
        serialNumber: data.serialNumber, // Ajoutez ce champ
      };

      const response = await new User(newUser).save();
      return response;
    } catch (error) {
      console.error("Error in registerExposant:", error);
      throw error;
    }
  }

  static async userLogin(data) {
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        throw new Error("Username is not found. Invalid login credentials.");
      }

      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new Error("Incorrect password.");
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.FullName,
          email: user.email,
          role: user.role,
        },
        "123564895",
        { expiresIn: "1h" }
      );

      return {
        _id: user._id,
        role: user.role,
        token: `${token}`,
      };
    } catch (error) {
      console.error("Error in userLogin:", error);
      throw error;
    }
  }
}

module.exports = authService;
