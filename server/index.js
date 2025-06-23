const express = require('express')
const env = require('dotenv')
const mongoose = require("mongoose")
const cookieparser = require('cookie-parser')
const cors = require("cors");
const userRouter = require('./Routes/userRoutes')
const blogRoutes = require('./Routes/blogRoutes')

env.config()
const app = express()

app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
    credentials: true
}))

app.use(cookieparser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/user', userRouter)
app.use('/post', blogRoutes)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to db');
}).catch(err => console.log(err));


app.get('/', (req,res)=>{
    res.send('app is running')
})

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
    
})