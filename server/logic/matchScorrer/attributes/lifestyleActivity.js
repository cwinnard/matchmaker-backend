// Order goes [low, medium, high]
const getLifestyleActivityScore = (dogInfo, breedInfo) => {
    if (dogInfo.age === 'Baby') {
        return [0, 2, 6];
    } else if (dogInfo.age === 'Senior') {
        return [6, 2, 0];
    } else {
        switch(breedInfo.activityLevel) {
        case('calm'):
            return [6, 2, 0];
        case('regular exercise'):
            return [2, 4, 4];
        case('energetic'):
            return [1, 4, 6];
        case('needs lots of activity'):
            return [0, 2, 6];
        default:
            return [3, 3, 3];
        }
    }
    return [0, 0, 0];
}

module.exports = { getLifestyleActivityScore };
