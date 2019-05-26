var mongoose = require('mongoose');

var breedInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    akcHandle: {
        type: String,
        required: false,
    },
    characteristics: {
        type: Array,
        required: false,
    },
    activityLevel: {
        type: String,
        required: false,
    },
    barkingLevel: {
        type: String,
        required: false,
    },
    coatType: {
        type: String,
        required: false,
    },
    goodWith: {
        type: Array,
        required: false,
    },
    sheddingFrequency: {
        type: String,
        required: false,
    },
    tempermentNotes: {
        type: Array,
        required: false,
    },
    trainability: {
        type: String,
        required: false,
    },
});

var BreedInfo = mongoose.model('breedInfo', breedInfoSchema);


module.exports = { BreedInfo, breedInfoSchema };
