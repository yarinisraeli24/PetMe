const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/authentication')
const Pet = require('../controllers/pet');
const authorization = require('../middlewares/authorization');
const { route } = require('./user');

/**
* @swagger
* tags:
*   name: Pet Api
*   description: All APIs related to Pet. 
*/

/**
* @swagger
* components:
*   schemas:
*     Pet:
*       type: object
*       required:
*         - Id
*         - petKind
*         - age
*         - association
*         - associationId
*         - color
*         - gender
*         - size
*         - description
*       properties:
*         petKind:
*           type: string
*           description: The pet kind (ca/dog/other..) 
*         name:
*           type: string
*           description: The pet's name
*         age:
*           type: string
*           description: The pet's age
*         association:
*           type: string
*           description: The pet's owner assosiation name
*         associationId:
*           type: string
*           description: The pet's owner assosiation id
*         color:
*           type: string
*           description: The pet's color
*         breed:
*           type: string
*           description: The pet's breed
*         gender:
*           type: string
*           description: The pet's gender
*         size:
*           type: string
*           description: The pet's size
*         preference:
*           type: string
*           description: The pet's preferences
*         images:
*           type: string
*           description: image of the pet
*         description:
*           type: string
*           description: Afew words to describe the pet
*         moreInfo:
*           type: string
*           description: more information about the pet
*       example:
*         message: 'this is swagger test message'
*         petKind: 'cat'
*         age: '2'
*         association: 'Dogs of the north'
*         associationId: '12345'
*         color: 'gray'
*         gender: 'female'
*         size: 'small'
*         description: 'cute small cat'
*/


/**
* @swagger
* /pet/getAllPets:
*   get:
*     summary: get all pets
*     tags: [Pet Api]
*     responses:
*       200:
*         description: pet list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Pet'
*/
router.get('/getAllPets' ,authenticate, Pet.getAllPets);

/**
* @swagger
* /pet/addImages:
*   post:
*     summary: add image for new pet (for admins)
*     tags: [Pet Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Pet'
*     responses:
*       200:
*         description: add the image
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Pet'
*/
router.post('/addImages', Pet.addImages);

/**
* @swagger
* /pet/createPet:
*   post:
*     summary: add new pet (for admins)
*     tags: [Pet Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Pet'
*     responses:
*       200:
*         description: add the pet
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Pet'
*/
router.post('/createPet', Pet.createPet)

/**
* @swagger
* /pet/takeMeHome:
*   get:
*     summary: the user wants to adopt the pet
*     tags: [Pet Api]
*     responses:
*       200:
*         description: the user wants to adopt the pet
*         content:
*           application/json:
*             schema:
*               type: object
*               items:
*                 $ref: '#/components/schemas/Pet'
*/
router.get('/takeMeHome', Pet.takeMeHome)


module.exports = router;