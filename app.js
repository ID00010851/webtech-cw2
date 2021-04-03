//setup
const express = require("express");
const app = express();

//port
const PORT = 8000;

//routes
const dreams = require("./routes/dreams.js");

//extra-tools
const fs = require("fs");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/dreams", dreams);

app.get("/api/v1/todos", (req, res) => {
    fs.readFile("./database/todos.json", (err, data) => {
        if (err) throw err;

        const todos = JSON.parse(data);

        res.json(todos);
    });
});

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});