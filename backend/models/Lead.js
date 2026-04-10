const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  phone:       { type: String, required: true },
  service:     { type: String, required: true },
  description: { type: String, required: true },
  budget:      { type: String, required: true },
  score:       { type: String, enum: ['HOT', 'WARM', 'COLD'], default: 'COLD' },
  reason:      { type: String, default: '' },
  createdAt:   { type: Date, default: Date.now },
})

module.exports = mongoose.model('Lead', leadSchema)
