const MatchScorrer = require('../server/logic/matchScorrer/matchScorrer');
const { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should determine ideal score for attribute provided', (done) => {
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        expect(housingScores).toEqual([6, 4, 2]);
        done();
    });

    it('should give special preference to apartment dog flag', (done) => {
        const newBreedInfo = breedInfo;
        newBreedInfo.characteristics.push('best dogs for apartments dwellers');
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, newBreedInfo);
        expect(housingScores).toEqual([0, 0, 6]);
        done();
    });
});
