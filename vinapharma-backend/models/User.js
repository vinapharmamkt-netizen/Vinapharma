const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  phone: { type: String, unique: true, sparse: true, trim: true },
  password: { type: String, minlength: 6, select: false },
  role:   { type: String, enum: ['user','admin'], default: 'user' },
  active: { type: Boolean, default: true },
  // Social login
  googleId:   { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  avatar:     { type: String },
  provider:   { type: String, default: 'local' }, // local | google | facebook
  // Profile
  address: { type: String },
  // Loyalty rank
  userType:       { type: String, enum: ['normal', 'btob'], default: 'normal' },
  totalSpent:     { type: Number, default: 0 },
  rank:           { type: String, enum: ['thanh-vien', 'dong', 'bac', 'vang', 'kim-cuong'], default: 'thanh-vien' },
  bonusPoints:    { type: Number, default: 0 },
  redeemedPoints: { type: Number, default: 0 },
  lastDemotionAt: { type: Date },
  // Reset password
  resetPasswordToken:   { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

// Hash password
userSchema.pre('save', async function() {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function(pass) {
  if (!this.password) return false;
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model('User', userSchema);
