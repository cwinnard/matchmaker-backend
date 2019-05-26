const MatchScorrer = require('../logic/matchScorrer/matchScorrer');
const { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should determine ideal score for attribute provided', (done) => {
        const housingScore = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        expect(housingScores).toEqual([]);
        done();
    });
});
