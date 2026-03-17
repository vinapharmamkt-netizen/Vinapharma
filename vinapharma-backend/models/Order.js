const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  qty:         { type: Number, required: true, min: 1 },
  unitPrice:   { type: Number, required: true, min: 0 },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerName:  { type: String, required: true, trim: true },
  customerPhone: { type: String, trim: true, default: '' },
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  items:         { type: [orderItemSchema], default: [] },
  totalAmount:   { type: Number, required: true, min: 0 },
  note:          { type: String, default: '' },
  status:        { type: String, enum: ['completed', 'cancelled'], default: 'completed' },
}, { timestamps: true });

// Virtual: tổng số lượng sản phẩm
orderSchema.virtual('totalQty').get(function () {
  return this.items.reduce((s, i) => s + i.qty, 0);
});

module.exports = mongoose.model('Order', orderSchema);
