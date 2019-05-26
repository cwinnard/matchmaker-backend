const { BreedInfo } = require('../database/models/breedInfo');
const { Dog } = require('../database/models/dog');
const MatchScorrer = require('./matchScorrer/matchScorrer');

const formatBreedName = (name) => {
    if (name === 'shepherd') {
        return 'australian shepherd'
    } else if (name.includes('labrador')) {
        return 'labrador retriever';
    } else if (name.includes('blue heeler') || name.includes('australian cattle dog')) {
        return 'australian cattle dog';
    } else if (name.includes('saint bernard')) {
        return 'st bernard';
    } else if (name.includes('bulldog')) {
        return 'bulldog';
    }
    return name;
}

const getBreedInfo = (breeds) => {
    return new Promise(function(resolve, reject) {
        const breedName = formatBreedName(breeds.primary.toLowerCase());
        BreedInfo.findOne({name: breedName}).then((breedInfo) => {
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
                    scoreGrid: breedInfo ? scorrer.getScoreGrid(dog, breedInfo) : null,
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
