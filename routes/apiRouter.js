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
    const updateableFields = ["score", "level", "money", "totalRevenue", "civilians", "workers", "industryBuildings", "companies", "moneyFactory", "hospital", "jobCenter", "totalBoost"];
    updateableFields.forEach(field => {
        updated[field] = req.body[field];
    });


    Empire.findOneAndUpdate({id: req.params.id}, {$set: updated}, {new: true})
    .exec()
    .then(updatedEmpire => res.status(201).json(updatedEmpire.apiRepr()))
    .catch(err => res.sendStatus(500));
});



module.exports = router;