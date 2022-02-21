const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(Object.keys(req.context.models.users));
});

router.get("/:userID", (req, res) => {
    res.json(req.context.models.users[req.params.userID]);
});

module.exports = router;