import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (employeeId, password) {
  const user = await this.findOne({ employeeId });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user
    }
    throw Error("incorrect password");
  }
  throw Error("user not found");
};

const User = mongoose.model("user", userSchema);
export default User;
