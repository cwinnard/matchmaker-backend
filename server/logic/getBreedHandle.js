const _ = require('lodash');

const getBreedHandle = (url) => {
    const splitUrl = url.split('dog-breeds/');
    const handle = splitUrl[1].split('/\"')[0];
    return handle;
};

module.exports = { getBreedHandle };
