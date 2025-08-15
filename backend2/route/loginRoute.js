import express from 'express'
import User from '../schema/loginSchema.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken' 

const router = express.Router()


router.post('/signup' , async(req , res) => {
      
    const {name , email , password } = req.body
    try {
        const userExist = await User.findOne({email})
    if(userExist) {
        return res.status(400).json({message : 'User already Exists'})
    }
    const hashedPassword = await bcrypt.hash(password , 10)
    const newUser = await User.create({
        name,
        password : hashedPassword,
        email,

    })

    const token = jwt.sign({userId : newUser._id} , process.env.JWT_SECRET , {expiresIn: '7d'})

    return res.status(201).json({message : 'Signup successful' , token , user: {
           _id: newUser._id,
                name: newUser.name,
                email: newUser.email
    }})
    } catch (error) {
       return res.status(500).json({message : error})
    }
   
})

router.post('/login' , async(req , res) => {
    const {email , password} = req.body

    try {
    const userExist = await User.findOne({email})
    if(!userExist){
       return res.status(400).json({message: 'user does not exist'})
    }
    const isMatch = await bcrypt.compare(password , userExist.password)
    if(!isMatch){
       return res.status(400).json({message : 'Invalid password'})
    }
    const token = jwt.sign({userId : userExist._id}, process.env.JWT_SECRET , {expiresIn: '1h'})
    return res.status(201).json({message : 'login successful' , token , user:{
             _id: userExist._id,
                name: userExist.name,
                email: userExist.email
    }})
    } catch (error) {
      return  res.status(500).json({message : error})
    }

})

export default router
