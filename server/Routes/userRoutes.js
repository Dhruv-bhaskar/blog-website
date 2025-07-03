const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const createToken = require('../utils/jwt')
const authMiddleware = require('../middleware/authmiddleware')

router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body

    try{
        const oldUser = await User.findOne({email})
        if(oldUser)
            return res.status(400).json({
            message: 'Email already exists'
        })

        const hashpass = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashpass,

        })

        res.status(201).json({
            message: 'user registered',
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch(err){
        console.error("Registration error:", err);
        res.status(500).json({
            message: 'Registration failed'
        })
    }
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})

      if(!user)
         return res.status(400).json({
         message: "User not found" 
      })
       
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch)
        return res.status(400).json({
         message: "Invalid username or password" 
      })

       const token = createToken(user._id)
       res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
       })

       res.status(201).json({
        message: 'login succesfully',
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
       })
       
    }catch(err){
        console.error("login error:", err);
        res.status(500).json({
            message: 'Login failed'
        })
    }
})

router.get('/me', authMiddleware, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('username email')

        if(!user){
            res.status(404).json({
                message: 'user not found'
            })
        }
        res.status(200).json(user)
    }
    catch(err){
        console.error('error in /user/me', err)
        res.status(500).json({
            message: 'Unable to fetch user'
        })
    }
})

router.get('/logout', authMiddleware, (req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })

    res.status(200).json({
        message: 'Logged out'
    })
})

module.exports = router