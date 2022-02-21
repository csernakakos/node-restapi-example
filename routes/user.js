const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    const users = await User.find();
    // res.json(Object.keys(req.context.models.users));
    res.json(users);
});

router.get("/:userID", (req, res) => {
    res.json(req.context.models.users[req.params.userID]);
});

module.exports = router;