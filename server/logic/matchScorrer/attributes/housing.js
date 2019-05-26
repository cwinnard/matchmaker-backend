const getHousingScore = (dogInfo, breedInfo) => {
    let housingScore = [0, 0, 0];
    if (breedInfo.activityLevel === 'energetic' && dogInfo.size === 'Medium') {
        housingScore = [6, 4, 2];
    };
    return housingScore;
}

module.exports = { getHousingScore };
