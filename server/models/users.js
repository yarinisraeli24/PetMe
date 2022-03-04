
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
    data: {
        type: Object,
        required: true
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',

    }]

})
module.exports = mongoose.model('User',usersScheme)