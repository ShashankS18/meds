const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
