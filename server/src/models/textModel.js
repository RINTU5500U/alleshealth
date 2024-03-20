const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: { 
        type: String,
        default: new Date().toLocaleString()
    }
});


module.exports = mongoose.model('Text', textSchema) 


