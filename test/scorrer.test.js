const MatchScorrer = require('../server/logic/matchScorrer/matchScorrer');
let { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should determine ideal score for attribute provided', (done) => {
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        expect(housingScores).toEqual([6, 4, 2]);
        done();
    });

    it('should give special preference to apartment dog flag', (done) => {
        breedInfo.characteristics.push('best dogs for apartment dwellers');
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        expect(housingScores).toEqual([0, 0, 6]);
        done();
    });
});
