
const { v4: uuidv4 } = require('uuid');
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config')

const login = async (req, res, next) => {
    res.send(token);
}
const register = async (req, res, next) => {
    const {body: { 
        email,
        firstName,
        lastName,
        password
    }} = req;
    const id = uuidv4();
    const data = {
        createdData: new Date(),
        firstName,
        lastName,
        permissions: "user",
        email,
        id
    }

    const user = User({
        username: email,
        password,
        id,
        data
    })

    user.save()
    res.status(200)
}

module.exports = {
    login,
    register
}
