// REQUIRE
const express = require("express");
const {PORT, publicDir} = require("./config")
const homeRouter = require("./routes/homeRouter")
const gameRouter = require("./routes/gameRouter")

const app = express();
app.use(express.static(publicDir));
app.use("/", homeRouter);
app.use("/game", gameRouter);

// SERVER LOGIC

// Catch all other routes that do not send a response and give an error message to the client.
app.all("*", (req, res) => {
    res.sendStatus(500);
});

const server = app.listen(PORT, function(){
    console.log(`Running on port ${PORT}`)
});




module.exports = server;