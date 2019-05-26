const MatchScorrer = require('../server/logic/matchScorrer/matchScorrer');
const { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should give back empty array on default case', (done) => {
        const expected = scorrer.getAttributeScore('asdfasdf', null, null);
        expect(expected).toEqual([0, 0, 0]);
        done();
    });

    it('should determine ideal score for housing attr', (done) => {
        const smallRegularScores = scorrer.getAttributeScore('housing', { size: 'Small' }, { activityLevel: 'regular exercise', characteristics: [] });
        const mediumEnergeticScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        const bigMaxEnergyScores = scorrer.getAttributeScore('housing', { size: 'Large' }, { activityLevel: 'needs lots of activity', characteristics: [] });

        expect(smallRegularScores).toEqual([2, 2, 6]);
        expect(mediumEnergeticScores).toEqual([6, 6, 2]);
        expect(bigMaxEnergyScores).toEqual([6, 4, 0]);
        done();
    });

    it('should give special preference to apartment dog flag housing attr', (done) => {
        const newBreedInfo = breedInfo;
        newBreedInfo.characteristics.push('best dogs for apartments dwellers');
        const housingScores = scorrer.getAttributeScore('housing', dogInfo, newBreedInfo);
        expect(housingScores).toEqual([1, 1, 6]);
        done();
    });

    it('should determine ideal score for kids pets attr', (done) => {
        const breedAndDogLoveBoth = scorrer.getAttributeScore('kidsPets', dogInfo, breedInfo);
        const breedAndDogLoveOnlyKids;
        const breedAndDogLoveOnlyPets;
        const breedAndDogDontLikeEither;

        const breedLovesBothNoDogData;
        const breedLovesOnlyKidsNoDogData;
        const breedLovesOnlyPetsNoDogData;
        const breedDoesntLikeEitherNoDogData;

        const breedAndDogDontMatchDogFriendly;
        const breedAndDogDontMatchDogUnfriendly;

        expect(breedAndDogLoveBoth).toEqual([6, 6, 6, 2]);
        expect(breedAndDogLoveOnlyKids).toEqual([]);
        expect(breedAndDogLoveOnlyPets).toEqual([]);
        expect(breedAndDogDontLikeEither).toEqual([]);

        expect(breedLovesBothNoDogData).toEqual([]);
        expect( breedLovesOnlyKidsNoDogData).toEqual([]);
        expect(breedLovesOnlyPetsNoDogData).toEqual([]);
        expect(breedDoesntLikeEitherNoDogData).toEqual([]);

        expect(breedAndDogDontMatchDogFriendly).toEqual([]);
        expect(breedAndDogDontMatchDogUnfriendly).toEqual([]);
        done();
    });
});
