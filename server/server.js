const _ = require('lodash');
const axios = require('axios');
const express = require('express');
// Connect to database
require('./database/connect');

const { BreedInfo } = require('./database/models/breedInfo');
const { Dog } = require('./database/models/dog');
const { getDogInfo } = require('./logic/getDogInfo');
const populateRouter = require('./routers/populateRouter');


const app = express();
const port = 5000;

process.env.ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBmZGJkMjBkODc1NDlkNjYyNjM1NGQzYWVjOWQwMTljYWViMjA4MTIxY2VhOTJkYWY1MWQ2OTFmYmExNjYyYmQzODY2MTkxOGRjMmUzZDlmIn0.eyJhdWQiOiI4bVdlOGhDT0VCWHEzT3RETDhsRTVwdTFTbmhnSWZnMXp0T1Z4MTgwTDRyaDFRVExWcSIsImp0aSI6IjBmZGJkMjBkODc1NDlkNjYyNjM1NGQzYWVjOWQwMTljYWViMjA4MTIxY2VhOTJkYWY1MWQ2OTFmYmExNjYyYmQzODY2MTkxOGRjMmUzZDlmIiwiaWF0IjoxNTU4OTA3NzEzLCJuYmYiOjE1NTg5MDc3MTMsImV4cCI6MTU1ODkxMTMxMywic3ViIjoiIiwic2NvcGVzIjpbXX0.F5LXQfYZJshbhuiesQ-ViO5iwbj2uzfmBKt4qG4zMrPdrZX0WkBY88TtpbUISuJ81NhDsfQDl3ZUMvKmxFBDg5wz9fMQ3SLmK6-ZOiz2vALiJkmJaXCeJUJLHR0aAI17fQlLaRbdmGZM_WtuE9cIXQRBUeIH33dzmiTZJn8SzFbzBwRSy0kVNM20JeiA1tqkTAVvIIZfmIbNO3DXsdO6CTyVeDYwvhBkbXsRe1jx1qXY5XVzkI5UyOXgIHNyPenwZcWuHbB9hK9_VbrF5gQj7HBKKbEjK74Dt0SBZ_TeAlyIaVJJDM1aGlwUSmzg7idQ1w8E-OrSpjxiicAFDTFwQg"

app.use('/populate', populateRouter);

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
    Dog.find({}).then((dogs) => {
        res.send(dogs).status(200);
    });
});

app.get('/dog', (req, res) => {
    const id = req.query.id;
    Dog.find({id: id}).then((dog) => {
        res.send(dog).status(200);
    });
});

app.get('/breeds', (req, res) => {
    BreedInfo.find({}).then((breeds) => {
        res.send(breeds).status(200);
    }, (e) => {
        console.log(e);
    });
});


app.listen(process.env.PORT || port, () => console.log(`matchmaker running on port ${process.env.PORT || port}`));
