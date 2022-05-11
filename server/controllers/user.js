
const User = require('../models/users')
const Pet = require('../models/pets')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { mongo } = require('mongoose')

const login = async (req, res, next) => {
    const {body: { 
        username, 
        password
        }} = req;
    if(!username || !password) 
    return res.status(401).send("No such username or password")

    try{ 
    const user = await User.findOne({'username': username})
    if (!(user || await bcrypt.compare(password, user.password))){
        return res.status(401).send("No such username or password")
    }

    const data = {id: user._id, ...user.data}
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRATION});
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
    
    if(!user.refreshToken) {
        user.refreshToken = refreshToken
    }
    await user.save();

    res.send({accessToken, refreshToken, data});
    
    } catch (error) {
    res.send("Error:", error)
    }
}
const logout = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];
    if(!token) return res.sendStatus('401');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if(error) return res.status(403).send(error.message);
        const userId = user.id;
        try {
            user = await User.findById(userId);
            if(!user) return res.status(403).send('invalid request');
            user.refreshToken = '';
            await user.save();
            res.status(200).send();
        }catch (error) {
            res.status(403).send(error.message);
        }
    })
}

const register = async (req, res, next) => {
    const {body: { 
        isAdmin,
        association,
        username,
        firstName,
        lastName,
        password
    }} = req;
    if(!username || !password){
        return res.status(400).send("All the inputs are required")
    }
    if(isAdmin && !association)
        return res.status(400).send("All the inputs are required")
    if(!isAdmin && (!firstName || !lastName))
        return res.status(400).send("All the inputs are required")
    const isUserExists = await User.findOne({username})
    if(isUserExists){
        return res.status(409).send("Username Already Exist.")
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    let data = {
        createdData: new Date(),
        email: username,
    }

    data = isAdmin? {...data, association, permissions: 'admin'} : {...data, firstName,lastName , permissions: 'user'}
    const user = User({
        username,
        password: encryptedPassword,
        data
    })
    user.save()
    return res.status(200).send('')
    
}

const refreshToken = async  (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];
    if(!token) return res.sendStatus('401');

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(403).send(error.message);
        const userId = user.id;
        
        try{
            user = await User.findById(userId);
            if(!user) return res.status(403).send('invalid request');
            if(!user.refreshToken){
                user.refreshToken = '';
                await user.save()
                return res.status(403).send('invalid request');
            }
        const userData = {...user.data, id: userId};
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.JWT_TOKEN_EXPIRATION});
        const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).send({accessToken, refreshToken, userData});
        }catch (error) {
            res.status(403).send(error.message);
        }
    })
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
const getUserDetails = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if(error) res.status(401).send('Invalid token')
        const userId = user.id;
        const userInfo = await User.findById(userId)
        const userData = userInfo.data;
        res.send({...userData, id: userId})
        
    })
}
const setUserDetails = async (req, res, next) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1];
    console.log(req)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, user) => {
        if(error) res.status(401).send('Invalid token')

    const {userFirstname,userLastname,userEmail } = req.body;
    const userId = user.id;
    const isUserExists = await User.findOne({userId})
    if(!isUserExists){
        return res.status(409).send("user not exist")
    }
    let userData = {...isUserExists.data,firstName:userFirstname,lastName:userLastname,email:userEmail};
    const filter = {_id: mongo.ObjectId(userId)}
    await User.findOneAndUpdate({filter}, {$set: {"data":userData}});

    res.status(200).send('Success')
    })
}
const userUpdate = async (req, res, next) => {
    const { body } = req;
    if(!body.userId || !body.payload){
        res.status(400).send('No such user or pet')
    }
    const filter = {_id: mongo.ObjectId(body.userId)}
    const user = await User.findOneAndUpdate(filter, {$set: {'data.preferences': body.payload}})
    if(!user){
        res.status(400).send('Failed to update user')
    }
    res.status(200).send('Success')
}


module.exports = {
    login,
    logout,
    refreshToken,
    register,
    addPet,
    getUserDetails,
    getFavoritePets,
    setUserDetails,
    userUpdate,
}
