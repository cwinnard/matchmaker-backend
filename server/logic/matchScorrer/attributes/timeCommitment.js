// Order goes [minimal, some, lots]
const getTimeCommitmentScore = (dogInfo, breedInfo) => {
    if (dogInfo.age === "Baby") {
        return [0, 0, 6];
    } else if (dogInfo.age === "Senior") {
        return [6, 3, 0];
    } else {
        switch(breedInfo.activityLevel) {
        case('calm'):
            return [6, 4, 1];
        case('regular exercise'):
            return [3, 3, 3];
        case('energetic'):
            return [1, 4, 4];
        case('needs lots of activity'):
            return [0, 3, 6];
        default:
            return [3, 3, 3];
        }
    }
    return [0, 0, 0];
}

module.exports = { getTimeCommitmentScore };
