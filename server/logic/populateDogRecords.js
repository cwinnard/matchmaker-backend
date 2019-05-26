const { Dog } = require('../database/models/dog');
const MatchScorrer = require('./matchScorrer/matchScorrer');

const populateDogRecords = (dogs) => {
    const scorrer = new MatchScorrer();
    const formattedModels = dogs.map((dog) => {
        return {};
    });
    return formattedModels;
};

module.exports = { populateDogRecords };
