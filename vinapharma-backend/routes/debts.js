const express = require('express');
const router  = express.Router();
const Debt    = require('../models/Debt');
const User    = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const { computeRank, getPointsRate, RANK_ORDER, BTOB_BONUS } = require('../utils/rankUtils');

// Sau khi tạo/cập nhật công nợ → tính lại totalSpent, rank và bonusPoints cho user BtoB
async function syncUserSpent(userId) {
  const paidDebts = await Debt.find({ user: userId, status: 'paid' });
  const total = paidDebts.reduce((s, d) => s + (d.amount || 0), 0);

  const user = await User.findById(userId);
  if (!user) return;

  const oldRank = user.rank || 'thanh-vien';
  const newRank = computeRank(total, user.userType);

  // Award bonus points for any levels jumped
  const oldIdx = RANK_ORDER.indexOf(oldRank);
  const newIdx = RANK_ORDER.indexOf(newRank);
  let bonus = user.bonusPoints || 0;
  if (newIdx > oldIdx) {
    bonus += (newIdx - oldIdx) * BTOB_BONUS;
  }

  await User.findByIdAndUpdate(userId, { totalSpent: total, rank: newRank, bonusPoints: bonus });
}

// Kiểm tra hạ rank BtoB: 2 tháng không có công nợ nào → hạ 1 bậc
async function checkBtobDemotion(userId) {
  const user = await User.findById(userId);
  if (!user || user.userType !== 'btob') return;
  if (user.rank === 'thanh-vien') return;

  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  // Có công nợ nào (bất kỳ trạng thái) trong 2 tháng qua không?
  const recentDebt = await Debt.findOne({ user: userId, createdAt: { $gte: twoMonthsAgo } });
  if (recentDebt) return; // Còn hoạt động → không hạ

  // Chưa hạ trong 2 tháng qua chưa?
  if (user.lastDemotionAt && user.lastDemotionAt > twoMonthsAgo) return;

  const currentIdx = RANK_ORDER.indexOf(user.rank);
  if (currentIdx > 0) {
    const newRank = RANK_ORDER[currentIdx - 1];
    await User.findByIdAndUpdate(userId, { rank: newRank, lastDemotionAt: new Date() });
  }
}

// ── GET /api/debts/stats?month=3&year=2026 (admin) ──────────────────────────
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = {};
    if (year) {
      const y = parseInt(year);
      const m = month ? parseInt(month) : null;
      if (m) {
        filter.createdAt = { $gte: new Date(y, m - 1, 1), $lt: new Date(y, m, 1) };
      } else {
        filter.createdAt = { $gte: new Date(y, 0, 1), $lt: new Date(y + 1, 0, 1) };
      }
    }

    const debts = await Debt.find(filter).populate('user', 'name phone email');

    const totalRevenue = debts.filter(d => d.status === 'paid').reduce((s, d) => s + d.amount, 0);
    const totalUnpaid  = debts.filter(d => d.status === 'unpaid').reduce((s, d) => s + d.amount, 0);
    const totalInvoices = debts.length;

    // Gộp theo khách hàng
    const map = {};
    debts.forEach(d => {
      const uid = d.user?._id?.toString() || 'unknown';
      if (!map[uid]) map[uid] = {
        name: d.user?.name || 'N/A', phone: d.user?.phone || '',
        totalPaid: 0, totalUnpaid: 0, invoiceCount: 0
      };
      if (d.status === 'paid') map[uid].totalPaid += d.amount;
      else map[uid].totalUnpaid += d.amount;
      map[uid].invoiceCount += 1;
    });

    const customers = Object.values(map);
    const topByMoney = [...customers].sort((a, b) => b.totalPaid - a.totalPaid).slice(0, 10);

    res.json({ success: true, data: { totalRevenue, totalUnpaid, totalInvoices, topByMoney, debts } });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── GET all debts (admin) – có thể filter theo userId ──
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const filter = {};
    if (req.query.userId) filter.user = req.query.userId;
    const debts = await Debt.find(filter)
      .populate('user', 'name email phone userType')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: debts });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── GET công nợ của user hiện tại (BtoB user) ──
router.get('/mine', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.userType !== 'btob')
      return res.status(403).json({ success: false, message: 'Chỉ dành cho khách BtoB' });

    // Kiểm tra hạ rank trước khi trả dữ liệu
    await checkBtobDemotion(req.user._id);

    const debts = await Debt.find({ user: req.user._id }).sort({ createdAt: -1 });
    const totalPaid   = debts.filter(d => d.status === 'paid').reduce((s,d) => s + d.amount, 0);
    const totalUnpaid = debts.filter(d => d.status === 'unpaid').reduce((s,d) => s + d.amount, 0);
    res.json({ success: true, data: debts, totalPaid, totalUnpaid });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── POST tạo công nợ mới (admin) ──
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { userId, invoiceNo, description, amount, status, dueDate, note } = req.body;
    if (!userId || !amount) return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc' });

    const user = await User.findById(userId);
    if (!user || user.userType !== 'btob')
      return res.status(400).json({ success: false, message: 'Chỉ tạo công nợ cho khách BtoB' });

    const debtData = { user: userId, invoiceNo, description, amount: Number(amount), status: status || 'unpaid', note };
    if (dueDate) debtData.dueDate = new Date(dueDate);
    if (status === 'paid') debtData.paidDate = new Date();

    const debt = await Debt.create(debtData);
    await syncUserSpent(userId);
    res.json({ success: true, data: debt });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── PUT cập nhật công nợ (admin) ──
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { invoiceNo, description, amount, status, dueDate, note } = req.body;
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ success: false, message: 'Không tìm thấy công nợ' });

    const updates = { invoiceNo, description, amount: Number(amount), status, note };
    if (dueDate) updates.dueDate = new Date(dueDate);

    // Tự điền ngày thanh toán khi chuyển sang paid
    if (status === 'paid' && debt.status !== 'paid') updates.paidDate = new Date();
    if (status === 'unpaid') updates.paidDate = null;

    const updated = await Debt.findByIdAndUpdate(req.params.id, updates, { new: true });
    await syncUserSpent(debt.user);
    res.json({ success: true, data: updated });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── DELETE công nợ (admin) ──
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    const userId = debt.user;
    await Debt.findByIdAndDelete(req.params.id);
    await syncUserSpent(userId);
    res.json({ success: true, message: 'Đã xóa công nợ' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
