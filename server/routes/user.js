const express = require('express')
const router = express.Router();
// const authenticate = require('../middlewares/authentication')
const User = require('../controllers/user');
// const authorization = require('../middlewares/authorization');

// router.use(authenticate)
// router.use(authorization)

router.post('/addPet', User.addPet);
router.post('/getFavoritePets', User.getFavoritePets);
router.get('/getUserDetails', User.getUserDetails);
router.post('/userUpdate', User.userUpdate);




module.exports = router;