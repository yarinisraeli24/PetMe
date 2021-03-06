const User = require('../models/users')
const Pet = require('../models/pets')
const BI = require('../models/bi')
const TakeMeHome = require('../models/takeMeHome')
const jwt = require('jsonwebtoken')
const {getNumberOfLikes, getMaleFemaleRatio} = require('../common/utils');
const { mongo } = require('mongoose')

const createPet = async (req, res, next) => {
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
        const filter = {_id: mongo.ObjectId(associationId)}
        const user = await User.findOneAndUpdate(filter, {$push: update})
        pet.save();
        res.send(pet)
    });
}

const getAllPets = async (req, res, next) => {
    const id = req.query.id;
    User.findById(id, async (error, associationData) => {
        if(error) res.status(403)
        const pets = await Pet.find({_id: associationData.pets})
        res.send(pets)
    });
}

const getAllTakeMeHome = async (req, res, next) => {
    const {associationId} = req.query;
    TakeMeHome.find({associationId: associationId}, async (error,takeMeHomeList) => {
        if(error) res.status(403).send(error);
        const requestsDataList = await Promise.all(takeMeHomeList.map(async request => {
            const petData = await Pet.findById(request.petId);
            const user = await User.findById(request.userId);
            const userData = user.data;
            return {requestId: request._id, petData, userData}
        }));
        res.send(requestsDataList)
    })
}

const removeTakeMeHome = async (req, res, next ) => {
    const {requestId} = req.query
    TakeMeHome.findOneAndRemove({_id: requestId}, (error,data) => {
        if(error) res.status(403).send('Not Found')
        res.status(200);
    });
}

const getBiEvents = async  (req, res, next ) => {
    const day = 24*60*60*1000;
    const {associationId, eventType, withUsersData, withPetsData} = req.query;
    const bis = await BI.find({type: eventType, associationId: associationId})
    if(!bis.length) res.status(501).send('There is no event for this user');
    let returnedData = {}
    let typeData = [];
    const now = Date.now();
    for(let i = 0; i < 7; i++){
        typeData[i] = getNumberOfLikes(bis, now - (i+2)*day, now - (i+1)*day)
    }
    typeData.reverse();
    returnedData = {typeData};
    console.log(withUsersData)
    if(!!withUsersData){
        let usersIds;
        bis.forEach(bi => usersIds = {...usersIds, _id: bi.userId});
        const usersData = await User.find(usersIds);
        const ratio = getMaleFemaleRatio(usersData)
        returnedData = {...returnedData, ratio};
    }
    res.send(returnedData);
}
    module.exports = {
    removeTakeMeHome,
    getAllTakeMeHome,
    createPet,
    getAllPets,
    getBiEvents,
}
