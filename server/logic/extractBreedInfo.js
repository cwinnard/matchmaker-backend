const _ = require('lodash');


const attributeTypes = {
    ARRAY: 'array',
    STRING: 'string'
}

const formatString = (input, match) => {
    return input ? input.replace(match, '').replace(/-/g, ' ') : input;
}

const getValue = (infoArray, attributeType, match) => {
    if (attributeType === attributeTypes.STRING) {
        return formatString(_.find(infoArray, (entry) => { return entry.includes(match) }), match);
    } else if (attributeType === attributeTypes.ARRAY) {
        const hits = _.filter(infoArray, (entry) => {
            return entry.includes(match);
        });
        return hits.map((hit) => {
            return formatString(hit, match);
        });
    } else {
        return null;
    };
}

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
    extractedInfo.characteristics = getValue(infoArray, attributeTypes.ARRAY, 'characteristic-');
    extractedInfo.activityLevel = getValue(infoArray, attributeTypes.STRING, 'activity-level-');
    extractedInfo.barkingLevel = getValue(infoArray, attributeTypes.STRING, 'barking-level-');
    extractedInfo.coatType = getValue(infoArray, attributeTypes.STRING, 'coat-type-');
    extractedInfo.goodWith = getGoodWith(infoArray);
    extractedInfo.coatType = getValue(infoArray, attributeTypes.STRING, 'shedding-');
    extractedInfo.temperamentNotes = getValue(infoArray, attributeTypes.ARRAY, 'temperament-');
    extractedInfo.trainability = getValue(infoArray, attributeTypes.STRING, 'trainability-');
    console.log(extractedInfo);
    return extractedInfo;
};

module.exports = { extractBreedInfo };
