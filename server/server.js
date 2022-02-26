const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const authorize = require('./middlewares/authorization')
const env = require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/user')
const config = require('./config');
const cors = require('cors');
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000/'
}));

app.use(bodyParser.urlencoded({extended:true, limit: '1mb'}));
app.use(bodyParser.json());
app.use('/users', users);


//mongo connection:
mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error=>{console.error(error)})
db.once('open', ()=>{console.log('connected to mongo!')})

app.get('/token', (req,res) => {
    const payload = {
        name: "roy",
        lastName: "nahmuka",
        status: "check",
    }
    const token = jwt.sign(payload, config.JWT_SECRET);
    res.send(token);
});

app.get('/', authorize(["user:readOnly"]), (req, res)=> {
    res.send('Check')
})

app.listen(port, () => {
    console.log(`app listening to port ${port}`)
});