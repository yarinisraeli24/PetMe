const express = require('express')
const router = express.Router();
// const authenticate = require('../middlewares/authentication')
const User = require('../controllers/user');
// const authorization = require('../middlewares/authorization');

// router.use(authenticate)
// router.use(authorization)


router.post('/register/member' , User.register)
router.get('/logout', User.logout);
router.get('/refreshToken', User.refreshToken);
router.post('/login', User.login);
router.post('/addPet', User.addPet);
router.post('/getFavoritePets', User.getFavoritePets);
router.get('/getUserDetails', User.getUserDetails);
router.put('/setUserDetails', User.setUserDetails)


module.exports = router;