const _ = require('lodash');
const express = require('express');

const { Dog } = require('../database/models/dog');

const matchmakerRouter = express.Router();

matchmakerRouter.get('/test', (req, res) => {
    const myScores = [];
    res.send(myScores).status(200);
});

module.exports = matchmakerRouter;
