const express = require("express");
const router = express.Router();
const passport = require("passport");
const {jwtStrategy} = require("../strategy/authStrategies")

const {publicDir} = require("../config");

passport.use(jwtStrategy);

router.get("/", passport.authenticate('basic', {session: false}), (req, res) => { 
    res.sendFile(publicDir + "/game.html");
    console.log(req.user);
});

router.get("/character", passport.authenticate('jwt', {session: false}), (req, res) => { 
    res.sendFile(publicDir + "/character.html");
});

router.get("/economics", passport.authenticate('jwt', {session: false}), (req, res) => { 
    res.sendFile(publicDir + "/economics.html");
});

module.exports = router;