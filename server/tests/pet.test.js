const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose');
const User = require('../models/users')
const email = 'test@test.com';

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


describe('Testing Pet API',()=>{
    const username = 'test@test.com'
    const password = '1234'
    const firstName = 'test'
    const lastName = 'test'

    test('test registration',async ()=>{
        const response = await request(app).post('/users/register/member').send({
            username,
            password,
            firstName,
            lastName
        })
        expect(response.status).toEqual(200)
    })

    // test('test login',async ()=>{
    //     const response = await request(app).post('/users/login').send({
    //         'email' : email,
    //         'password':pwd
    //     })
    //     expect(response.statusCode).toEqual(200)
    // })

    // test('post get',async ()=>{
    //     const response = await request(app).get('/post').set({ authorization: 'JWT ' + accessToken })
    //     expect(response.statusCode).toEqual(200)
    // })

    // test('add new post',async ()=>{
    //     const response = await request(app).post('/post').set({ authorization: 'JWT ' + accessToken })
    //     .send({
    //         'message' : postMessage,
    //         'sender' : sender
    //     })
    //     expect(response.statusCode).toEqual(200)
    //     const newPost = response.body
    //     expect(newPost.message).toEqual(postMessage)
        
    //     const response2 = await request(app).get('/post/' + newPost._id)
    //     .set({ authorization: 'JWT ' + accessToken })
    //     expect(response2.statusCode).toEqual(200)
    //     const post2 = response2.body
    //     expect(post2.message).toEqual(postMessage)
    // })
})