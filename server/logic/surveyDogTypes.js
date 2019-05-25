const _ = require('lodash');

const surveyDogTypes = (petfinderRes) => {
    if (!petfinderRes || !petfinderRes.animals) {
        return [];
    }
    const surveyInfo = petfinderRes.animals.map((animal) => {
        return _.pick(animal, ['id', 'age', 'size', 'breeds'])
    });
    return surveyInfo;
};

module.exports = { surveyDogTypes };
