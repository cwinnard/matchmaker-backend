const _ = require('lodash');

const { Dog, dogSchema } = require('../../database/models/dog');

function MatchMaker() {}

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

MatchMaker.prototype.getMatchesInOrder = function (quizResponses) {
    return new Promise(function(resolve, reject) {
        Dog.find({}).then((dogs) => {
            const dogsWithScores = dogs.map((dog) => {
                const dogWithScore = {
                    id: dog.id,
                    name: dog.name,
                    gender: dog.gender,
                    breeds: dog.breeds,
                    environment: dog.environment,
                    age: dog.age,
                    size: dog.size,
                    description: dog.description,
                    photos: dog.photos,
                    organizationId: dog.organizationId,
                    contact: dog.contact,
                    scoreGrid: dog.scoreGrid,
                    adopted: dog.adopted,
                };
                dogWithScore.matchScore = getMatchScore(dog, quizResponses);
                return dogWithScore;
            });
            const sortedMatches = _.orderBy(dogsWithScores, ['matchScore'], ['desc']);
            resolve(sortedMatches);
        })
    });
};

module.exports = MatchMaker;
