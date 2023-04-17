import User from "../models/User.js";
import jwt from "jsonwebtoken";

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: MAX_AGE,
  });
};

export const signUp = async (req, res, next) => {

  // const user = new User({
  //   FirstName: req.body.FirstName,
  //   LastName: req.body.LastName,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   NIC: req.body.NIC,
  //   employeeId: req.body.employeeId,
  //   password: req.body.password,
  //   gender: req.body.gender
    
  // });
  // user.save((err, savedDocument) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).send('Error saving document');
  //   } else {
  //     res.send(savedDocument);
  //   }
  // });
  

  try {
    const { FirstName, LastName, email, phone,NIC,employeeId,password, gender } = req.body;
    const user = new User({FirstName, LastName, email, phone,NIC, employeeId, password, gender });
    await User.save();
    res
      .status(201)
      .json({ status: "success", user: user, token: createToken(user._id) });
  } catch (error) {
    res.status(400).json({ error: "user not created" });
    next();
  }
};

export const login = async (req, res, next) => {
  const { driverId, password } = req.body;

  try {
    const user = await User.login(driverId, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ status: "success", user: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot login" });
    next();
  }
};
