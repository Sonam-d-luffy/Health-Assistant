import express from 'express'
import Hospital from '../schema/hospitalSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Hospital Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, } = req.body
  try {
    const userExist = await Hospital.findOne({ email })
    if (userExist) {
      return res.status(400).json({ message: 'User already Exists' }) // ✅ add return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await Hospital.create({
      name,
      password: hashedPassword,
      email
    })

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    return res.status(201).json({ message: 'Signup successful', token, user: newUser }) // ✅ add return
  } catch (error) {
    return res.status(500).json({ message: error.message }) // ✅ send error.message
  }
})

// Hospital Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const userExist = await Hospital.findOne({ email })
    if (!userExist) {
      return res.status(400).json({ message: 'User does not exist' }) // ✅ add return
    }

    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' }) // ✅ add return
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    return res.status(200).json({ message: 'Login successful', token, userExist }) // ✅ add return
  } catch (error) {
    return res.status(500).json({ message: error.message }) // ✅ send error.message
  }
})

export default router
