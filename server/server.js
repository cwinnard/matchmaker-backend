const _ = require('lodash');
const axios = require('axios');
const express = require('express');
// Connect to database
require('./database/connect');

const { getDogInfo } = require('./logic/getDogInfo');
const { surveyDogTypes } = require('./logic/surveyDogTypes');
const { extractBreedInfo } = require('./logic/extractBreedInfo');

const { BreedInfo } = require('./database/models/breedInfo');
const { Dog } = require('./database/models/dog');
const { SurveyRes } = require('./database/models/surveyRes');


const app = express();
const port = 5000;

process.env.ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNlMDU1YmM5ZjhmMjBjOTMyMmUzZGRjZDQ4NmYzMjlkMjg3Yjc1NTg0ZmE4NzU0NjMzNmQ5Yjc4N2U3MGYwODFmM2QzYTZhMTY4OWY5YzY3In0.eyJhdWQiOiI4bVdlOGhDT0VCWHEzT3RETDhsRTVwdTFTbmhnSWZnMXp0T1Z4MTgwTDRyaDFRVExWcSIsImp0aSI6ImNlMDU1YmM5ZjhmMjBjOTMyMmUzZGRjZDQ4NmYzMjlkMjg3Yjc1NTg0ZmE4NzU0NjMzNmQ5Yjc4N2U3MGYwODFmM2QzYTZhMTY4OWY5YzY3IiwiaWF0IjoxNTU4ODAwMTYzLCJuYmYiOjE1NTg4MDAxNjMsImV4cCI6MTU1ODgwMzc2Mywic3ViIjoiIiwic2NvcGVzIjpbXX0.k2_cJS03ZaIPeJp1tY1JiHioNfXPTOhqNwdXTK31dBzoozCK7biUziGH3KchEV4v5t75U2lWJvaQwhdCB9rV4jXvFt8D7KCc1Dgk1Ql11cRGVor0yhIdcaAiCabH5SVEMpGwAjQ78AjmOMmdH0C-KYMO4NxRnxotWWVwcAxtl3J51_f8jtxHA4-W-7h9n0hHWDsNhWtEz1cNP-VM2XXkNQv5q0h5Jgkw_-tGyUkbDtpCiI8IwEz2BpGygB71SuqDO2bUCCFxWJXAyDCDGlHiAw8fcw_CW8m6qM-gBUJlQ5TK83ebBW6b9OIEA-blyFeJ8qk_2qJhOYkDuTfqfZJP4A"

app.get('/token', (req, res) => {
    const payload = {
        'grant_type': 'client_credentials',
        'client_id': '8mWe8hCOEBXq3OtDL8lE5pu1SnhgIfg1ztOVx180L4rh1QTLVq',
        'client_secret': '8ElLu03cVal1FUXtzBZkj6u3AFknuvHdSeJFCy1G',
    };
    axios.post('https://api.petfinder.com/v2/oauth2/token', payload).then((petfinderRes) => {
        process.env.ACCESS_TOKEN = petfinderRes.data.access_token;
        res.send(petfinderRes.data).status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    })
});

app.get('/dogs', (req, res) => {
    const HEADER =  { headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN } };
    const page = req.query.page || 1;
    axios.get(`https://api.petfinder.com/v2/animals?organization=CO395&page=${page}`, HEADER).then((petfinderRes) => {
        const dogs = getDogInfo(petfinderRes.data);
        const models = dogs.map((dog) => {
            return new Dog(dog);
        });
        Dog.collection.insertMany(models);
        res.send(dogs).status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    })
});

app.get('/dog', (req, res) => {
    const HEADER =  { headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN } };
    const id = req.query.doggieID;
    axios.get(`https://api.petfinder.com/v2/animals/${id}`, HEADER).then((petfinderRes) => {
        console.log(petfinderRes.data);
        res.send('a').status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    })
});

app.get('/take-survey', (req, res) => {
    const HEADER =  { headers: { 'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN } };
    const page = req.query.page || 1;
    const orgId = req.query.orgId || 1;
    console.log(page);
    console.log(orgId);
    axios.get(`https://api.petfinder.com/v2/animals?organization=${orgId}&page=${page}`, HEADER).then((petfinderRes) => {
        const surveyReses = surveyDogTypes(petfinderRes.data);
        const models = surveyReses.map((surveyRes) => {
            return new SurveyRes(surveyRes);
        });
        console.log(models);
        SurveyRes.collection.insertMany(models);
        res.send(surveyReses).status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    });
});

app.get('/survey-results', (req, res) => {
    SurveyRes.find({}).then((results) => {
        console.log(results);
        const breeds = results.map((result) => { return result.breeds; });
        const countedPrimaries = _.countBy(breeds, (breed) => { return breed.primary });
        const countedSecondaries = _.countBy(breeds, (breed) => { return breed.secondary });
        res.send({ countedPrimaries, countedSecondaries }).status(200);
    });
});

app.get('/dog-chars', (req, res) => {
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

app.get('/get-all-breed-info', (req, res) => {
    axios.get('https://www.akc.org/dog-breeds/').then((pageRes) => {
        const regex = /https:\/\/www.akc.org\/dog-breeds\/.+\//g;
        const textToSearch = pageRes.data.split('Yorkshire Terrier<')[0];
        const urls = textToSearch.match(regex);
        res.send(urls).status(200);
    });
});



app.listen(process.env.PORT || port, () => console.log(`matchmaker running on port ${port}`));
