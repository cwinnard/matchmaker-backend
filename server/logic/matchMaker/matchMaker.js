const _ = require('lodash');

const { Dog } = require('../../database/models/dog');

function MatchMaker() {}

const getMatchScore = (dog, quizResponses) => {
    let score = 0;
    if (!dog.scoreGrid) {
        return score;
    }
    dog.scoreGrid.keys.forEach((attrScore, index) => {
        score += attrScore[quizResponses[index]]
    });
    console.log(score);
    return score;
}

MatchMaker.prototype.getMatchesInOrder = function (quizResponses) {
    return new Promise(function(resolve, reject) {
        Dog.find({}).then((dogs) => {
            const sortedMatches = _.sortBy(dogs, (dog) => {
                return getMatchScore(dog, quizResponses);
            });
            resolve(sortedMatches);
        })
    });
};

module.exports = MatchMaker;
