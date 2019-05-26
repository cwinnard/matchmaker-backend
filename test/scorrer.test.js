const MatchScorrer = require('../server/logic/matchScorrer/matchScorrer');
const { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should determine ideal score for attribute provided', (done) => {
        const smallRegularScores = scorrer.getAttributeScore('housing', { size: 'Small' }, { activityLevel: 'regular exercise', characteristics: [] });
        const mediumEnergeticScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        const bigMaxEnergyScores = scorrer.getAttributeScore('housing', { size: 'Large' }, { activityLevel: 'needs lots of activity', characteristics: [] });

        expect(smallRegularScores).toEqual([2, 2, 6]);
        expect(mediumEnergeticScores).toEqual([6, 6, 2]);
        expect(bigMaxEnergyScores).toEqual([6, 4, 0]);
        done();
    });

    it('should give special preference to apartment dog flag', (done) => {
        const newBreedInfo = breedInfo;
        newBreedInfo.characteristics.push('best dogs for apartments dwellers');
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, newBreedInfo);
        expect(housingScores).toEqual([1, 1, 6]);
        done();
    });
});
