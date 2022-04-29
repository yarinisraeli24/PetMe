

const User = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const Pet = require('../models/pets')
const pets = require('../models/pets')
const Image = require('../models/image')


const getAllPets = (req, res, next) => {
     Pet.find({}, (error, pets)=>{ 
        res.send(pets)

    });
}

const addImages = async (req, res, next) => {
    const image = new Image(req.body);
    try {
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        
    }
}

module.exports = {
    getAllPets,
    addImages,
}
