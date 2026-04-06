require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/Product');

const TEXT_FIELDS = ['description', 'uses', 'dosage', 'ingredients', 'packaging', 'weight'];

function isMissingText(value) {
  return value === undefined || value === null || String(value).trim() === '';
}

function isMissingImages(doc) {
  const hasPrimary = !!(doc.image && String(doc.image).trim());
  const hasArray = Array.isArray(doc.images) && doc.images.some((u) => String(u || '').trim());
  return !hasPrimary && !hasArray;
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Da ket noi MongoDB');

  const products = await Product.find({}, TEXT_FIELDS.concat(['name', 'brand', 'brandName', 'image', 'images'])).lean();
  const missing = [];

  for (const p of products) {
    const missingFields = [];
    for (const field of TEXT_FIELDS) {
      if (isMissingText(p[field])) missingFields.push(field);
    }
    if (isMissingImages(p)) missingFields.push('images');
    if (missingFields.length) {
      missing.push({
        _id: String(p._id),
        name: p.name,
        brand: p.brand,
        brandName: p.brandName || '',
        missingFields
      });
    }
  }

  const outPath = path.join(__dirname, 'missing-products.json');
  fs.writeFileSync(outPath, JSON.stringify({ count: missing.length, items: missing }, null, 2), 'utf8');
  console.log(`Da ghi danh sach thieu thong tin: ${outPath}`);
  console.log(`Tong so san pham thieu: ${missing.length}`);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
