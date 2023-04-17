import mongoose from "mongoose";
import bcrypt from "bcrypt";

const driverSchema = new mongoose.Schema({
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
  driverId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  driverLNo: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

driverSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

driverSchema.statics.login = async function (driverId, password) {
  const driver = await this.findOne({ driverId });
  if (driver) {
    const auth = await bcrypt.compare(password, driver.password);
    if (auth) {
      return driver;
    }else{
    throw Error("incorrect password");
    }
  }
  throw Error("user not found");
};

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
