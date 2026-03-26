const express    = require('express');
const router     = express.Router();
const jwt        = require('jsonwebtoken');
const crypto     = require('crypto');
const nodemailer = require('nodemailer');
const User       = require('../models/User');
const { protect } = require('../middleware/auth');
const { computeAvailablePoints, RANK_ORDER } = require('../utils/rankUtils');
const Debt = require('../models/Debt');

// ── Token helpers ────────────────────────────────────────────
const signAccess   = (id) => jwt.sign({ id }, process.env.JWT_SECRET,         { expiresIn: '15m' });
const signRefresh  = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

const COOKIE_OPTS = {
  httpOnly: true,           // JS không đọc được
  secure:   process.env.NODE_ENV === 'production', // HTTPS only trên production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // none để gửi cross-origin trong production
  maxAge:   30 * 24 * 60 * 60 * 1000  // 30 ngày (ms)
};

function sendTokens(res, user) {
  const accessToken  = signAccess(user._id);
  const refreshToken = signRefresh(user._id);
  // Refresh token lưu trong httpOnly cookie
  res.cookie('vp_refresh', refreshToken, COOKIE_OPTS);
  // Access token trả về body để client lưu memory
  res.json({
    success: true,
    accessToken,
    user: {
      _id:        user._id,
      name:       user.name,
      email:      user.email,
      phone:      user.phone,
      role:       user.role,
      avatar:     user.avatar,
      provider:   user.provider,
      userType:    user.userType   || 'normal',
      totalSpent:  user.totalSpent || 0,
      rank:        user.rank       || 'thanh-vien',
      bonusPoints: user.bonusPoints || 0,
      points:      computeAvailablePoints(user.totalSpent, user.rank, user.bonusPoints, user.redeemedPoints)
    }
  });
}

