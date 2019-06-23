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

// Order goes [kids, pets, both, neither]
const getKidsPetsScore = (dogInfo, breedInfo) => {
    const dogPrefs = consolidateDogPrefs(dogInfo);
    const { dogLoves, dogHates } = dogPrefs;
    const noDogInfo = dogInfo.environment.children === null && dogInfo.environment.dogs === null;
    // dog and breed love both
    if (!noDogInfo && dogLoves.includes('dogs') && dogLoves.includes('children') && breedInfo.goodWith.includes('dogs') && breedInfo.goodWith.includes('children')) {
        return [6, 6, 6, 2];
    // dog and breed love only kids
    } else if (!noDogInfo && !dogLoves.includes('dogs') && dogLoves.includes('children') && !breedInfo.goodWith.includes('dogs') && breedInfo.goodWith.includes('children')) {
        return [6, 0, 0, 3];
    // dog and breed love only pets
    } else if (!noDogInfo && dogLoves.includes('dogs') && !dogLoves.includes('children') && breedInfo.goodWith.includes('dogs') && !breedInfo.goodWith.includes('children')) {
        return [0, 6, 0, 3];
    // dog and breed dont like either
    } else if (!noDogInfo && !dogLoves.includes('dogs') && !dogLoves.includes('children') && !breedInfo.goodWith.includes('dogs') && !breedInfo.goodWith.includes('children')) {
        return [0, 0, 0, 6];
    // no dog data and breed loves both
    } else if (noDogInfo && breedInfo.goodWith.includes('dogs') && breedInfo.goodWith.includes('children')) {
        return [3, 3, 3, 3];
    // no dog data and breed loves only kids
    } else if (noDogInfo && !breedInfo.goodWith.includes('dogs') && breedInfo.goodWith.includes('children')) {
        return [3, 0, 0, 3];
    // no dog data and breed loves only kids
    } else if (noDogInfo && breedInfo.goodWith.includes('dogs') && !breedInfo.goodWith.includes('children')) {
        return [0, 3, 0, 3];
    // no dog data and breed doesnt like either
    } else if (noDogInfo && !breedInfo.goodWith.includes('dogs') && !breedInfo.goodWith.includes('children')) {
        return [0, 0, 0, 3];
    // breed doesnt like either and dog loves both
    } else if (breedInfo.goodWith.length === 0 && !noDogInfo && dogLoves.includes('dogs') && dogLoves.includes('children')) {
        return [3, 3, 3, 3];
    // breed doesnt like either and dog loves kids
    } else if (breedInfo.goodWith.length === 0 && !noDogInfo && !dogLoves.includes('dogs') && dogLoves.includes('children')) {
        return [3, 0, 0, 3];
    // breed doesnt like either and dog loves pets
    } else if (breedInfo.goodWith.length === 0 && !noDogInfo && dogLoves.includes('dogs') && !dogLoves.includes('children')) {
        return [0, 3, 0, 3];
    // breed loves both and dog data for only children
    } else if (breedInfo.goodWith.length === 2 && !noDogInfo && !dogHates.includes('dogs') && dogLoves.includes('children')) {
        return [6, 3, 2, 2];
    // breed loves both and dog data for only pets
    } else if (breedInfo.goodWith.length === 2 && !noDogInfo && dogLoves.includes('dogs') && !dogHates.includes('children')) {
        return [3, 6, 2, 2];
    }
    return [0, 0, 0, 0];
}

module.exports = { getKidsPetsScore };
