const { getHousingScore } = require('./attributes/housing');
const { getKidsPetsScore } = require('./attributes/kidsPets');

function MatchScorrer() {}

MatchScorrer.prototype.getAttributeScore = function (attributeName, dogInfo, breedInfo) {
    switch(attributeName) {
    case('housing'):
        return getHousingScore(dogInfo, breedInfo);
    case('kidsPets'):
        return getKidsPetsScore(dogInfo, breedInfo);
    default:
        return [0, 0, 0];
    }

};

module.exports = MatchScorrer;
