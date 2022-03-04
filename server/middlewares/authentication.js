const config = require('../config');
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports = async (req, res, next) => {
  const {body: { 
    username, 
    password
  }} = req;

  if(!username || !password) 
    return res.status(401).send("No such username or password")

  try{ 
    const user = await User.findOne({'username': username})

    if (!(user || await bcrypt.compare(password, user.password))){
      return res.status(401).send("No such username or password")
    }
    
    const token = jwt.sign(user.data, config.JWT_SECRET, {expiresIn: "2h",});
    res.send(token);
    
  } catch (error) {
    res.send("Error:", error)
  }
  next()
};