import { Router } from "express";
import { empLogin, empSignUp } from "../controllers/userController.js";

const router = Router();
console.log('router reached')
router.post("/signup", empSignUp);
router.post("/login", empLogin);

export default router;
