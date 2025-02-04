import express from 'express';
import { loginWithEmail, registerWithEmail } from '../controllers/auth.controller.js';

const route = express.Router()

route.get('/', (req, res) => {
    res.send('Get Success')
})
route.post('/login', loginWithEmail)
route.post('/register', registerWithEmail)

export default route