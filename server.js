// REQUIRE
const express = require("express");
const {PORT, TEST_DATABASE_URL, publicDir} = require("./config")
const homeRouter = require("./routes/homeRouter");
const gameRouter = require("./routes/gameRouter");
const apiRouter = require("./routes/apiRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const uuidv4 = require("uuid");

const {Empire} = require("./models");

const app = express();
app.use(express.static(publicDir));
console.log(publicDir);
app.use("/", homeRouter);
app.use("/api", apiRouter);
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// SERVER LOGIC
function seedDatabase() {
    console.log("Seeding database");
    Empire.create({
        name: "British Empire",
        id: 1,
        score: 0,
        level: 1,
        money: 500,
        totalRevenue: 0,
        civilians: 0,
        workers: 0,
        industryBuildings: 0,
        companies: 0,
        moneyFactory: 0,
        hospital: 0,
        jobCenter: 0,
        totalBoost: 0,
    });
    
    Empire.create({
        name: "American Empire",
        id: 2,
        score: 0,
        level: 1,
        money: 500,
        totalRevenue: 0,
        civilians: 0,
        workers: 0,
        industryBuildings: 0,
        companies: 0,
        moneyFactory: 0,
        hospital: 0,
        jobCenter: 0,
        totalBoost: 0,
    });
    
    Empire.create({
        name: "French Empire",
        id: 3,
        score: 0,
        level: 1,
        money: 500,
        totalRevenue: 0,
        civilians: 0,
        workers: 0,
        industryBuildings: 0,
        companies: 0,
        moneyFactory: 0,
        hospital: 0,
        jobCenter: 0,
        totalBoost: 0,
    });
};

// SEED DATABASE WITH SAMPLE CHARACTERS
Empire.findOne({id: 1}).exec(function(err, res) {
    if(res === null) {
        seedDatabase();
    }
});

// Catch all other routes that do not send a response and give an error message to the client.
app.all("*", (req, res) => {
    res.sendStatus(500);
});


let server;
function runServer(databaseURL=DATABASE_URL, port=PORT){
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