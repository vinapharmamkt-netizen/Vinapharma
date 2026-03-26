const express    = require('express');
const router     = express.Router();
const Redemption = require('../models/Redemption');
const Reward     = require('../models/Reward');
const User       = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// POST đổi điểm lấy quà (user)
router.post('/', protect, async (req, res) => {
  try {
    const { rewardId } = req.body;
    const user   = await User.findById(req.user._id);
    const reward = await Reward.findById(rewardId);

    if (!reward || !reward.active)
      return res.status(404).json({ success: false, message: 'Phần thưởng không tồn tại hoặc đã hết' });

    // Kiểm tra loại user
    if (reward.type === 'btob' && user.userType !== 'btob')
      return res.status(403).json({ success: false, message: 'Quà này chỉ dành cho khách BtoB' });

    // Tính điểm khả dụng
    const available = Math.floor((user.totalSpent || 0) / 10000) - (user.redeemedPoints || 0);
    if (available < reward.pointsRequired)
      return res.status(400).json({ success: false, message: `Không đủ điểm (bạn có ${available} điểm, cần ${reward.pointsRequired} điểm)` });

    // Kiểm tra kho
    if (reward.stock !== -1 && reward.stock <= 0)
      return res.status(400).json({ success: false, message: 'Phần thưởng đã hết hàng' });

    // Trừ kho
    if (reward.stock !== -1) await Reward.findByIdAndUpdate(rewardId, { $inc: { stock: -1 } });

    // Cộng điểm đã dùng
    await User.findByIdAndUpdate(req.user._id, { $inc: { redeemedPoints: reward.pointsRequired } });

    // Tạo bản ghi đổi thưởng
    const redemption = await Redemption.create({
      user:       req.user._id,
      reward:     rewardId,
      rewardName: reward.name,
      pointsUsed: reward.pointsRequired
    });

    res.json({
      success: true,
      message: `Đổi thưởng thành công! Đã dùng ${reward.pointsRequired} điểm`,
      data: redemption,
      newPoints: available - reward.pointsRequired
    });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET lịch sử đổi thưởng của user hiện tại
router.get('/mine', protect, async (req, res) => {
  try {
    const list = await Redemption.find({ user: req.user._id })
      .populate('reward', 'name image pointsRequired')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET tất cả lịch sử đổi thưởng (admin)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const list = await Redemption.find()
      .populate('user', 'name email userType')
      .populate('reward', 'name pointsRequired')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// PUT cập nhật trạng thái đổi thưởng (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const r = await Redemption.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, data: r });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// DELETE xóa bản ghi đổi thưởng (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Redemption.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa bản ghi đổi thưởng' });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

module.exports = router;
