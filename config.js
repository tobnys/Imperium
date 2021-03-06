const path = require("path");

const config = {
    publicDir: path.join(__dirname, 'public'),
    PORT: process.env.PORT || 8080,
    TEST_DATABASE_URL: "mongodb://tobnys:testpw@ds145223.mlab.com:45223/imperium",
    DATABASE_URL: process.env.DATABASE_URL
}

module.exports = config;