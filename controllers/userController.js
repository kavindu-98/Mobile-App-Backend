import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { createToken } from "./utils/generateToken.js";

const MAX_AGE = 3 * 24 * 60 * 60;
export const empSignUp = expressAsyncHandler(async (req, res, next) => {
  try {
    const { FirstName, LastName, email, phone,NIC,employeeId,password, gender } = req.body;
    const user = new User({FirstName, LastName, email, phone,NIC, employeeId, password, gender });
    await user.save();
    res
      .status(201)
      .json(  "User successfully created");
  } catch (error) {
    res.status(400).json({ error: "user not created" });
  
  }
});

export const empLogin = expressAsyncHandler(async (req, res, next) => {
  const { employeeId, password } = req.body;

  try {
    console.log('Reached')
    const user = await User.login(employeeId, password);
    console.log('Reached2')
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({...user._doc,password:''} );
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "cannot login"+err });
   
  }
});
