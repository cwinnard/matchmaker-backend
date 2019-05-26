function MatchMaker() {}

MatchMaker.prototype.getMatchesInOrder = function () {
    return new Promise(function(resolve, reject) {
        resolve([]);
    });
};

module.exports = MatchMaker;
