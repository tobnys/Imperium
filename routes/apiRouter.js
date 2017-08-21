const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

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

router.put("/empire/:id", jsonParser, (req, res) => {
    if(!req.params.id){
        res.sendStatus(400);
    }

    const updated = {};
    const updateableFields = ["score", "level", "money", "workers", "industryBuildings", "companies"];
    updateableFields.forEach(field => {
        updated[field];
    });


    Empire.findOne({id: req.params.id}).exec().then(function(empire){

    })
});



module.exports = router;