import express from 'express';
import { getAllProduct, addNewProduct, getProductById } from '../controllers/product.controller.js';

const route = express.Router()

route.get('/', (req, res) => {
    res.send('Get Success')
})
route.get('/products', getAllProduct)
route.post('/add-product', addNewProduct)
route.get('/productDetail/:productId', getProductById)
 
export default route