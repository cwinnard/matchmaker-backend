function MatchScorrer() {}

const getHousingScore = (dogInfo, breedInfo) => {
    let housingScore = [];
    console.log(dogInfo.size);
    console.log(breedInfo.activityLevel);
    if (breedInfo.activityLevel === 'energetic' && dogInfo.size === 'Medium') {
        housingScore = [6, 4, 2];
    };
    return housingScore;
}

MatchScorrer.prototype.getAttributeScore = function (attributeName, dogInfo, breedInfo) {
    return getHousingScore(dogInfo, breedInfo);
};

module.exports = MatchScorrer;
