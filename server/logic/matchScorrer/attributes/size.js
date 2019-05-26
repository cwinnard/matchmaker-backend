const getSizeScore = (size) => {
    switch(size) {
    case 'Small':
        return [6, 0, 0];
    case 'Medium':
        return [0, 6, 2];
    case 'Large':
        return [0, 2, 6];
    default:
        return [0, 0, 0];
    }
}

module.exports = { getSizeScore };
