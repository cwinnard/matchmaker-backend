const _ = require('lodash');

const { Dog } = require('../../database/models/dog');

function MatchMaker() {}

const getMatchScore = (dog, quizResponses) => {
    let score = 0;
    if (!dog.scoreGrid) {
        return score;
    }
    console.log(dog.scoreGrid);
    dog.scoreGrid.keys.forEach((attrScore, index) => {
        score += attrScore[quizResponses[index]]
    });
    console.log(score);
    return score;
}

MatchMaker.prototype.getMatchesInOrder = function (quizResponses) {
    return new Promise(function(resolve, reject) {
        Dog.find({}).then((dogs) => {
            const dogsWithScores = dogs.map((dog) => {
                let dogWithScore = { ...dog };
                dogWithScore.matchScore = getMatchScore(dog, quizResponses);
                console.log(dogWithScore);
                return dogWithScore;
            });
            const sortedMatches = _.orderBy(dogsWithScores, ['matchScore'], ['desc']);
            resolve(sortedMatches);
        })
    });
};

module.exports = MatchMaker;
