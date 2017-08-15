const express = require("express");

const app = express();

app.use(express.static("public"));

const server = app.listen(8080, function(){
    console.log("Server running on port 8080");
});


module.exports = server;