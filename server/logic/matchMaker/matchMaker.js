const _ = require('lodash');

const { Dog, dogSchema } = require('../../database/models/dog');
const { getMatchScore } = require('./utils');

function MatchMaker(dogs) {
    this.dogs = dogs;
}

MatchMaker.prototype.getMatchesInOrder = function (quizResponses) {
    const dogsWithScores = this.dogs.map((dog) => {
        return {
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
            matchScore: getMatchScore(dog, quizResponses),
        };
    });
    const sortedMatches = _.orderBy(dogsWithScores, ['matchScore'], ['desc']);
    return sortedMatches
};

module.exports = MatchMaker;
