const express = require("express");
const router = express.Router();

const {publicDir} = require("../config")

router.get("/", (req, res) => { 
    res.sendFile(publicDir + "/game.html");
});

module.exports = router;