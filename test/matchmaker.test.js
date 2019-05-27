const MatchMaker = require('../server/logic/matchMaker/matchMaker');

const { noel, max, tifa, liam } = require('./data/dogRecords');

describe('match maker', () => {
    const dogs = [noel, max, tifa, liam];
    const matchmaker = new MatchMaker(dogs);

    it('should order dogs based on score', (done) => {
        const apartmentLiver = [2, 3, 1, 1, 1, 1];
        const oldAndSlow = [1, 3, 0, 2, 1, 0];
        const activePerson = [0, 1, 2, 1, 1, 2];
        const wantsPupper = [1, 2, 2, 0, 1, 1];

        matchmaker.getMatchesInOrder(apartmentLiver).then(() => {
            expect(score).toEqual([0, 0, 0]);
            done();
        });
    });
});
