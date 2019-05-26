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

// Order goes [house w/ secure fence, house w/o secure fence, apartment]
const determineStandardHousingScore = (dogInfo, breedInfo) => {
    let housingScore = [0, 0, 0];
    const activityScore = activityLevels[breedInfo.activityLevel];
    const sizeScore = sizes[dogInfo.size.toLowerCase()];
    const totalScore = activityScore + sizeScore;
    if (totalScore < 4) {
        housingScore = [2, 2, 6];
    } else if (totalScore >= 4 && totalScore < 6) {
        housingScore = [6, 6, 2];
    } else {
        housingScore = [6, 4, 0];
    }
    return housingScore;
}

const getHousingScore = (dogInfo, breedInfo) => {
    let housingScore = [0, 0, 0];
    if (bestApartmentDog(breedInfo)) {
        housingScore = [1, 1, 6];
    } else {
        housingScore = determineStandardHousingScore(dogInfo, breedInfo);
    };
    return housingScore;
}

module.exports = { getHousingScore };
