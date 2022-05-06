const app = require('../server')
const request = require('supertest')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/users');
const { exists } = require('../models/users');
const { petDataMock } = require('./mockData');

const email = 'test@test.com';
const username = 'test@test.com'
const password = '1234'
const firstName = 'test'
const lastName = 'test'
let accessToken;
let data = {};

beforeAll(done=>{
    User.remove({'email' : email}, (err)=>{
        done()
    })
})

afterAll(done=>{
    User.remove({'email' : email}, (err)=>{
        mongoose.connection.close()
        done()
    })
})


describe('Authentication check ',()=>{

    test('Register new user',async ()=>{
        const response = await request(app).post('/users/register/member').send({
            username,
            password,
            firstName,
            lastName
        })
        expect(response.status).toEqual(200)
    })

    test('Check authentication',async ()=>{
        const response = await request(app).post('/users/login').send({
            username,
            password,
        })
        data = response._body.data;
        expect(response.status).toEqual(200)
    })

    test('accessToken should be expired',async ()=>{
        accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1'});
        const response = await request(app).get('/pets/getAllPets').set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toEqual(401)
    })

    test('Should generate new RefreshToken and AccessToken',async ()=>{
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
        const response = await request(app).get('/users/refreshToken').set('Authorization', `Bearer ${refreshToken}`)
        accessToken = response._body.accessToken;
        expect(response.status).toEqual(200)
    })


    test('Logout should remove refreshToken from mongo',async ()=>{
        await request(app).get('/users/logout').set('Authorization', `Bearer ${accessToken}`)
        User.findById(data.id, (error, userInfo) => {
            if(!error){
                expect(userInfo.refreshToken).toEqual("");
            }
        })
    })

    test('Add pet to user', async () => {
        const response = await request(app).post('/users/addPet').send({userId: data.id, petId: petDataMock._id}).set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toEqual(200)
    })

    test('Expect user pet to be equal the petDataMock', async () => {
        accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1'});
        const response = await request(app).post('/users/getFavoritePets').send({userId: data.id}).set('Authorization', `Bearer ${accessToken}`)
        expect(response._body[0]).toEqual(petDataMock)
    })

    test('Should get a pet', async () => {
        accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1'});
        const response = await request(app).get('/pets/getPet').send({id: petDataMock._id}).set('Authorization', `Bearer ${accessToken}`)
        expect(response.status).toEqual(200)
    })
})
