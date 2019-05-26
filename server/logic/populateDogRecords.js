const { BreedInfo } = require('../database/models/breedInfo');
const { Dog } = require('../database/models/dog');
const MatchScorrer = require('./matchScorrer/matchScorrer');

const getBreedInfo = (breeds) => {
    return new Promise(function(resolve, reject) {
        BreedInfo.findOne({name: breeds.primary.toLowerCase()}).then((breedInfo) => {
            resolve(breedInfo);
        });
    });
}

const populateDogRecords = (dogs) => {
    const scorrer = new MatchScorrer();
    const formattedModels = dogs.map((dog) => {
        return new Promise(function(resolve, reject) {
            getBreedInfo(dog.breeds).then((breedInfo) => {
                const model = new Dog({
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
                    scoreGrid: breedInfo ? scorrer.getScoreGrid(dog, breedInfo) : {},
                    adopted: false,
                });
                resolve(model);
            }, (e) => {
                console.log(e);
                resolve({});
            });
        });
    });
    return Promise.all(formattedModels);
};

module.exports = { populateDogRecords };
