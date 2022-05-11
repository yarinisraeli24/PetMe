const mongoose = require('mongoose');

const takeMeHomeScheme = new mongoose.Schema({
    petId:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    associationId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('TakeMeHome',takeMeHomeScheme)
