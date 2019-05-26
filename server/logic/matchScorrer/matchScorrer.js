const { getHousingScore } = require('./attributes/housing');

function MatchScorrer() {}

MatchScorrer.prototype.getAttributeScore = function (attributeName, dogInfo, breedInfo) {
    return getHousingScore(dogInfo, breedInfo);
};

module.exports = MatchScorrer;
