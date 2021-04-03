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

router.get("/", (req, res) => {
    res.render("dreams");
});

router.get("/dreams", (req, res) => {
    fs.readFile(db, (err, data) => {
        if (err) throw err;

        const todos = JSON.parse(data);
        const notCompletedTodos = todos.filter((todo) => !todo.completed);

        res.render("dreams", { todos: notCompletedTodos });
    });
});

router.post("/dreams", (req, res) => {
    const dream = req.body.todo;

    if (todo.trim() === "") {
        fs.readFile(db, (err, data) => {
            if (err) throw err;
            const dreams = JSON.parse(data);
            const notCompletedTodos = todos.filter((todo) => !todo.completed);

            res.render("not-completed", { error: true, todos: notCompletedTodos });
        });
    } else {
        fs.readFile(db, (err, data) => {
            if (err) throw err;
            const todos = JSON.parse(data);

            todos.push({
                id: id(),
                text: todo,
            });

            fs.writeFile(db, JSON.stringify(todos), (err) => {
                if (err) throw err;
                const notCompletedTodos = todos.filter((todo) => !todo.completed);

                res.render("not-completed", { success: true, todos: notCompletedTodos });
            });
        });
    }
});

router.get("/not-completed/:id/complete", (req, res) => {
    fs.readFile(db, (err, data) => {
        if (err) throw err;
        const todos = JSON.parse(data);

        todos.find((todo) => todo.id == req.params.id).completed = true;

        fs.writeFile(db, JSON.stringify(todos), (err) => {
            if (err) throw err;

            const notCompletedTodos = todos.filter((todo) => !todo.completed);

            res.render("not-completed", { completed: true, todos: notCompletedTodos });
        });
    });
});

router.get("/completed", (req, res) => {
    fs.readFile(db, (err, data) => {
        if (err) throw err;

        const todos = JSON.parse(data);
        const completedTodos = todos.filter((todo) => todo.completed);

        res.render("completed", { todos: completedTodos });
    });
});

router.get("/:id", (req, res) => {
    fs.readFile(db, (err, data) => {
        if (err) throw err;

        const todos = JSON.parse(data);
        const todo = todos.find((todo) => todo.id == req.params.id);

        res.render("todo", { todo: todo });
    });
});

function id() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

module.exports = router;
