const express = require('express')
const app = express();
const port = 3000;
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/user')


app.use(bodyParser.urlencoded({extended:true, limit: '1mb'}));
app.use(bodyParser.json());
app.use('/users', users);


//mongo connection:
mongoose.connect('mongodb://localhost:27017',{useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error=>{console.error(error)})
db.once('open', ()=>{console.log('connected to mongo!')})

app.get('/', (req,res) => {
    res.send('Helllloooooo')
});

app.listen(port, () => {
    console.log(`app listening to port ${port}`)
});