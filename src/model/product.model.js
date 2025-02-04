import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        new_price: {
            type: String,
            required: true,
        },
        old_price: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: ""
        },
        version: {
            type: String,
            enum: ['plus', 'ultra', 'standard'],
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product