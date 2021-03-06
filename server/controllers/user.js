
const User = require('../models/users')
const Pet = require('../models/pets')
const BI = require('../models/bi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { mongo } = require('mongoose')
const { getAllPets } = require('./pet')
const ContentBasedRecommender = require('content-based-recommender')

const login = async (req, res, next) => {
    const { body: {
        username,
        password
    } } = req;
    if (!username || !password)
        return res.status(401).send("No such username or password")

    try {
        const user = await User.findOne({ 'username': username })
        if (!(user || await bcrypt.compare(password, user.password))) {
            return res.status(401).send("No such username or password")
        }

        const data = { id: user._id, ...user.data }
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });

        if (!user.refreshToken) {
            user.refreshToken = refreshToken
        }
        await user.save();

        res.send({ accessToken, refreshToken, data });

    } catch (error) {
        res.send("Error:", error)
    }
}
const logout = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) return res.sendStatus('401');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(403).send(error.message);
        const userId = user.id;
        try {
            user = await User.findById(userId);
            if (!user) return res.status(403).send('invalid request');
            user.refreshToken = '';
            await user.save();
            res.status(200).send();
        } catch (error) {
            res.status(403).send(error.message);
        }
    })
}

const register = async (req, res, next) => {
    const { body: {
        isAdmin,
        association,
        username,
        firstName,
        lastName,
        password
    } } = req;
    if (!username || !password) {
        return res.status(400).send("All the inputs are required")
    }
    if (isAdmin && !association)
        return res.status(400).send("All the inputs are required")
    if (!isAdmin && (!firstName || !lastName))
        return res.status(400).send("All the inputs are required")
    const isUserExists = await User.findOne({ username })
    if (isUserExists) {
        return res.status(409).send("Username Already Exist.")
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    let data = {
        createdData: new Date(),
        email: username,
    }

    data = isAdmin ? { ...data, association, permissions: 'admin' } : { ...data, firstName, lastName, permissions: 'user' }
    const user = User({
        username,
        password: encryptedPassword,
        data
    })
    user.save()
    return res.status(200).send('')

}

const refreshToken = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) return res.sendStatus('401');

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(403).send(error.message);
        const userId = user.id;

        try {
            user = await User.findById(userId);
            if (!user) return res.status(403).send('invalid request');
            if (!user.refreshToken) {
                user.refreshToken = '';
                await user.save()
                return res.status(403).send('invalid request');
            }
            const userData = { ...user.data, id: userId };
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_EXPIRATION });
            const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
            user.refreshToken = refreshToken;
            await user.save();
            res.status(200).send({ accessToken, refreshToken, userData });
        } catch (error) {
            res.status(403).send(error.message);
        }
    })
}
const addPet = async (req, res, next) => {
    const { body } = req;
    if (!body.userId || !body.petId) {
        res.status(400).send('No such user or pet')
    }
    const filter = { _id: mongo.ObjectId(body.userId) }
    const update = { pets: body.petId }
    const user = await User.findOneAndUpdate(filter, { $push: update })
    if (!user) {
        res.status(400).send('Failed on add pet')
    }
    const likedPet = await Pet.findById(body.petId);
    const Bi = BI({ type: 'Likes', userId: body.userId, petId: body.petId, associationId: likedPet.associationId })
    Bi.save();
    res.status(200).send('Success')
}
const addPetToViewed = async (req, res, next) => {
    const { body } = req;
    if (!body.userId || !body.petId) {
        res.status(400).send('No such user or pet')
    }
    const filter = { _id: mongo.ObjectId(body.userId) }
    const update = { viewedPets: body.petId }
    const user = await User.findOneAndUpdate(filter, { $push: update })
    if (!user) {
        res.status(400).send('Failed on add pet')
    }
    res.status(200).send('Success')
}
const getFavoritePets = async (req, res, next) => {
    const { body } = req;
    if (!body.userId) {
        res.status(400).send('No such user or pet')
    }
    const user = await User.findOne({ _id: body.userId })
    if (!user) {
        res.status(400).send('Cant find userId')
    }
    const userFavoritePets = await Pet.find({ _id: user.pets })
    res.send(userFavoritePets)
}
const getUserDetails = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) res.status(401).send('Invalid token')
        const userId = user.id;
        const userInfo = await User.findById(userId)
        const userData = userInfo.data;
        res.send({ ...userData, id: userId })

    })
}
const setUserDetails = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];
    console.log(req)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if (error) res.status(401).send('Invalid token')

        const { userFirstname, userLastname, userEmail } = req.body;
        const userId = user.id;
        const isUserExists = await User.findOne({ userId })
        if (!isUserExists) {
            return res.status(409).send("user not exist")
        }
        console.log(isUserExists.data)
        const filter = { _id: mongo.ObjectId(userId) }
        await User.findOneAndUpdate(filter, {
            $set: {
                "data.firstName": userFirstname,
                "data.lastName": userLastname,
                "data.email": userEmail,
            }
        });

        res.status(200).send('Success')
    })
}

const userUpdate = async (req, res, next) => {
    const { body } = req;
    if (!body.userId || !body.payload) {
        res.status(400).send('No such user or pet')
    }
    const filter = { _id: mongo.ObjectId(body.userId) }
    const user = await User.findOneAndUpdate(filter, { $set: { 'data.preferences': body.payload } })
    if (!user) {
        res.status(400).send('Failed to update user')
    }
    res.status(200).send('Success')
}
const getSimilarPets = async (req, res, next) => {
    const recommender = new ContentBasedRecommender({
        minScore: 0.02,
        maxSimilarDocuments: 30
    });
    const { body } = req;
    if (!body.userId) {
        res.status(400).send('No such user or pet')
    }
    const user = await User.findOne({ _id: body.userId })
    if (!user) {
        // res.status(400).send('Cant find userId')
    }
    var userFavoritePets, petsFavorites;
    var pets;
    if (!user.pets.length) {
        userFavoritePets = await Pet.find({});
        petsFavorites = await createPetsObject(userFavoritePets);
        pets = await Pet.find({});
    }
    else {
        userFavoritePets = await Pet.find({ _id: user.pets });
        petsFavorites = await createPetsObject(userFavoritePets);
        const petsId = (await Pet.find({ _id: user.viewedPets })).map(pet => pet._id);
        pets = await Pet.find({ _id: { $nin: petsId } });
    }
    const petsTrain=await createPetsObject(pets);
    recommender.train(petsTrain);
    const similarDocuments = recommender.getSimilarDocuments(petsTrain[0].id, 0, 8);
    const response=await findMatchingPets(similarDocuments);
    res.send(response);
}
const findMatchingPets = async (similarDocuments) => {
    const idList = similarDocuments.map(e => e.id);
    const pets = await Pet.find({ _id: { $in: idList } });
    return pets;
}
const createPetsObject = async (pets) => {
    let petObject = [];
    pets.forEach(pet => {
        const petJson = pet.age + " " + pet.petKind + " " + pet.color + " " + pet.breed + " " + pet.gender + " " + pet.size;
        petObject.push({ id: (pet._id).toString(), content: petJson });
    });
    return petObject;
}
module.exports = {
    login,
    logout,
    refreshToken,
    register,
    addPet,
    addPetToViewed,
    getUserDetails,
    getFavoritePets,
    setUserDetails,
    userUpdate,
    getSimilarPets,
}
