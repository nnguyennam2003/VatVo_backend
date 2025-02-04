import { generateToken } from "../lib/util.js"
import User from "../model/user.model.js"
import bcrypt from 'bcryptjs'

export const registerWithEmail = async (req, res) => {
    const { email, fullName, phoneNumber, password } = req.body
    try {
        if (!email || !fullName || !phoneNumber || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "Email already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email: email,
            password: hashedPassword,
            profile: {
                fullName: fullName,
                phoneNumber: phoneNumber
            }
        })

        if (newUser) {
            await newUser.save()

            res.status(201).json({ message: "User registered successfully. Please log in." })
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const loginWithEmail = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user._id)

        res.status(200).json({
            _id: user._id,
            token: token,
            fullName: user.profile.fullName,
            role: user.role,
            message: "Login successfully"
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

