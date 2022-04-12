const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
const authorize = require('./middlewares/authorization')
const env = require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/user')
const pets = require('./routes/pet')
const config = require('./config');
const cors = require('cors');
const authorization = require('./middlewares/authorization');
const init = require('./common/init')
const Pet = require('./models/pets')
const port = 5000;


app.use(cors({
    origin: 'http://localhost:3000/'
}));

// app.use(bodyParser.urlencoded({extended:true, limit: '1mb'}));
// app.use(bodyParser.json());
app.use(express.json({limit: "30mb",extended:true}));

app.use('/users', users);
app.use('/pets', pets);


app.use('/users/:id', authorization)

//mongo connection:
mongoose.connect('mongodb://localhost:27017',{ useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error=>{console.error(error)})
db.once('open', ()=>{
    init.map((pet) => {
       const newPet = Pet({...pet})
       newPet.save()
    })
    console.log('connected to mongo!')
})


app.listen(port, () => {
    console.log(`app listening to port ${port}`)
});