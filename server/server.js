const axios = require('axios');
const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
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

app.listen(process.env.PORT || port, () => console.log(`matchmaker running on port ${port}`));
