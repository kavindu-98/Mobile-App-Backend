import Driver from "../models/Driver.js";
import { createToken } from "./utils/generateToken.js";

import expressAsyncHandler from "express-async-handler";
const MAX_AGE = 3 * 24 * 60 * 60;

export const driverSignUp = expressAsyncHandler(async (req, res, next) => {
  try {
    const { FirstName, LastName, email, phone,NIC,employeeId,password, gender } = req.body;
    const driver = new Driver({FirstName, LastName, email, phone,NIC, employeeId, password, gender });
    await driver.save();
    res
      .status(201)
      .json('Driver created Successfully');
  } catch (error) {
    res.status(400).json({ error: "driver not created" });
   
  }
});


export const driverLogin =expressAsyncHandler( async (req, res, next) => {
  const { driverId, password } = req.body;

  try {
    const driver = await Driver.login(driverId, password);
    const token = createToken(driver._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json(driver );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot login" });
    
  }
});
