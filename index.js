var express = require("express");
var app = express();
let data = require('./data.json');
const fs = require("fs");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    app.get("/", (req, res, next) => {
        res.json(data);
    });

    app.post("/movie", function (req, res) {
        let temp = {
            title: req.body.title,
            protagonist: req.body.protagonist,
            about: req.body.about,
            director: req.body.director
        }
        data.push(temp);
        let updated = JSON.stringify(data);
        fs.writeFileSync('data.json', updated);
        res.send(temp);
    });
});