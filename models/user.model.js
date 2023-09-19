const mongoose = require("mongoose");
const { roles } = require("../utils/constants");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.moderator, roles.client],
    default: roles.client,
  },
});

// userSchema.pre("save", async function (next) {
//   try {
//     if (this.isNew) {
//       if (
//         this.email === (process.env.ADMIN_EMAIL).toLowerCase() ||
//         "admin@gmail.com"
//       ) {
//         this.role = roles.admin;
//       }
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const User = mongoose.model("user", userSchema);

module.exports = User;
