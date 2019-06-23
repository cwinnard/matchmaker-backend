const express = require('express');

const { Dog } = require('../database/models/dog');

const adminRouter = express.Router();

adminRouter.get('/dogs', (req, res) => {
    Dog.find({}).then((dogs) => {
        res.send(dogs).status(200);
    });
});

module.exports = adminRouter;
