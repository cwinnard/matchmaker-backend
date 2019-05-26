const { getHousingScore } = require('./attributes/housing');
const { getKidsPetsScore } = require('./attributes/kidsPets');
const { getLifestyleActivityScore } = require('./attributes/lifestyleActivity');
const { getAgeScore } = require('./attributes/age');
const { getSizeScore } = require('./attributes/size');

function MatchScorrer() {}

MatchScorrer.prototype.getAttributeScore = function (attributeName, dogInfo, breedInfo) {
    switch(attributeName) {
    case('housing'):
        return getHousingScore(dogInfo, breedInfo);
    case('kidsPets'):
        return getKidsPetsScore(dogInfo, breedInfo);
    case('lifestyleActivity'):
        return getLifestyleActivityScore(dogInfo, breedInfo);
    case('age'):
        return getAgeScore(dogInfo.age);
    case('size'):
        return getSizeScore(dogInfo.size);
    default:
        return [0, 0, 0];
    }
};

module.exports = MatchScorrer;
