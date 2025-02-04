import cloudinary from '../lib/cloudinary.js';
import Product from '../model/product.model.js';

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve projects', error: error.message });
    }
}

export const addNewProduct = async (req, res) => {
    const { name, new_price, old_price, image, version } = req.body

    try {
        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newProduct = new Product({
            name,
            new_price,
            old_price,
            image: imageUrl,
            version
        })

        if (newProduct) {
            await newProduct.save()

            res.status(201).json({
                _id: newProduct._id,
                name: newProduct.name,
                url_demo: newProduct.new_price,
                url_git: newProduct.old_price,
                image: newProduct.image,
                version: newProduct.version
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        console.log("Error in add project controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getProductById = async (req, res) => {
    const { productId } = req.params

    try {
        const product = await Product.findById(productId)
        if (!product) {
            res.status(404).json({ message: 'product not found' })
        }

        res.status(200).json(product)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to get product', error: error.message })
    }
}