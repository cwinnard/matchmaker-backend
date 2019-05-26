var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    age: {
        type: String,
        required: false,
    },
    size: {
        type: String,
        required: false,
    },
});

var Dog = mongoose.model('dog', dogSchema);


module.exports = { Dog, dogSchema };
