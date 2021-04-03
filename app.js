//setup
const express = require("express");
const app = express();

//routes
const dreams = require("./routes/dreams.js");

//extra-tools
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename || process.require.main.filename);

//database
const database = path.join(root, "data/dreams.json");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/dreams", dreams);

app.get("/api/v1/dreams", (req, res) => {
    fs.readFile(database, (err, data) => {
        if (err) throw err;

        const dreams = JSON.parse(data);

        res.json(dreams);
    });
});

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});