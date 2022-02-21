const path = require("path");

const express = require("express");
const {v4} = require("uuid");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const models = require("./models/data");
const User = require("./models/user");
const Message = require("./models/message");

const sessionRouter = require("./routes/session");
const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");

dotenv.config({path: "./.env"});

const connectDB = async () => { await mongoose.connect(process.env.MONGODB)};

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

app.use("/session", sessionRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);


connectDB().then(async () => {
    app.listen(port, () => {console.log(`listening on ${port}.`)})
})