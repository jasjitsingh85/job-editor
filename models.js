const mongoose = require('mongoose');


const jobSchema = mongoose.Schema({
  title: {type: String, required: true},
  company: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true},

});

jobSchema.methods.serialize  = function() {
  return {
    id: this._id,
    title: this.title,
    company: this.company,
    location: this.location,
    description: this.description
  };
}

const Job = mongoose.model('Job', jobSchema, 'job');

module.exports = { Job };