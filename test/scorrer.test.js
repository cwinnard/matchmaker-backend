const MatchScorrer = require('../server/logic/matchScorrer/matchScorrer');
const { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should determine ideal score for attribute provided', (done) => {
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        expect(housingScores).toEqual([6, 4, 2]);
        done();
    });
});
