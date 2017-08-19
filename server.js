// REQUIRE
const express = require("express");
const {PORT, TEST_DATABASE_URL, publicDir} = require("./config")
const homeRouter = require("./routes/homeRouter");
const gameRouter = require("./routes/gameRouter");
const userRouter = require("./routes/userRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const passport = require("passport");

const {User} = require("./models");
const {basicStrategy, jwtStrategy} = require("./strategy/authStrategies");

const app = express();
app.use(express.static(publicDir));
app.use("/", homeRouter);
app.use("/game", gameRouter);
app.use("/user", userRouter);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

passport.use(basicStrategy);

// SERVER LOGIC
// Catch all other routes that do not send a response and give an error message to the client.
app.all("*", (req, res) => {
    res.sendStatus(500);
});

let server;
function runServer(databaseURL=TEST_DATABASE_URL, port=PORT){
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseURL, err => {
            if(err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Running on port ${port}`);
                resolve();
            }).on("error", err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log(`Server closing.`);
            server.close(err => {
                if(err) {
                    reject(err);
                }
                else resolve();
            })
        });
    });
};

if(require.main === module) {
    runServer().catch(err => console.error(err));
};


module.exports = {runServer, closeServer, app};