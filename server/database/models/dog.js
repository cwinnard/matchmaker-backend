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
    gender: {
        type: String,
        required: false,
    },
    breeds: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    environment: {
        type: mongoose.Schema.Types.Mixed,
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
    description: {
        type: String,
        required: false,
    },
    photos: {
        type: Array,
        required: false,
    },
    organizationId: {
        type: Number,
        required: false,
    },
    contact: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
    scoreGrid: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
    },
});

var Dog = mongoose.model('dog', dogSchema);


module.exports = { Dog, dogSchema };
