const MatchMaker = require('../server/logic/matchMaker/matchMaker');
const { curateTopMatches } = require('../server/logic/matchMaker/utils');

const { noel, max, tifa, liam } = require('./data/dogRecords');
const { allDogs } = require('./data/allDogs617');
const { results } = require('./data/results');

describe('match maker', () => {
    const dogs = [noel, max, tifa, liam];
    const matchmaker = new MatchMaker(dogs);

    it('should order dogs based on score', (done) => {
        const apartmentLiver = [2, 3, 1, 1, 1, 1];
        const oldAndSlow = [1, 3, 0, 2, 1, 0];
        const activePerson = [0, 1, 2, 1, 1, 2];
        const wantsPupper = [1, 2, 2, 0, 1, 1];

        const apartmentMatches = matchmaker.getMatchesInOrder(apartmentLiver);
        const oldMatches = matchmaker.getMatchesInOrder(oldAndSlow);
        const activeMatches = matchmaker.getMatchesInOrder(activePerson);
        const pupperMatches = matchmaker.getMatchesInOrder(wantsPupper);

        const apartmentExpected = [
             Object.assign({ matchScore: 24 }, max),
             Object.assign({ matchScore: 18 }, noel),
             Object.assign({ matchScore: 18 }, tifa),
             Object.assign({ matchScore: 6 }, liam),
        ];
        const oldExpected = [
             Object.assign({ matchScore: 33 }, tifa),
             Object.assign({ matchScore: 13 }, max),
             Object.assign({ matchScore: 12 }, noel),
             Object.assign({ matchScore: 8 }, liam),
        ];
        const activeExpected = [
             Object.assign({ matchScore: 30 }, noel),
             Object.assign({ matchScore: 20 }, liam),
             Object.assign({ matchScore: 19 }, max),
             Object.assign({ matchScore: 17 }, tifa),
        ];
        const pupperExpected = [
             Object.assign({ matchScore: 26 }, liam),
             Object.assign({ matchScore: 18 }, noel),
             Object.assign({ matchScore: 18 }, tifa),
             Object.assign({ matchScore: 10 }, max),
        ];

        expect(apartmentMatches).toEqual(apartmentExpected);
        expect(oldMatches).toEqual(oldExpected);
        expect(activeMatches).toEqual(activeExpected);
        expect(pupperMatches).toEqual(pupperExpected);
        done();
    });
});

describe('curate top matches', () => {
    it('should return diverse group of breeds', (done) => {
        const matchmaker = new MatchMaker(allDogs);
        const activePerson = [0, 1, 2, 1, 1, 2];

        const allMatches = matchmaker.getMatchesInOrder(activePerson);
        const curatedMatches = curateTopMatches(allMatches, 5);
        // replace description with null - test data
        const testMatches = curatedMatches.map((curatedMatch) => {
            const testMatch = curatedMatch;
            testMatch.description = null;
            return testMatch;
        })

        const expectedMatches = results;

        expect(testMatches).toEqual(expectedMatches);
        done();
    });
});
