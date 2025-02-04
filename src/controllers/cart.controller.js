import Product from "../model/product.model.js";
import User from "../model/user.model.js";

export const addToCart = async (req, res) => {
    const { userId, productId, size, quantity } = req.body;
    try {
        const user = await User.findById(userId).populate("cart.productId")

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const existingCartItem = user.cart.find(
            item => item.productId._id.toString() === productId && item.size === size
        );

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ productId, size, quantity });
        }

        await user.save();
        await user.populate("cart.productId")

        res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cart.map(item => ({
                _id: item._id,
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.new_price,
                image: item.productId.image,
                size: item.size,
                quantity: item.quantity
            }))
        });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate("cart.productId");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const sortedCart = user.cart.sort((a, b) => b._id.toString().localeCompare(a._id.toString()));

        res.status(200).json({
            cart: sortedCart.map(item => ({
                _id: item._id,
                productId: item.productId._id,
                name: item.productId.name,
                price: item.productId.new_price,
                image: item.productId.image,
                size: item.size,
                quantity: item.quantity
            }))
        });
        
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeToCart = async (req, res) => {
    const { userId, productId, size } = req.body;

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartItemIndex = user.cart.findIndex(
            item => item.productId.toString() === productId && item.size === size
        )
        if (cartItemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        user.cart.splice(cartItemIndex, 1);

        await user.save();

        res.status(200).json({
            message: "Product removed from cart successfully",
            cart: user.cart
        })

    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCartQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItem = user.cart.find(item => item.productId._id.toString() === productId);

        if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity) {
            cartItem.quantity = quantity
        }

        await user.save()

        res.status(200).json({
            message: "Cart updated successfully",
            cart: user.cart
        })
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};