const express = require('express')
const router = express.Router();
// const authenticate = require('../middlewares/authentication')
const User = require('../controllers/user');
// const authorization = require('../middlewares/authorization');

// router.use(authenticate)
// router.use(authorization)

/**
* @swagger
* tags:
*   name: User Api
*   description: All APIs related to User. 
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - username
*         - password
*         - data
*       properties:
*         username:
*           type: string
*           description: The user's name 
*         password:
*           type: string
*           description: The user's password
*         refreshToken:
*           type: string
*           description: The user's refreshtoken
*         data:
*           type: object
*           description: additional info about the user
*         pets:
*           type: mongoose.Schema.Types.ObjectId
*           description: pets the user liked
*       example:
*         username: 'PetMe120'
*         password: 'PetMe120!'
*         data: {}
*/





/**
* @swagger
* /user/addPet:
*   post:
*     summary: the user swipe right the pet (liked it)
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: swipe right
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post('/addPet', User.addPet);

/**
* @swagger
* /user/getFavoritePets:
*   post:
*     summary: the user wants to see hos favorites list
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: favorites list
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post('/getFavoritePets', User.getFavoritePets);

/**
* @swagger
* /user/getUserDetails':
*   get:
*     summary: get the user's details
*     tags: [User Api]
*     responses:
*       200:
*         description: user's details
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/User'
*/
router.get('/getUserDetails', User.getUserDetails);


/**
* @swagger
* /user/setUserDetails:
*   put:
*     summary: the user wants to update his profile
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: update profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.put('/setUserDetails', User.setUserDetails)


/**
* @swagger
* /user/userUpdate:
*   post:
*     summary: the user wants to update his profile
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: update profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post('/userUpdate', User.userUpdate);

/**
* @swagger
* /user/getSimilarPets:
*   post:
*     summary: For the algorithm usage - show relevant pets for the user
*     tags: [User Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: relevant pets
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post('/getSimilarPets',User.getSimilarPets);



module.exports = router;