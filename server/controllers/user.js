
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')

const login = async (req, res, next) => {
    res.send(token);
}
const register = async (req, res, next) => {
    const {body: { 
        username,
        firstName,
        lastName,
        password
    }} = req;

    if(!username || !password || !firstName || !lastName){
        return res.status(400).send("All the inputs are required")
    }

    const isUserExists = await User.findOne({username})
    if(isUserExists){
        return res.status(409).send("Username Already Exist.")
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const data = {
        createdData: new Date(),
        firstName,
        lastName,
        permissions: "user",
        email: username,
    }

    const user = User({
        username,
        password: encryptedPassword,
        data
    })

    user.save()
    res.status(200)
}

module.exports = {
    login,
    register
}
