const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
