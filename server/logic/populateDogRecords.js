const { Dog } = require('../database/models/dog');
const MatchScorrer = require('./matchScorrer/matchScorrer');

const populateDogRecords = (dogs) => {
    const scorrer = new MatchScorrer();
    const formattedModels = dogs.map((dog) => {
        return new Dog({
            id: dog.id,
            name: dog.name,
            gender: dog.gender,
            breeds: dog.breeds,
            environment: dog.environment,
            age: dog.age,
            size: dog.size,
            description: dog.description,
            photos: dog.photos,
            organizationId: dog.organization_id,
            contact: dog.contact,
            scoreGrid: scorrer.getScoreGrid(dog),
            adopted: false,
        });
    });
    return formattedModels;
};

module.exports = { populateDogRecords };
