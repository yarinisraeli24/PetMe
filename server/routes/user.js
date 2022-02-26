const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/authentication')
const User = require('../controllers/user')
// router.get('/', User.getUsers)
// router.post('/', User.addUsers)

router.post('/register/member' , User.register)
router.post('/login', authenticate, User.login);
module.exports = router;