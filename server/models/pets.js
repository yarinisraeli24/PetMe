const mongoose = require('mongoose');

const petScheme = new mongoose.Schema({
    petKind:{
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    age:{
        type: String,
        required: true
    },
    association: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    breed: {
        type: String,
    },
    gender: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    preference: {
        type: String,
    },
    images: [{
        title:  String,
        image:  String
    }],
    description: {
        type: String,
        required: true,
    },
    moreInfo: {
        type: String,
    }
})

module.exports = mongoose.model('Pet',petScheme)
