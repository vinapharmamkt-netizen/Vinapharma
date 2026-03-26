const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name:           { type: String, required: true, trim: true },
  description:    { type: String, default: '' },
  image:          { type: String, default: '' },
  pointsRequired: { type: Number, required: true, min: 1 },
  type:           { type: String, enum: ['all', 'btob'], default: 'all' }, // 'all' = tất cả, 'btob' = chỉ BtoB
  rankRequired:   { type: String, enum: ['thanh-vien','dong','bac','vang','kim-cuong'], default: 'thanh-vien' },
  stock:          { type: Number, default: -1 },  // -1 = không giới hạn
  active:         { type: Boolean, default: true },
  order:          { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
