import express from "express";
import {getProductDetails,createProductDetails} from '../controllers/productDetailsController.js';
const router = express.Router();

//import { createProductDetails } from "../controllers/productDetailsController";



router.get("/", getProductDetails);
router.post("/",createProductDetails);


export default router;
