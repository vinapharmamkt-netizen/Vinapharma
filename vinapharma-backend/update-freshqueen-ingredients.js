require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const updates = [
  {
    name: 'Fresh Queen Hương Bạc Hà',
    ingredients: 'Chiết xuất từ các loại hoa (theo catalogue).'
  },
  {
    name: 'Fresh Queen Hương Hoa',
    ingredients: 'Chiết xuất từ bạc hà (theo catalogue).'
  }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Da ket noi MongoDB');

  let updated = 0;
  let notFound = 0;

  for (const u of updates) {
    const result = await Product.findOneAndUpdate(
      { name: u.name },
      { $set: { ingredients: u.ingredients } },
      { new: true }
    );
    if (result) {
      console.log(`Cap nhat: ${u.name}`);
      updated++;
    } else {
      console.log(`Khong tim thay: ${u.name}`);
      notFound++;
    }
  }

  console.log(`Xong: ${updated} cap nhat, ${notFound} khong tim thay`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
