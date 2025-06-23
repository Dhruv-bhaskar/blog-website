const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [3, 'invalid input']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minLength: [3, 'invalid input']
    },
    password:{
        type: String,
        required: true,
        minLength: [5, 'invalid input']
    },
})

module.exports = mongoose.model('User', userSchema)