const _ = require('lodash');

const getGoodWith = (infoArray) => {
    console.log(infoArray);
    const goodWith = [];
    const children = _.find(infoArray, (entry) => { entry.includes('good-with-children-') });
    console.log(children);
    if (children.includes('yes')) {
        goodWith.push('children');
    }
    const dogs = _.find(infoArray, (entry) => { entry.includes('good-with-dogs-') });
    if (dogs.includes('yes') || children.includes('with-supervision')) {
        goodWith.push('dogs');
    }
    return goodWith;
};

const extractBreedInfo = (infoArray, akcHandle) => {
    const extractedInfo = {};
    extractedInfo.name = akcHandle.replace(/-/g, ' ');
    extractedInfo.akcHandle = akcHandle;
    extractedInfo.characteristics = _.filter(infoArray, (entry) => { entry.includes('characteristic-') });
    extractedInfo.activityLevel = _.find(infoArray, (entry) => { entry.includes('activity-level-') });
    extractedInfo.barkingLevel = _.find(infoArray, (entry) => { entry.includes('barking-level-') });
    extractedInfo.coatType = _.find(infoArray, (entry) => { entry.includes('coat-type-') });
    extractedInfo.goodWith = getGoodWith(infoArray);
    extractedInfo.coatType = _.find(infoArray, (entry) => { entry.includes('shedding-') });
    extractedInfo.tempermentNotes = _.filter(infoArray, (entry) => { entry.includes('temperment-') });
    extractedInfo.trainability = _.find(infoArray, (entry) => { entry.includes('trainability-') });
    return extractedInfo;
};

module.exports = { extractBreedInfo };
