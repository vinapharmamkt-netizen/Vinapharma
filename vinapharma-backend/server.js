require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const mongoose   = require('mongoose');
const path       = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// ── Kết nối MongoDB ──
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Atlas kết nối thành công'))
  .catch(err => { console.error('❌ Lỗi MongoDB:', err.message); process.exit(1); });

// ── Middleware ──
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://127.0.0.1:15500',
    'http://localhost:5500',
    'http://localhost:3000',
    'http://localhost:8000',
    // Thêm domain production ở đây khi deploy
  ],
  credentials: true  // Cho phép gửi cookie
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  // Đọc cookie từ request

// ── Serve ảnh upload ──
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ──
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/posts',    require('./routes/posts'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/banners',  require('./routes/banners'));
app.use('/api/users',    require('./routes/users'));
app.use('/api/brands',      require('./routes/brands'));
app.use('/api/promotions',  require('./routes/promotions'));
app.use('/api/promo-banners', require('./routes/promo-banners'));
app.use('/api/rewards',     require('./routes/rewards'));
app.use('/api/redemptions', require('./routes/redemptions'));
app.use('/api/debts',       require('./routes/debts'));
app.use('/api/orders',      require('./routes/orders'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({ success: true, message: '🌿 Vinapharma API đang chạy!', version: '2.0.0' });
});

app.use((req, res) => res.status(404).json({ success: false, message: 'API không tồn tại' }));
app.use((err, req, res, next) => res.status(500).json({ success: false, message: err.message }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════╗');
  console.log('║     🌿 VINAPHARMA BACKEND API        ║');
  console.log('╠══════════════════════════════════════╣');
  console.log(`║  Server: http://localhost:${PORT}         ║`);
  console.log('║  DB: MongoDB Atlas                   ║');
  console.log('║  Auth: Access(15m) + Refresh(30d)   ║');
  console.log('╚══════════════════════════════════════╝');
  console.log('');
});
