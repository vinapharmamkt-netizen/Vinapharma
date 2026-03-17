const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const { protect, adminOnly } = require('../middleware/auth');

// ── helpers ──────────────────────────────────────────────────────────────────
function monthFilter(month, year) {
  if (!year) return {};
  const y = parseInt(year);
  const m = month ? parseInt(month) : null;
  if (m) {
    const start = new Date(y, m - 1, 1);
    const end   = new Date(y, m, 1);
    return { createdAt: { $gte: start, $lt: end } };
  }
  const start = new Date(y, 0, 1);
  const end   = new Date(y + 1, 0, 1);
  return { createdAt: { $gte: start, $lt: end } };
}

// ── GET /api/orders?month=3&year=2026&status=completed ──────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { month, year, status } = req.query;
    const filter = { ...monthFilter(month, year) };
    if (status) filter.status = status;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── GET /api/orders/stats?month=3&year=2026 ─────────────────────────────────
// Trả về: tổng doanh thu, tổng đơn, tổng sp, top spenders, top buyers by qty
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = { status: 'completed', ...monthFilter(month, year) };

    const orders = await Order.find(filter);

    // Tổng quan
    const totalRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
    const totalOrders  = orders.length;
    const totalQty     = orders.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0);

    // Gộp theo khách hàng
    const map = {};
    orders.forEach(o => {
      const key = o.customerPhone || o.customerName;
      if (!map[key]) map[key] = { name: o.customerName, phone: o.customerPhone, totalAmount: 0, totalQty: 0, orderCount: 0 };
      map[key].totalAmount += o.totalAmount;
      map[key].totalQty   += o.items.reduce((a, i) => a + i.qty, 0);
      map[key].orderCount += 1;
    });

    const customers = Object.values(map);
    const topByMoney = [...customers].sort((a, b) => b.totalAmount - a.totalAmount).slice(0, 10);
    const topByQty   = [...customers].sort((a, b) => b.totalQty   - a.totalQty  ).slice(0, 10);

    res.json({ success: true, data: { totalRevenue, totalOrders, totalQty, topByMoney, topByQty } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── POST /api/orders ─────────────────────────────────────────────────────────
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { customerName, customerPhone, items, totalAmount, note, status, userId } = req.body;
    if (!customerName) return res.status(400).json({ success: false, message: 'Vui lòng nhập tên khách hàng' });
    if (!totalAmount && totalAmount !== 0) return res.status(400).json({ success: false, message: 'Vui lòng nhập tổng tiền' });

    // Tính totalAmount từ items nếu không truyền
    let total = parseFloat(totalAmount) || 0;
    if (!total && items?.length) {
      total = items.reduce((s, i) => s + (i.qty * i.unitPrice), 0);
    }

    const order = await Order.create({ customerName, customerPhone, items: items || [], totalAmount: total, note, status, userId: userId || null });
    res.status(201).json({ success: true, message: 'Đã thêm đơn hàng', data: order });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── PUT /api/orders/:id ──────────────────────────────────────────────────────
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    res.json({ success: true, message: 'Đã cập nhật', data: order });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── DELETE /api/orders/:id ───────────────────────────────────────────────────
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    res.json({ success: true, message: 'Đã xóa đơn hàng' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
