
const User = require('../models/users')
const Pet = require('../models/pets')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const { mongo } = require('mongoose')


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
    return res.status(200).send('')
    
}
const addPet = async (req, res, next) => {
    const { body } = req;
    if(!body.userId || !body.petId){
        res.status(400).send('No such user or pet')
    }
    const filter = {_id: mongo.ObjectId(body.userId)}
    const update = {pets: body.petId}
    const user = await User.findOneAndUpdate(filter, {$push: update})

    if(!user){
        res.status(400).send('Failed on add pet')
    }
    res.status(200).send('Success')
}
const getFavoritePets = async (req, res, next) => {
    const { body } = req;
    if(!body.userId){
        res.status(400).send('No such user or pet')
    }
    const user = await User.findOne({_id: body.userId})
    if(!user){
        res.status(400).send('Cant find userId')
    }
    const userFavoritePets = await Pet.find({_id: user.pets})
    res.send(userFavoritePets)
}
module.exports = {
    login,
    register,
    addPet,
    getFavoritePets,
}
