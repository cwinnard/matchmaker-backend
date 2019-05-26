const _ = require('lodash');
const express = require('express');

const { Dog } = require('../database/models/dog');
const MatchMaker = require('../logic/matchMaker/matchMaker');

const matchmakerRouter = express.Router();

matchmakerRouter.get('/test', (req, res) => {
    const matchmaker = new MatchMaker();
    const quizResponses = [0, 1, 1, 1, 2, 2];
    matchmaker.getMatchesInOrder(quizResponses).then((orderedMatches) => {
        res.send(orderedMatches).status(200);
    });
});

module.exports = matchmakerRouter;
