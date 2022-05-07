

const User = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcryptjs')
const Pet = require('../models/pets')
const pets = require('../models/pets')
const TakeMeHome = require('../models/takeMeHome')
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

const createPet = (req, res, next) => {
    const {name, age, color, breed, kind, gender,size, images} = req.body;
    const pet = Pet({association: 'test', description: 'test', name, age, color, breed, petKind: kind, gender,size, images})
    pet.save();
}

const takeMeHome = (req, res, next) => {
    console.log(req.query)
    const {petId, associationId, userId} = req.query;
    const takeMeHome = TakeMeHome({petId, associationId, userId})
    if(!takeMeHome) res.status(403)
    takeMeHome.save();
    res.status(200);
}

module.exports = {
    getAllPets,
    addImages,
    createPet,
    takeMeHome,
}