// ── POST /api/auth/register ──────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !password)
      return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ' });
    if (!email && !phone)
      return res.status(400).json({ success: false, message: 'Vui lòng nhập email hoặc số điện thoại' });
    if (email && await User.findOne({ email }))
      return res.status(400).json({ success: false, message: 'Email đã được sử dụng' });
    if (phone && await User.findOne({ phone }))
      return res.status(400).json({ success: false, message: 'Số điện thoại đã được sử dụng' });

    const user = await User.create({ name, email: email||undefined, phone: phone||undefined, password, provider: 'local' });
    sendTokens(res, user);
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── POST /api/auth/login ─────────────────────────────────────
// Đăng nhập bằng email HOẶC số điện thoại
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.status(400).json({ success: false, message: 'Vui lòng nhập thông tin đăng nhập' });

    const isPhone = /^[0-9+\s\-()]{7,15}$/.test(identifier.trim());
    const query   = isPhone ? { phone: identifier.trim() } : { email: identifier.trim().toLowerCase() };
    const user    = await User.findOne(query).select('+password');

    if (!user)
      return res.status(401).json({ success: false, message: isPhone ? 'Số điện thoại chưa đăng ký' : 'Email chưa đăng ký' });
    if (user.provider !== 'local')
      return res.status(401).json({ success: false, message: `Tài khoản này đăng nhập bằng ${user.provider}` });
    if (!await user.comparePassword(password))
      return res.status(401).json({ success: false, message: 'Mật khẩu không đúng' });

    sendTokens(res, user);
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── POST /api/auth/social-login ──────────────────────────────
router.post('/social-login', async (req, res) => {
  try {
    const { provider, uid, email, name, avatar } = req.body;
    if (!provider || !uid || !name)
      return res.status(400).json({ success: false, message: 'Thiếu thông tin' });

    const uidField = provider === 'google' ? 'googleId' : 'facebookId';
    let user = await User.findOne({ [uidField]: uid });
    if (!user && email) user = await User.findOne({ email });

    if (user) {
      if (!user[uidField]) user[uidField] = uid;
      if (!user.avatar && avatar) user.avatar = avatar;
      if (user.provider === 'local') user.provider = provider;
      await user.save();
    } else {
      user = await User.create({
        name, email: email||undefined,
        [uidField]: uid, avatar, provider,
        password: '1'
      });
    }
    sendTokens(res, user);
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── POST /api/auth/refresh ───────────────────────────────────
// Client gọi khi access token hết hạn → trả access token mới
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies?.vp_refresh;
    if (!refreshToken)
      return res.status(401).json({ success: false, message: 'Không có refresh token', code: 'NO_REFRESH' });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      res.clearCookie('vp_refresh');
      return res.status(401).json({ success: false, message: 'Refresh token hết hạn, vui lòng đăng nhập lại', code: 'REFRESH_EXPIRED' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.clearCookie('vp_refresh');
      return res.status(401).json({ success: false, message: 'Tài khoản không tồn tại', code: 'USER_NOT_FOUND' });
    }

    // Cấp access token mới
    const accessToken = signAccess(user._id);
    res.json({
      success: true,
      accessToken,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role, avatar: user.avatar }
    });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── POST /api/auth/logout ────────────────────────────────────
router.post('/logout', (req, res) => {
  res.clearCookie('vp_refresh', COOKIE_OPTS);
  res.json({ success: true, message: 'Đã đăng xuất' });
});

// ── GET /api/auth/me ─────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  try {
    // Kiểm tra hạ rank BtoB nếu không có công nợ trong 2 tháng
    if (req.user.userType === 'btob') {
      try {
        const u = await User.findById(req.user._id);
        if (u && u.rank !== 'thanh-vien') {
          const twoMonthsAgo = new Date();
          twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
          const recentDebt = await Debt.findOne({ user: u._id, createdAt: { $gte: twoMonthsAgo } });
          if (!recentDebt && !(u.lastDemotionAt && u.lastDemotionAt > twoMonthsAgo)) {
            const idx = RANK_ORDER.indexOf(u.rank);
            if (idx > 0) {
              await User.findByIdAndUpdate(u._id, { rank: RANK_ORDER[idx - 1], lastDemotionAt: new Date() });
            }
          }
        }
      } catch (_) {}
    }
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// ── POST /api/auth/forgot-password ──────────────────────────
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản với email này' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken   = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `http://127.0.0.1:5500/files/reset-mat-khau.html?token=${resetToken}&email=${email}`;
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS } });
    await transporter.sendMail({
      from: `"Vinapharma" <${process.env.EMAIL_USER}>`, to: email,
      subject: '🔐 Đặt lại mật khẩu Vinapharma',
      html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto">
        <div style="background:#cc1f1f;padding:24px;text-align:center;color:#fff;font-size:20px;font-weight:900">❤️ vinapharma®</div>
        <div style="padding:28px;background:#fff">
          <p>Xin chào <b>${user.name}</b>,</p>
          <p style="color:#555;margin:12px 0">Bấm nút bên dưới để đặt lại mật khẩu. Link có hiệu lực <b>15 phút</b>.</p>
          <div style="text-align:center;margin:24px 0">
            <a href="${resetUrl}" style="background:#cc1f1f;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:800">🔐 Đặt lại mật khẩu</a>
          </div>
          <p style="font-size:12px;color:#aaa">Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        </div></div>`
    });
    res.json({ success: true, message: 'Email đặt lại mật khẩu đã được gửi!' });
  } catch (e) { res.status(500).json({ success: false, message: 'Lỗi: ' + e.message }); }
});

// ── POST /api/auth/reset-password ───────────────────────────
router.post('/reset-password', async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ email, resetPasswordToken: hash, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Link không hợp lệ hoặc đã hết hạn' });
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ success: true, message: 'Đặt lại mật khẩu thành công!' });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

// ── PUT /api/auth/change-password ───────────────────────────
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');
    if (!await user.comparePassword(currentPassword))
      return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng' });
    if (!newPassword || newPassword.length < 1)
      return res.status(400).json({ success: false, message: 'Vui lòng nhập mật khẩu mới' });
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Đổi mật khẩu thành công' });
  } catch (e) { res.status(400).json({ success: false, message: e.message }); }
});

module.exports = router;
