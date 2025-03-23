import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                name: String,
                version: {
                    type: String,
                    enum: ["plus", "ultra", "standard"]
                },
                size: {
                    type: String,
                    required: true
                },
                price: Number,
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],
        shippingInfo: {
            fullName: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            address: { type: String, required: true }
        },
        paymentMethod: {
            type: String,
            enum: ["cod", "paypal"],
            required: true
        },
        paymentIntentId: { type: String },
        paymentStatus: {
            type: String,
            enum: ["pending", "succeeded", "failed"],
            default: "pending"
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending"
        }
    },
    { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order