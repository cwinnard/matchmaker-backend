const axios = require('axios');
const express = require('express');
// Connect to database
require('./database/connect');

const { getDogInfo } = require('../logic/getDogInfo');

const { Dog } = require('./database/models/dog');


const app = express();
const port = 5000;

process.env.ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFlMzQzMzAyNGNlOTlhM2U0NzgwMWQ0YzI0MWJkZjc1OGRjYjcxMmYxODJjNjJmZWIxZGM3Y2I3OWJkZGQwNjEzY2ExYjBmNGQ0NjUwMjE3In0.eyJhdWQiOiI4bVdlOGhDT0VCWHEzT3RETDhsRTVwdTFTbmhnSWZnMXp0T1Z4MTgwTDRyaDFRVExWcSIsImp0aSI6IjFlMzQzMzAyNGNlOTlhM2U0NzgwMWQ0YzI0MWJkZjc1OGRjYjcxMmYxODJjNjJmZWIxZGM3Y2I3OWJkZGQwNjEzY2ExYjBmNGQ0NjUwMjE3IiwiaWF0IjoxNTU1MjY0ODY4LCJuYmYiOjE1NTUyNjQ4NjgsImV4cCI6MTU1NTI2ODQ2OCwic3ViIjoiIiwic2NvcGVzIjpbXX0.rNE0umsVGi58s5YCMNFOOw_G81VWbh-Qg0J-Esg73HeGCdM6RBaEe_FfCLhvPQLdHu7u1lHSPk8JIgZKlmJZqojFf7pnSBvcu1So5A7tXNN47s-yamgplmpUjvQkLSoX1O_CYqngk0T3D14LGHg9F3n9GQzRYKhUHLKMh4SaE7bS1E9GJL09ONjSrO2B1PVYX7NpJN_Bg_evp6l5rHZBAJigj2ZM6TDJ38WNnCCx5u1XcsmfaIreFokhvOa6uemBfOKpl7-9dLSE4BAafdp4kzodC5h86eQ0x0SvEIMjPlKujabeLbI8nX4ftzl9fwz4oCt_CdLNuJH996f34A5S2g"

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


app.listen(process.env.PORT || port, () => console.log(`matchmaker running on port ${port}`));
