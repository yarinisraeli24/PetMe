const express = require('express')
const router = express.Router();
const Admin = require('../controllers/admin')
// const authenticate = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization');

// router.use(authenticate)
// router.use(authorization)
router.post('/createPet', Admin.createPet)
router.get('/getAllPets', Admin.getAllPets)
router.get('/getAllTakeMeHome', Admin.getAllTakeMeHome) 
router.get('/removeTakeMeHome', Admin.removeTakeMeHome)
router.get('/getBiEvents', Admin.getBiEvents)

module.exports = router;