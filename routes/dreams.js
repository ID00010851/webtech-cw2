//setup
const express = require("express");
const router = express.Router();

//extra-tools
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename || process.require.main.filename);

//database
const database = path.join(root, "data/dreams.json");

router.get("/", (req, res) => {
    fs.readFile(database, (err, data) => {
        if (err) throw err;

        const dreams = JSON.parse(data);

        res.render("dreams", { dreams: dreams });
    });
});

router.post("/", (req, res) => {
    const dream = {
        id: id(),
        title: req.body.title,
        detail: req.body.detail,
    };

    if (dream.title.trim() == "" || dream.detail.trim() == "") {
        res.render("add-dream", { error: true })
    } else {
        fs.readFile(database, (err, data) => {
            if (err) throw err;

            const dreams = JSON.parse(data);

            dreams.push(dream);

            fs.writeFile(database, JSON.stringify(dreams), (err) => {
                if (err) throw err;

                res.render("dreams", { dreams: dreams, success: true });
            });
        });
    }
});

router.get("/add", (req, res) => {
    res.render("add-dream");
});

router.get("/:id", (req, res) => {
    fs.readFile(database, (err, data) => {
        if (err) throw err;

        const dreams = JSON.parse(data);
        const dream = dreams.find((dream) => dream.id == req.params.id);

        res.render("dream", { dream: dream });
    });
});

router.get("/:id/delete", (req, res) => {
    fs.readFile(database, (err, data) => {
        if (err) throw err;

        const dreams = JSON.parse(data);
        const dreamIndex = dreams.findIndex((dream) => dream.id == req.body.id);

        dreams.splice(dreamIndex, 1);

        fs.writeFile(database, JSON.stringify(dreams), (err) => {
            if (err) throw err;

            res.render("dreams", { dreams: dreams, delete_success: true });
        });
    });
});

function id() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = router;
