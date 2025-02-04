import express from "express";
import { addToCart, getCart, removeToCart, updateCartQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.get("/list-cart/:userId", getCart);
router.post("/remove-cart", removeToCart);
router.put("/update-cart-quantity", updateCartQuantity);

export default router;