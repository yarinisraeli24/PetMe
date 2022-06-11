const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const authorize = require('./middlewares/authorization')
var cookieParser = require('cookie-parser');
const env = require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/user')
const pets = require('./routes/pet')
const admin = require('./routes/admin')
const config = require('./config');
const cors = require('cors');
const authorization = require('./middlewares/authorization');s
const init = require('./common/init')
const Pet = require('./models/pets')
const port = process.env.PORT || 5000;
const User = require('./controllers/user');s
const algo = require('./algorithm')
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors({
    origin: 'http://localhost:3000/'
}));

// app.use(bodyParser.urlencoded({extended:true, limit: '1mb'}));
// app.use(bodyParser.json());
app.use(express.json({limit: "30mb",extended:true}));
app.use(cookieParser());

app.use('/users', users);
app.use('/admin', admin);
app.use('/pets', pets);


app.post('/register' , User.register)
app.post('/login', User.login);
app.get('/logout', User.logout);
app.get('/refreshToken', User.refreshToken);
//mongo connection:
mongoose.connect('mongodb+srv://petme120:PetMe120!@cluster0.l1qui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true }, () => {console.log('mongo connected')})
const db = mongoose.connection
db.on('error', error=>{console.error(error)})

// algo.runAlgorithm()

module.exports = app
