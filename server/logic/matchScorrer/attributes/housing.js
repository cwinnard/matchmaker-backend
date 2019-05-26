const activityLevels = {
    "calm": 1,
    "regular exercise": 2,
    "energetic": 3,
    "needs lots of activity": 4
}

const sizes = {
    "small": 1,
    "medium": 2,
    "large": 3
}

const bestApartmentDog = (breedInfo) => {
    return breedInfo.characteristics.includes('best dogs for apartments dwellers');
}

const getHousingScore = (dogInfo, breedInfo) => {
    let housingScore = [0, 0, 0];
    if (bestApartmentDog(breedInfo)) {
        housingScore = [0, 0, 6];
    } else if (breedInfo.activityLevel === 'energetic' && dogInfo.size === 'Medium') {
        housingScore = [6, 4, 2];
    };
    return housingScore;
}

module.exports = { getHousingScore };
