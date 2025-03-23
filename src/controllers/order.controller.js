import Order from "../model/order.model.js";

export const checkoutOrder = async (req, res) => {
    try {
        const { userId, items, shippingInfo, paymentMethod, totalPrice, status, paymentIntentId } = req.body;

        if (!userId || !items || items.length === 0 || !shippingInfo || !paymentMethod || !totalPrice) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin đơn hàng!" });
        }

        const newOrder = new Order({
            userId,
            items,
            shippingInfo,
            paymentMethod,
            paymentIntentId: paymentMethod === "paypal" ? paymentIntentId : null,
            paymentStatus: paymentMethod === "paypal" ? "succeeded" : "pending",
            totalPrice,
            status: status || "pending",
        });

        await newOrder.save();

        return res.status(201).json({ message: "Đơn hàng đã được tạo!", order: newOrder });
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi server khi tạo đơn hàng!" });
    }
};
