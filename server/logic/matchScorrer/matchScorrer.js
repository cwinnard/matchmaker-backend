const { getHousingScore } = require('./attributes/housing');

function MatchScorrer() {}

MatchScorrer.prototype.getAttributeScore = function (attributeName, dogInfo, breedInfo) {
    switch(attributeName) {
    case('housing'):
        return getHousingScore(dogInfo, breedInfo);
    default:
        return [0, 0, 0];
    }

};

module.exports = MatchScorrer;
