// Order goes [puppy, adult, senior]
const getAgeScore = (age) => {
    switch(age) {
    case 'Baby':
        return [12, 0, 0];
    case 'Young':
        return [0, 6, 0];
    case 'Adult':
        return [0, 6, 2];
    case 'Senior':
        return [0, 2, 6];
    default:
        return [0, 0, 0];
    }
}

module.exports = { getAgeScore };
