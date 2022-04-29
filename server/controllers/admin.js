const User = require('../models/users')
const Pet = require('../models/pets')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { mongo } = require('mongoose')

const createPet = async (req, res, next) => {
    console.log(req.body)
    const {associationId, name, age, color, breed, kind, gender,size, images} = req.body;
    User.findById(associationId, async (error, associationData) => {
        if(error) res.status(403)
        const pet = Pet({
            associationId: associationId, 
            association: associationData.data.association ,
            description: 'test',
            name, 
            age, 
            color, 
            breed, 
            petKind: kind, 
            gender,
            size, 
            images
        })
        const update = {pets: pet._id}
        await User.findOneAndUpdate(associationId, {$push: update})
        pet.save();
        res.send(pet)
    });
}

const getAllPets = async (req, res, next) => {
    const id = req.query.id;
    console.log(id)
    User.findById(id, async (error, associationData) => {
        if(error) res.status(403)
        const pets = await Pet.find({_id: associationData.pets})
        res.send(pets)
    });
}


module.exports = {
    createPet,
    getAllPets,
}
