
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
    }

})
module.exports = mongoose.model('User',usersScheme)