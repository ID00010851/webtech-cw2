//setup
const express = require("express");
const router = express.Router();

//extra-tools
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename || process.require.main.filename);

//database
const data = path.join(root, "data/dreams.json");

router.get("/add", (req, res) => {
    res.render("add-dream");
});


router.get("/dreams", (req, res) => {
    fs.readFile(data, (err, data) => {
        if (err) throw err;

        const dreams = JSON.parse(data);

        res.render("dreams", { dreams: dreams });
    });
});

router.get("/id", (req, res) => {
    res.render("dream");
});

function id() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
