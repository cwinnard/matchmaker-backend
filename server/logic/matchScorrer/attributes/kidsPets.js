const consolidateDogPrefs = (dogInfo) => {
    const dogLoves = [];
    const dogHates = [];

    if (dogInfo.environment.children === true) {
        dogLoves.push('children');
    }
    if (dogInfo.environment.children === false) {
        dogHates.push('children');
    }
    if (dogInfo.environment.dogs === true) {
        dogLoves.push('dogs');
    }
    if (dogInfo.environment.dogs === false) {
        dogHates.push('dogs');
    }
    return { dogLoves, dogHates };
}

const getKidsPetsScore = (dogInfo, breedInfo) => {
    const dogPrefs = consolidateDogPrefs(dogInfo);
    const { dogLoves, dogHates } = dogPrefs;
    if (dogLoves.includes('dogs') && dogLoves.includes('children') && breedInfo.goodWith.includes('dogs') && breedInfo.goodWith.includes('children')) {
        return [6, 6, 6, 2];
    }
    return [0, 0, 0, 0];
}

module.exports = { getKidsPetsScore };
