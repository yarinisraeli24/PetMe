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
    return res.status(401).send("1 No such username or password")

  try{ 
    const user = await User.findOne({'username': username})
    if (!username)
      return res.status(401).send("2 No such username or password")

    const match = await bcrypt.compare(password, user.password);
    if(!match) 
    return res.status(401).send("No such username or password")
    
    const token = jwt.sign(user.data, config.JWT_SECRET);
    res.send(token);
    
  } catch (error) {
    res.send("Error:", error)
  }
};