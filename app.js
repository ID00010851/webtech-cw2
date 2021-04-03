//setup
const express = require("express");
const app = express();

//routes
const dreams = require("./routes/dreams.js");

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/dreams", dreams);

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});