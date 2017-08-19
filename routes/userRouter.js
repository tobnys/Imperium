const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const uuidv4 = require("uuid/v4");
const passport = require("passport");
const config = require("../config");
const jwt = require("jsonwebtoken");

const {User} = require("../models")

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// JWT CREATION
const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
      subject: user.username,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256'
    });
};

router.post('/login', passport.authenticate('basic', {session: false}), (req, res) => {
    const authToken = createAuthToken(req.user.apiRepr());
    res.json({authToken});
    }
);

router.post("/register", jsonParser, (req, res) => {
    const requiredFields = ["username", "password"];
    const stringFields = ["username", "password"];
    const nonStringFields = stringFields.find(field => (field in req.body) && typeof req.body[field] !== "string");
    const sizedFields = {
        username: {
            min: 3,
            max: 20
        },
        password: {
            min: 6,
            max: 72
        }
    }
    console.log(req.body)
    const tooSmallField = Object.keys(sizedFields).find(field =>
        'min' in sizedFields[field] &&
        req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(field =>
        'max' in sizedFields[field] &&
        req.body[field].trim().length > sizedFields[field].max
    );

    if(nonStringFields){
        return {
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringFields
        }
    };

    if(tooSmallField || tooLargeField){
        return {
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField ?
                `Must be at least ${sizedFields[tooSmallField].min} characters long` :
                `Must be at most ${sizedFields[tooLargeField].max} characters long`,
          location: tooSmallField || tooLargeField
        }
    };
    let newID = uuidv4();
    console.log(newID);
    let {username, password} = req.body;
    return User
    .find({username})
    .count()
    .then(count => {
        if(count > 0){
            res.json({
                code: 422,
                reason: 'ValidationError',
                message: 'Username already taken',
                location: 'username'
            })
        }
        return User.hashPassword(password);
    })
    .then(hash => {
        console.log("user.create")
        return User.create({
            username,
            password: hash,
            id: newID
        })
    }).then(user => {
        return res.status(201).json(user.apiRepr());
    }).catch(err => {
        if(err.reason === "ValidationError") {
            return res.status(err.code).json(err);
        }
        res.status(500).json({code: 500, message: 'Internal server error'});
        console.log(err);
    });
});

module.exports = router;