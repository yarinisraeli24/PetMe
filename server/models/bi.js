const mongoose = require('mongoose');
const biSchema = mongoose.Schema({
    type: String,
    associationId: String,
    userId: String,
    petId: String
},{ timestamps: true })


module.exports = mongoose.model('BI',biSchema)