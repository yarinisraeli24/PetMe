
const mongoose = require('mongoose')

const usersScheme = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    data: {
        type: Object,
        required: true
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',

    }],
    viewedPets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',

    }]

})
module.exports = mongoose.model('User',usersScheme)