const _ = require('lodash');

const getBreedHandle = (url) => {
    const splitUrl = url.split('dog-breeds/');
    const handle = splitUrl[1].split('/\"')[0];
    console.log(handle);
    return handle;
};

module.exports = { getBreedHandle };
