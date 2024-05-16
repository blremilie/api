const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/shorten', async (req, res) => {
    const {url} = req.body;
    try {
        const response = await fetch("https://cleanuri.com/api/v1/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `url=${url}`
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log(`Example app listening at Port: ${3001}`);
});