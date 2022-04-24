const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/authentication')
const User = require('../controllers/user');
// const authorization = require('../middlewares/authorization');

router.post('/register/member' , User.register)
router.get('/logout', User.logout);
router.post('/login', User.login);
router.post('/refreshToken', User.refreshToken);
router.post('/addPet', User.addPet);
router.post('/getFavoritePets', User.getFavoritePets);



module.exports = router;