const getAgeScore = (age) => {
    switch(age) {
    case 'Baby':
        return [0, 0, 0];
    case 'Adult':
        return [0, 0, 0];
    case 'Senior':
        return [0, 0, 0];
    default:
        return [0, 0, 0];
    }
}

module.exports = { getAgeScore };
