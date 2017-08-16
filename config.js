const path = require("path");

const config = {
    publicDir: path.join(__dirname, 'public'),
    PORT: process.env.PORT || 8080
}

module.exports = config;