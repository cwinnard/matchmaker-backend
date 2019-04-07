const axios = require('axios');
const express = require('express');

const app = express();
const port = 5000;

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhMTk5ZGNiMGU0ZTE0MmQwNDFlZmUzOWJiM2FlMDU5YzhhODdjZWIxMWU3YmU4NzM1MzU2Zjg1YzQxODQ0YTQ2NjM3YWZjZjc0YWI3Nzg1In0.eyJhdWQiOiI4bVdlOGhDT0VCWHEzT3RETDhsRTVwdTFTbmhnSWZnMXp0T1Z4MTgwTDRyaDFRVExWcSIsImp0aSI6ImVhMTk5ZGNiMGU0ZTE0MmQwNDFlZmUzOWJiM2FlMDU5YzhhODdjZWIxMWU3YmU4NzM1MzU2Zjg1YzQxODQ0YTQ2NjM3YWZjZjc0YWI3Nzg1IiwiaWF0IjoxNTU0Njc1NjcxLCJuYmYiOjE1NTQ2NzU2NzEsImV4cCI6MTU1NDY3OTI3MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ChNW1TzZ_ntj8zFtKdkSe_QfJ5B7tG39DoWTp5i8aASseUV0oIIRKhueZR84MN4P6IyP-Ia7_p4Bq9cM_zXSdP6XN5sRRmtKYoHP5PhNA_BbOpomcdve7UEiUzTgVFXW_Hx9cmLzEh2Tnw2I_E1ACu33trDHtgAN3LicqlJMciL-aTVC37gmEW7i6Hon6tAoLhZskSKDfQZkb2pQMm0UcY2p_Xv4J3EdRTE0jMml9qte2rE6-SBVeUhJ5MsM1nMM4YO2juCquJjcdW21ZynahHUT-_FW38Zne676w3eXYz3GBcNJgdlRl6_b8sZWRSFi2Vqzsxpuvp9Vnq03NXR4SA';

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
        res.send(e).status(401);
    })
});

app.get('/dogs', (req, res) => {
    axios.get('https://api.petfinder.com/v2/animals?organization=CO395', HEADER).then((petfinderRes) => {
        console.log(petfinderRes);
        res.send(petfinderRes).status(200);
    }, (e) => {
        console.log(e);
        res.send(e).status(401);
    })
});

app.listen(process.env.PORT || port, () => console.log(`matchmaker running on port ${port}`));
