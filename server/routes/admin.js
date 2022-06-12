const express = require('express')
const router = express.Router();
const Admin = require('../controllers/admin')
// const authenticate = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization');

// router.use(authenticate)
// router.use(authorization)


/**
* @swagger
* tags:
*   name: Admin Api
*   description: All APIs related to Admin (Assosiations). 
*/

/**
* @swagger
* /admin/createPet:
*   post:
*     summary: the admin want to add a new pet
*     tags: [Admin Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Admin'
*     responses:
*       200:
*         description: add pet
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Admin'
*/
router.post('/createPet', Admin.createPet)

/**
* @swagger
* /admin/getAllPets:
*   get:
*     summary: get all pets related to this assosiation
*     tags: [Admin Api]
*     responses:
*       200:
*         description: pet list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Admin'
*/
router.get('/getAllPets', Admin.getAllPets)

/**
* @swagger
* /admin/getAllTakeMeHome:
*   get:
*     summary: get all users whoo are interested of pets
*     tags: [Admin Api]
*     responses:
*       200:
*         description: interested users list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Admin'
*/
router.get('/getAllTakeMeHome', Admin.getAllTakeMeHome) 

/**
* @swagger
* /admin/removeTakeMeHome:
*   get:
*     summary: revokes the take me home action the user did
*     tags: [Admin Api]
*     responses:
*       200:
*         description: cancel take me home
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Admin'
*/
router.get('/removeTakeMeHome', Admin.removeTakeMeHome)

/**
* @swagger
* /admin/getBiEvents:
*   get:
*     summary: get data for dashboards
*     tags: [Admin Api]
*     responses:
*       200:
*         description: data for dashboards
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Admin'
*/
router.get('/getBiEvents', Admin.getBiEvents)

module.exports = router;