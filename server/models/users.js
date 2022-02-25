
const mongoose = require('mongoose')

const usersScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('User',usersScheme)