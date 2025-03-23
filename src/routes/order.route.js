import express from "express";
import { checkoutOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/checkout", checkoutOrder);

export default router;