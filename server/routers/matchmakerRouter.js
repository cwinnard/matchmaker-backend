const _ = require('lodash');
const express = require('express');

const { Dog } = require('../database/models/dog');
const MatchMaker = require('../logic/matchMaker/matchMaker');

const matchmakerRouter = express.Router();

matchmakerRouter.post('/results', (req, res) => {
    Dog.find({}).then((dogs) => {
        const matchmaker = new MatchMaker(dogs);
        const quizResponses = req.body.responses;
        const orderedMatches = matchmaker.getMatchesInOrder(quizResponses);
        res.send(orderedMatches).status(200);
    });
});

matchmakerRouter.get('/test', (req, res) => {
    Dog.find({}).then((dogs) => {
        const matchmaker = new MatchMaker(dogs);
        const quizResponses = [0, 1, 1, 1, 2, 2];
        const orderedMatches = matchmaker.getMatchesInOrder(quizResponses);
        res.send(orderedMatches).status(200);
    });
});

module.exports = matchmakerRouter;
