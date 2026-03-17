const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceNo:   { type: String, default: '' },   // Số hóa đơn / mã đơn hàng
  description: { type: String, default: '' },   // Mô tả nội dung
  amount:      { type: Number, required: true, min: 0 }, // Số tiền VND
  status:      { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
  dueDate:     { type: Date },                  // Ngày đến hạn
  paidDate:    { type: Date },                  // Ngày đã thanh toán
  note:        { type: String, default: '' }    // Ghi chú admin
}, { timestamps: true });

module.exports = mongoose.model('Debt', debtSchema);
