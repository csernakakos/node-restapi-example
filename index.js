const express = require("express");
const {v4} = require("uuid");
const dotenv = require("dotenv");
const path = require("path");
let models = require("./models/data");

dotenv.config({path: "./.env"});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    }
    next();
});

app.get("/session", (req, res, next) => {
    res.send(req.context.models.users[req.context.me.id]);
});

// GET
app.get("/users", (req, res) => {
    res.json(Object.keys(req.context.models.users));
});

app.get("/users/:userID", (req, res) => {
    res.json(req.context.models.users[req.params.userID]);
});

app.get("/messages", (req, res) => {
    res.json(Object.values(req.context.models.messages));
});

app.get("/messages/:messageID", (req, res) => {
    res.json(req.context.models.messages[req.params.messageID]);
})


// POST
app.post("/messages", (req, res) => {
    const ID = v4();
    const message = {
        ID,
        text: req.body.text,
        userID: req.context.me.id,
    };

    req.context.models.messages[ID] = message;
    res.json(Object.values(message));
});

app.delete("/messages/:messageID", (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
      } = req.context.models.messages;

    req.context.models.messages = otherMessages;
    res.json(message);
});

app.listen(port, () => {console.log(`listening on ${port}.`)})