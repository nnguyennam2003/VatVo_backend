import express from 'express'
import { config } from 'dotenv'
import routeAuth from './routes/auth.route.js';
import routeProduct from './routes/product.route.js';
import routeCart from './routes/cart.route.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';

config()

const app = express()
const PORT = process.env.PORT || 8001

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'https://vat-vo-shop.vercel.app'],
    credentials: true
}))

app.use('/api/auth', routeAuth)
app.use('/api/product', routeProduct)
app.use('/api/cart', routeCart)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectDB()
})