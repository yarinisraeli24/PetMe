const config = require('../config');
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1]

  if(!token) return res.sendStatus('401')
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if(error) return res.status(401).send(error.message)
    req.user = user;
    next()
  })
};