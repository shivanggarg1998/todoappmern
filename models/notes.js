const mongoose = require('mongoose');


const NoteSchema = mongoose.Schema({
    note:{
        type : String,
        required : true
    },
    isDone:{
        type : Boolean,
        required : true
    },
    
    

});


const Note = module.exports = mongoose.model('Note',NoteSchema);

