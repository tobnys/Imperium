const express = require("express");
const router = express.Router();

const {publicDir} = require("../config");

router.get("/", (req, res) => { 
    res.status(200).sendFile(publicDir + "/index.html");
});

module.exports = router;