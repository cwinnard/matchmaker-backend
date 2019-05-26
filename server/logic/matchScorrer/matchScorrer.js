const { getHousingScore } = require('./attributes/housing');
const { getKidsPetsScore } = require('./attributes/kidsPets');
const { getLifestyleActivityScore } = require('./attributes/lifestyleActivity');
const { getAgeScore } = require('./attributes/age');
const { getSizeScore } = require('./attributes/size');
const { getTimeCommitmentScore } = require('./attributes/timeCommitment');

function MatchScorrer() {
    this.allAttributes = [
        'housing',
        'kidsPets',
        'lifestyleActivity',
        'age',
        'size',
        'timeCommitment',
    ]
}

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
    case('timeCommitment'):
        return getTimeCommitmentScore(dogInfo, breedInfo);
    default:
        return [0, 0, 0];
    }
};

MatchScorrer.prototype.getScoreGrid = function (dogInfo, breedInfo) {
    const scoreGrid = {};
    this.allAttributes.forEach((attr) => {
        scoreGrid[attr] = this.getAttributeScore(attr, dogInfo, breedInfo);
    });
    return scoreGrid;
};

module.exports = MatchScorrer;
