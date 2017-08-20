const express = require("express");
const router = express.Router();

const {Empire} = require("../models");

router.get("/empire", (req, res) => {
    Empire.find().exec().then(function(empire){
        res.json(empire.map(e => e.apiRepr()));
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

router.get("/empire/:id", (req, res) => {
    Empire.findOne({id: req.params.id}).exec().then(function(empire){
        res.json(empire.apiRepr());
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    }); 
});

module.exports = router;