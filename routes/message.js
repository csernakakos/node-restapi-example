const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(Object.values(req.context.models.messages));
});

router.get("/:messageID", (req, res) => {
    res.json(req.context.models.messages[req.params.messageID]);
});

router.post("/", (req, res) => {
    const ID = v4();
    const message = {
        ID,
        text: req.body.text,
        userID: req.context.me.id,
    };

    req.context.models.messages[ID] = message;
    res.json(Object.values(message));
});

router.delete("/messages/:messageID", (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
      } = req.context.models.messages;

    req.context.models.messages = otherMessages;
    res.json(message);
});

module.exports = router;