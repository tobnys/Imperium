const express = require("express");
const router = express.Router();

const {publicDir} = require("../config");

router.get("/", (req, res) => { 
    res.status(200).sendFile(publicDir + "/index.html");
});

router.get("/character", (req, res) => { 
    res.status(200).sendFile(publicDir + "/character.html");
});

router.get("/economics", (req, res) => { 
    res.status(200).sendFile(publicDir + "/economics.html");
});

module.exports = router;