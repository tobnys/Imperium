const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const EmpireSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: String,
  score: Number,
  level: Number,
  money: Number,
  civilians: Number,
  workers: Number,
  industryBuildings: Number,
  companies: Number,
});

EmpireSchema.methods.apiRepr = function(){
  return {
    name: this.name,
    score: this.score,
    level: this.level,
    civilians: this.civilians,
    money: this.money,
    workers: this.workers,
    industryBuildings: this.industryBuildings,
    companies: this.companies
  };
}

const Empire = mongoose.model('Empire', EmpireSchema);

module.exports = {Empire};