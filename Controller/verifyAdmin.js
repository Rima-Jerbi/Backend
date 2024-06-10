// Controller/verifyAdmin.js
const User = require('../model/user');

module.exports = {
  verify: async (req, res) => {
    try {
      const adminId = req.params.id;
      const user = await User.findById(adminId);
      if (!user) {
        return res.status(400).send("Invalid link");
      }

      if (user.role !== 'admin' || user.verified) {
        return res.status(400).send("Invalid or already verified user");
      }

      user.verified = true;
      await user.save();
      res.send("Admin verified successfully");
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
};
