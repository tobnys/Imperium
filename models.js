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
  totalRevenue: Number,
  civilians: Number,
  workers: Number,
  industryBuildings: Number,
  companies: Number,
  moneyFactory: Number,
  hospital: Number,
  jobCenter: Number,
  totalBoost: Number,
});

EmpireSchema.methods.apiRepr = function(){
  return {
    name: this.name,
    score: this.score,
    level: this.level,
    money: this.money,
    totalRevenue: this.totalRevenue,
    civilians: this.civilians,
    workers: this.workers,
    industryBuildings: this.industryBuildings,
    companies: this.companies,
    moneyFactory: this.moneyFactory,
    hospital: this.hospital,
    jobCenter: this.jobCenter,
    totalBoost: this.totalBoost,
  };
}

const Empire = mongoose.model('Empire', EmpireSchema);

module.exports = {Empire};