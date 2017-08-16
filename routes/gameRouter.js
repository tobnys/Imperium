const express = require("express");
const router = express.Router();

const {publicDir} = require("../config")

router.get("/", (req, res) => { 
    res.sendFile(publicDir + "/game.html");
});

router.get("/character", (req, res) => { 
    res.sendFile(publicDir + "/character.html");
});

router.get("/economics", (req, res) => { 
    res.sendFile(publicDir + "/economics.html");
});

module.exports = router;