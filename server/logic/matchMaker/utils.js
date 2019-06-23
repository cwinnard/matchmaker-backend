const _ = require('lodash');

const getMatchScore = (dog, quizResponses) => {
    let score = 0;
    if (!dog.scoreGrid) {
        return score;
    }
    Object.keys(dog.scoreGrid).forEach((key, index) => {
        const valueArray = dog.scoreGrid[key];
        score += valueArray[quizResponses[index]]
    });
    return score;
}

const curateTopMatches = (matches, number) => {
    const curatedMatches = [];
    const matchedBreeds = [];
    while (curatedMatches.length < number) {
        const newMatch = _.find(matches, (match) => {
            return !_.includes(matchedBreeds, match.breeds.primary);
        });
        if (!newMatch) {
            break;
        }
        curatedMatches.push(newMatch);
        matchedBreeds.push(newMatch.breeds.primary);
    }
    return curatedMatches;
}

module.exports = { getMatchScore, curateTopMatches };
