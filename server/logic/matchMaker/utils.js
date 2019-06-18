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

const curateTopMatches = () => {
    return null;
}

module.exports = { getMatchScore, curateTopMatches };
