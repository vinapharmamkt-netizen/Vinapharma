const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reward:         { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  rewardName:     { type: String },          // snapshot tên quà lúc đổi
  pointsUsed:     { type: Number, required: true },
  status:         { type: String, enum: ['pending', 'fulfilled', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Redemption', redemptionSchema);
