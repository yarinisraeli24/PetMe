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
const authorization = require('./middlewares/authorization');
const init = require('./common/init')
const Pet = require('./models/pets')
const port = process.env.PORT || 5000;
const User = require('./controllers/user');
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors({
    origin: 'https://petme1200.herokuapp.com/'
}));

if (process.env.NODE_ENV == "development") {
    const swaggerUI = require("swagger-ui-express")
    const swaggerJsDoc = require("swagger-jsdoc")
    const options = {
    definition: {
    openapi: "3.0.0",
    info: {
    title: "Library API",
    version: "1.0.0",
    description: "A simple Express Library API",
    },
    servers: [{url: "http://localhost:3000",},],
    },
    apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/public/index.html'))
})
//mongo connection:
mongoose.connect('mongodb+srv://petme120:PetMe120!@cluster0.l1qui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true }, () => {console.log('mongo connected')})
const db = mongoose.connection
db.on('error', error=>{console.error(error)})

// algo.runAlgorithm()

module.exports = app
