

const User = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const Pet = require('../models/pets')
const pets = require('../models/pets')

const getAllPets = (req, res, next) => {
     Pet.find({}, (error, pets)=>{ 
        res.send(pets)

    });
}

module.exports = {
    getAllPets,
}
