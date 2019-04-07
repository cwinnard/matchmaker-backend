const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(process.env.PORT || port, () => console.log(`matchmaker running on port ${port}`));
