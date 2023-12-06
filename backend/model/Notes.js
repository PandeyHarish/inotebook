const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title:{
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: 'general'

    },
    date:{
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model('notes', notesSchema);
