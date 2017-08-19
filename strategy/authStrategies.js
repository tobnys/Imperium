const passport = require('passport');
const {JWT_SECRET, JWT_EXPIRY} = require("../config");
const {BasicStrategy} = require('passport-http');
const {
    // Assigns the Strategy export to the name JwtStrategy using object
    // destructuring
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Assigning_to_new_variable_names
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

const {User} = require("../models");

const basicStrategy = new BasicStrategy((username, password, callback) => {
    let user;
    User.findOne({username: username}).then(_user => {
        user = _user;
        if(!user) {
            return Promise.reject({
                reason: "LoginError",
                message: "Invalid username or password"
            });
        }
        return user.validatePassword(password);
    }).then(isValid => {
        if(!isValid) {
            return Promise.reject({
                reason: "LoginError",
                message: "Invalid username or password"
            });
        }
        return callback(null, user);
    }).catch(err => {
        if(err.reason === "LoginError") {
            return callback(null, false, err);
        }
        return callback(err, false);
    });
});

const jwtStrategy = new JwtStrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    algorithms: ["HS256"]
    },
    (payload, done) => {
        done(null, payload.user)
    }
);

module.exports = {basicStrategy, jwtStrategy};