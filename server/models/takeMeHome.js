const mongoose = require('mongoose');

const takeMeHomeScheme = new mongoose.Schema({
    petId:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('TakeMeHome',takeMeHomeScheme)
