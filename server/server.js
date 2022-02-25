const express = require('express')
const app = express();
const port = process.env.PORT;
const dotenv = require("dotenv").config();


app.get('/', (req,res) => {
    res.send('Helllloooooo')
});

app.listen(port, () => {
    console.log(`app listening to port ${port}`)
});