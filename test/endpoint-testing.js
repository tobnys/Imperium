const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const uuidv4 = require("uuid");
const mongoose = require("mongoose");

const {TEST_DATABASE_URL, PORT} = require("../config");
const {app, runServer, closeServer} = require("../server");
const {Empire} = require("../models");

chai.use(chaiHttp);

function dropDatabase(){
    return new Promise((resolve, reject) => {
        mongoose.connection.dropDatabase().then(result => resolve(result)).catch(err => reject(err));
    })
};

function seedDatabase(){
    return Empire.create({
        name: "Test Empire 1",
        id: 10,
        score: 123,
        level: 5,
        money: 1234234,
        workers: 58,
        industryBuildings: 37,
        companies: 12
    });
};

describe("Endpoint testing", function(){

    before(function(){
        return runServer(databaseURL=TEST_DATABASE_URL, port=PORT);
    });

    after(function(){
        return closeServer();
    });

    beforeEach(function(){
        return seedDatabase();
    });

    afterEach(function(){
        return dropDatabase();
    });

    describe("GET endpoints", function(){
        
            it("should return status 200 on root GET", function(){
                return chai.request(app).get("/").then(function(res){
                    res.should.have.status(200);
                });
            });
            
            it("should return status 200 on /game GET", function(){
                return chai.request(app).get("/game").then(function(res){
                    res.should.have.status(200);
                });
            });
            
            it("should return empires on GET", function(){
                let res;
                return chai.request(app).get("/api/empire").then(function(_res){
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.length.of.at.least(1);
                    return Empire.count();
                }).then(count => {
                    res.body.should.have.length.of.at.least(count);
                });
            });
        });


    describe("PUT endpoint", function(){

        it("should update an empire on PUT", function(){
            const updatedEmpire = {
                name: "Test Empire 1",
                score: 555,
                level: 666,
                money: 777,
                workers: 888,
                industryBuildings: 999,
                companies: 000
            }
            
            return Empire.findOne().exec().then(function(empire){
                updatedEmpire.id = empire.id;
                return chai.request(app).put(`/api/empire/${updatedEmpire.id}`).send(updatedEmpire);
            }).then(function(res){
                console.log("2")
                res.should.have.status(201);
                return Empire.findOne({id: updatedEmpire.id}).exec();
            }).then(function(empire){
                updatedEmpire.name.should.equal(empire.name);
                updatedEmpire.score.should.equal(empire.score);
                updatedEmpire.money.should.equal(empire.money);
            });
        });
    });
});


