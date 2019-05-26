const _ = require('lodash');

const getGoodWith = (infoArray) => {
    const goodWith = [];
    const children = _.find(infoArray, (entry) => { return entry.includes('good-with-children-') });
    if (children.includes('yes')) {
        goodWith.push('children');
    }
    const dogs = _.find(infoArray, (entry) => { return entry.includes('good-with-dogs-') });
    if (dogs.includes('yes') || dogs.includes('with-supervision')) {
        goodWith.push('dogs');
    }
    return goodWith;
};

const extractBreedInfo = (infoArray, akcHandle) => {
    const extractedInfo = {};
    extractedInfo.name = akcHandle.replace(/-/g, ' ');
    extractedInfo.akcHandle = akcHandle;
    extractedInfo.characteristics = _.filter(infoArray, (entry) => { return entry.includes('characteristic-') });
    extractedInfo.activityLevel = _.find(infoArray, (entry) => { return entry.includes('activity-level-') });
    extractedInfo.barkingLevel = _.find(infoArray, (entry) => { return entry.includes('barking-level-') });
    extractedInfo.coatType = _.find(infoArray, (entry) => { return entry.includes('coat-type-') });
    extractedInfo.goodWith = getGoodWith(infoArray);
    extractedInfo.coatType = _.find(infoArray, (entry) => { return entry.includes('shedding-') });
    extractedInfo.temperamentNotes = _.filter(infoArray, (entry) => { return entry.includes('temperament-') });
    extractedInfo.trainability = _.find(infoArray, (entry) => { return entry.includes('trainability-') });
    return extractedInfo;
};

module.exports = { extractBreedInfo };
