import { Router } from "express";
import { driverLogin, driverSignUp } from "../controllers/driverController.js";

const router = Router();

router.post("/signup", driverSignUp);
router.post("/login", driverLogin);


export default router;
