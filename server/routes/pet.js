const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/authentication')
const Pet = require('../controllers/pet');
const authorization = require('../middlewares/authorization');
const { route } = require('./user');

router.get('/getAllPets' ,authenticate, Pet.getAllPets);
router.post('/addImages', Pet.addImages);
router.post('/createPet', Pet.createPet)
router.post('/takeMeHome', Pet.takeMeHome)


module.exports = router;