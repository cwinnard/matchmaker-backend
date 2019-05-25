var mongoose = require('mongoose');

var surveyResSchema = new mongoose.Schema({
    id: {
        type: Number,
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
    breeds: {
        type: Object,
        required: false,
    },
});

var SurveyRes = mongoose.model('surveyRes', surveyResSchema);


module.exports = { SurveyRes, surveyResSchema };
