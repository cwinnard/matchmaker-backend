const MatchScorrer = require('../server/logic/matchScorrer/matchScorrer');
const { dogInfo, breedInfo } = require('./data');

describe('match scorrer', () => {
    const scorrer = new MatchScorrer();

    it('should give back empty array on default case', (done) => {
        const expected = scorrer.getAttributeScore('asdfasdf', null, null);
        expect(expected).toEqual([0, 0, 0]);
        done();
    });

    it('should determine score range for housing attr', (done) => {
        const smallRegularScores = scorrer.getAttributeScore('housing', { size: 'Small' }, { activityLevel: 'regular exercise', characteristics: [] });
        const mediumEnergeticScores = scorrer.getAttributeScore('housing', dogInfo, breedInfo);
        const bigMaxEnergyScores = scorrer.getAttributeScore('housing', { size: 'Large' }, { activityLevel: 'needs lots of activity', characteristics: [] });

        const newBreedInfo = breedInfo;
        newBreedInfo.characteristics.push('best dogs for apartments dwellers');
        const apartmentPrefScores = scorrer.getAttributeScore('housing', dogInfo, newBreedInfo);

        expect(smallRegularScores).toEqual([2, 2, 6]);
        expect(mediumEnergeticScores).toEqual([6, 6, 2]);
        expect(bigMaxEnergyScores).toEqual([6, 4, 0]);
        expect(apartmentPrefScores).toEqual([1, 1, 6]);
        done();
    });

    it('should determine score range for kids pets attr', (done) => {
        const breedAndDogLoveBoth = scorrer.getAttributeScore('kidsPets', {environment: {children: true, dogs: true}}, {goodWith: ['dogs', 'children']});
        const breedAndDogLoveOnlyKids = scorrer.getAttributeScore('kidsPets', {environment: {children: true, dogs: false}}, {goodWith: ['children']});
        const breedAndDogLoveOnlyPets = scorrer.getAttributeScore('kidsPets', {environment: {children: false, dogs: true}}, {goodWith: ['dogs']});
        const breedAndDogDontLikeEither = scorrer.getAttributeScore('kidsPets', {environment: {children: false, dogs: false}}, {goodWith: []});

        const breedLovesBothNoDogData = scorrer.getAttributeScore('kidsPets', {environment: {children: null, dogs: null}}, {goodWith: ['dogs', 'children']});
        const breedLovesOnlyKidsNoDogData = scorrer.getAttributeScore('kidsPets', {environment: {children: null, dogs: null}}, {goodWith: ['children']});
        const breedLovesOnlyPetsNoDogData = scorrer.getAttributeScore('kidsPets', {environment: {children: null, dogs: null}}, {goodWith: ['dogs']});
        const breedDoesntLikeEitherNoDogData = scorrer.getAttributeScore('kidsPets', {environment: {children: null, dogs: null}}, {goodWith: []});

        const breedDoesntLikeEitherDogFriendlyBoth = scorrer.getAttributeScore('kidsPets', {environment: {children: true, dogs: true}}, {goodWith: []});
        const breedDoesntLikeEitherhDogFriendlyKidsOnly = scorrer.getAttributeScore('kidsPets', {environment: {children: true, dogs: false}}, {goodWith: []});
        const breedDoesntLikeEitherDogFriendlyPetsOnly = scorrer.getAttributeScore('kidsPets', {environment: {children: false, dogs: true}}, {goodWith: []});

        const liveData = scorrer.getAttributeScore('kidsPets', dogInfo, breedInfo);

        expect(breedAndDogLoveBoth).toEqual([6, 6, 6, 2]);
        expect(breedAndDogLoveOnlyKids).toEqual([6, 0, 0, 3]);
        expect(breedAndDogLoveOnlyPets).toEqual([0, 6, 0, 3]);
        expect(breedAndDogDontLikeEither).toEqual([0, 0, 0, 6]);

        expect(breedLovesBothNoDogData).toEqual([3, 3, 3, 3]);
        expect(breedLovesOnlyKidsNoDogData).toEqual([3, 0, 0, 3]);
        expect(breedLovesOnlyPetsNoDogData).toEqual([0, 3, 0, 3]);
        expect(breedDoesntLikeEitherNoDogData).toEqual([0, 0, 0, 3]);

        expect(breedDoesntLikeEitherDogFriendlyBoth).toEqual([3, 3, 3, 3]);
        expect(breedDoesntLikeEitherhDogFriendlyKidsOnly).toEqual([3, 0, 0, 3]);
        expect(breedDoesntLikeEitherDogFriendlyPetsOnly).toEqual([0, 3, 0, 3]);

        expect(liveData).toEqual([6, 6, 6, 2]);
        done();
    });

    it('should determine score range for lifestyle activity attr', (done) => {
        const puppyHighEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Baby'}, null);
        const seniorLowEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Senior'}, null);

        const lowEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Adult'}, {activityLevel: 'calm'});
        const midEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Adult'}, {activityLevel: 'regular exercise'});
        const highEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Adult'}, {activityLevel: 'energetic'});
        const ultraEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Adult'}, {activityLevel: 'needs lots of activity'});
        const unknownEnergy = scorrer.getAttributeScore('lifestyleActivity', {age: 'Adult'}, {});

        expect(puppyHighEnergy).toEqual([0, 2, 6]);
        expect(seniorLowEnergy).toEqual([6, 2, 0]);

        expect(lowEnergy).toEqual([6, 2, 0]);
        expect(midEnergy).toEqual([2, 4, 4]);
        expect(highEnergy).toEqual([1, 4, 6]);
        expect(ultraEnergy).toEqual([0, 2, 6]);
        expect(unknownEnergy).toEqual([3, 3, 3]);
        done();
    });

    it('should determine score range for age attr', (done) => {
        const puppy = scorrer.getAttributeScore('age', {age: 'Baby'}, null);
        const adult = scorrer.getAttributeScore('age', {age: 'Adult'}, null);
        const senior = scorrer.getAttributeScore('age', {age: 'Senior'}, null);

        expect(puppy).toEqual([6, 0, 0]);
        expect(adult).toEqual([0, 6, 2]);
        expect(senior).toEqual([0, 2, 6]);
        done();
    });

    it('should determine score range for size attr', (done) => {
        const small = scorrer.getAttributeScore('size', {size: 'Small'}, null);
        const medium = scorrer.getAttributeScore('size', {size: 'Medium'}, null);
        const large = scorrer.getAttributeScore('size', {size: 'Large'}, null);

        expect(small).toEqual([6, 2, 0]);
        expect(medium).toEqual([2, 6, 2]);
        expect(large).toEqual([0, 2, 6]);
        done();
    });

    // FIXME: Spend some more time here
    it('should determine score range for time commitment attr', (done) => {
        const puppyHighCommitment = scorrer.getAttributeScore('timeCommitment', {age: 'Baby'}, null);
        const seniorLowCommitment = scorrer.getAttributeScore('timeCommitment', {age: 'Senior'}, null);

        const lowEnergy = scorrer.getAttributeScore('timeCommitment', {age: 'Adult'}, {activityLevel: 'calm'});
        const midEnergy = scorrer.getAttributeScore('timeCommitment', {age: 'Adult'}, {activityLevel: 'regular exercise'});
        const highEnergy = scorrer.getAttributeScore('timeCommitment', {age: 'Adult'}, {activityLevel: 'energetic'});
        const ultraEnergy = scorrer.getAttributeScore('timeCommitment', {age: 'Adult'}, {activityLevel: 'needs lots of activity'});
        const unknownEnergy = scorrer.getAttributeScore('timeCommitment', {age: 'Adult'}, {});

        expect(puppyHighCommitment).toEqual([0, 0, 6]);
        expect(seniorLowCommitment).toEqual([6, 3, 0]);

        expect(lowEnergy).toEqual([6, 4, 2]);
        expect(midEnergy).toEqual([3, 3, 3]);
        expect(highEnergy).toEqual([1, 4, 4]);
        expect(ultraEnergy).toEqual([0, 3, 6]);
        expect(unknownEnergy).toEqual([3, 3, 3]);
        done();
    });
});
