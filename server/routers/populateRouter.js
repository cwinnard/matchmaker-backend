const _ = require('lodash');
const axios = require('axios');
const express = require('express');

const { Dog } = require('../database/models/dog');
const { BreedInfo } = require('../database/models/breedInfo');
const { SurveyRes } = require('../database/models/surveyRes');
const { getBreedHandle } = require('../logic/getBreedHandle');
const { surveyDogTypes } = require('../logic/surveyDogTypes');
const { extractBreedInfo } = require('../logic/extractBreedInfo');
const { populateDogRecords } = require('../logic/populateDogRecords');


const populateRouter = express.Router();

populateRouter.get('/take-survey', (req, res) => {
    const HEADER =  { headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN } };
    const page = req.query.page || 1;
    const orgId = req.query.orgId || 1;
    axios.get(`https://api.petfinder.com/v2/animals?organization=${orgId}&page=${page}`, HEADER).then((petfinderRes) => {
        const surveyReses = surveyDogTypes(petfinderRes.data);
        const models = surveyReses.map((surveyRes) => {
            return new SurveyRes(surveyRes);
        });
        SurveyRes.collection.insertMany(models);
        res.send(surveyReses).status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    });
});

populateRouter.get('/survey-results', (req, res) => {
    SurveyRes.find({}).then((results) => {
        const breeds = results.map((result) => { return result.breeds; });
        const countedPrimaries = _.countBy(breeds, (breed) => { return breed.primary });
        const countedSecondaries = _.countBy(breeds, (breed) => { return breed.secondary });
        res.send({ countedPrimaries, countedSecondaries }).status(200);
    });
});

populateRouter.get('/dog-chars', (req, res) => {
    const akcHandle = req.query.akcHandle;
    axios.get(`https://www.akc.org/dog-breeds/${akcHandle}/`).then((pageRes) => {
        const split = pageRes.data.split("googletag.pubads().setTargeting('characteristic',");
        const array = split[1].split(");\n");
        const finalArray = JSON.parse(array[0]);
        BreedInfo.findOne({akcHandle: akcHandle}).then((breedInfo) => {
            if (!breedInfo) {
                const info = new BreedInfo(extractBreedInfo(finalArray, akcHandle));
                info.save();
            } else {
                console.log(`Already have record for ${akcHandle}`);
            }
        });
        res.send(finalArray).status(200);
    });
});

populateRouter.get('/get-all-breed-info', (req, res) => {
    axios.get('https://www.akc.org/dog-breeds/').then((pageRes) => {
        const regex = /https:\/\/www.akc.org\/dog-breeds\/.+\//g;
        const textToSearch = pageRes.data.split('Yorkshire Terrier<')[0];
        const urls = textToSearch.match(regex);
        urls.shift();
        urls.shift();
        urls.shift();
        const handles = urls.map((url) => { return getBreedHandle(url) });

        handles.forEach((handle) => {
            axios.get(`https://www.akc.org/dog-breeds/${handle}`).then((pageRes) => {
                const split = pageRes.data.split("googletag.pubads().setTargeting('characteristic',");
                const array = split[1].split(");\n");
                const finalArray = JSON.parse(array[0]);
                BreedInfo.findOne({akcHandle: handle}).then((breedInfo) => {
                    if (!breedInfo) {
                        const info = new BreedInfo(extractBreedInfo(finalArray, handle));
                        info.save();
                    } else {
                        console.log(`Already have record for ${handle}`);
                    }
                });
            }, (e) => {
                console.log(e);
            });
        })
        res.send(handles).status(200);
    });
});

populateRouter.get('/populate-dog-records', (req, res) => {
    const HEADER =  { headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN } };
    const page = req.query.page || 1;
    const orgId = req.query.orgId || CO385;
    axios.get(`https://api.petfinder.com/v2/animals?organization=${orgId}&page=${page}`, HEADER).then((petfinderRes) => {
        populateDogRecords(petfinderRes.data.animals).then((dogs) => {
            Dog.collection.insertMany(dogs);
            res.send(dogs).status(200);
        });
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    })
});


module.exports = populateRouter;
