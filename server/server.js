const axios = require('axios');
const express = require('express');
const fs = require('fs');

const { getDogInfo } = require('../logic/getDogInfo');

const { Dog } = require('./database/models/dog');


const app = express();
const port = 5000;

// Connect to database
require('./database/connect');

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNkMzBkZmIxODcxYzg1MDdlNGNlMDlhOTE0MWQ1ODA4ZDM2Y2I5NTgwYTdhY2JlNmNiOTI0YmJmNjY1NzdlMTdlOTcxMzkwNGQ4NmZjMWE3In0.eyJhdWQiOiI4bVdlOGhDT0VCWHEzT3RETDhsRTVwdTFTbmhnSWZnMXp0T1Z4MTgwTDRyaDFRVExWcSIsImp0aSI6ImNkMzBkZmIxODcxYzg1MDdlNGNlMDlhOTE0MWQ1ODA4ZDM2Y2I5NTgwYTdhY2JlNmNiOTI0YmJmNjY1NzdlMTdlOTcxMzkwNGQ4NmZjMWE3IiwiaWF0IjoxNTU1MjYxMjM1LCJuYmYiOjE1NTUyNjEyMzUsImV4cCI6MTU1NTI2NDgzNCwic3ViIjoiIiwic2NvcGVzIjpbXX0.qcPRKAQYp2xuTWcwsyIQ1sTpzy7K98d2v1ZJOMAeBPjzv7BHRTPlJGD-DtkIHgjiK3QkONErC5bINDzNupOYY2aRAXbdK8NxEJnaMIbnI9TR8Ff7ugc4i9RYRpyBaoSdWipwdJhw0sxAwOPiMR6UE031UCgkw34ZTuOmU4PYoHe3sdq1diaqKsSZEuI73ywKXUTde_OUh0NmQTwf1tgoJqn68GMi888e2EMeQSYbpIeT1MGTImhuZV5ZzVDXpqNoKmw9We-1iItlDisBhJHtzcBe60YhG9sotVKqPj7r39Q_MKfGJeuF18kqz8CMI5Vicf1TXJCuFH2ggy5TQWLsvg'
const HEADER =  { headers: { 'Authorization': 'Bearer ' + ACCESS_TOKEN } };

app.get('/token', (req, res) => {
    const payload = {
        'grant_type': 'client_credentials',
        'client_id': '8mWe8hCOEBXq3OtDL8lE5pu1SnhgIfg1ztOVx180L4rh1QTLVq',
        'client_secret': '8ElLu03cVal1FUXtzBZkj6u3AFknuvHdSeJFCy1G',
    };
    axios.post('https://api.petfinder.com/v2/oauth2/token', payload).then((petfinderRes) => {
        console.log(petfinderRes);
        res.send(petfinderRes).status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(500);
    })
});

app.get('/dogs', (req, res) => {
    axios.get('https://api.petfinder.com/v2/animals?organization=CO395', HEADER).then((petfinderRes) => {
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
