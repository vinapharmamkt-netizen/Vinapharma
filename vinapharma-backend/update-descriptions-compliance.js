// Cập nhật mô tả sản phẩm cho phù hợp luật quảng cáo & dược phẩm Việt Nam
// Chạy: node update-descriptions-compliance.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');

// Danh sách thay thế theo thứ tự ưu tiên (từ cụ thể đến chung)
const replacements = [
  // Cụm "hỗ trợ điều trị" → "hỗ trợ cải thiện"
  [/hỗ trợ điều trị/gi, 'hỗ trợ cải thiện'],
  // "điều trị" đứng độc lập
  [/điều trị/gi, 'cải thiện'],
  // "chữa" các dạng
  [/chữa bệnh/gi, 'cải thiện sức khỏe'],
  [/chữa/gi, 'cải thiện'],
  // "trị" đứng sau "hỗ trợ"
  [/hỗ trợ trị/gi, 'hỗ trợ cải thiện'],
  // "ngăn ngừa" → "hỗ trợ phòng ngừa"
  [/ngăn ngừa/gi, 'hỗ trợ phòng ngừa'],
  // "phòng ngừa bệnh" → "hỗ trợ giảm nguy cơ"
  [/phòng ngừa bệnh/gi, 'hỗ trợ giảm nguy cơ'],
  // "ngăn chặn" → "hỗ trợ giảm"
  [/ngăn chặn/gi, 'hỗ trợ giảm'],
  // "cực kỳ hiệu quả" → bỏ
  [/cực kỳ hiệu quả/gi, 'hiệu quả'],
  // "điều hòa" nếu dùng độc lập về bệnh → "hỗ trợ ổn định"
  [/điều hòa huyết áp/gi, 'hỗ trợ ổn định huyết áp'],
  [/điều hòa đường huyết/gi, 'hỗ trợ ổn định đường huyết'],
  [/điều hòa cholesterol/gi, 'hỗ trợ ổn định cholesterol'],
  [/tái tạo Insulin/gi, 'hỗ trợ hoạt động của Insulin'],
  [/điều hòa hấp thu Glucose/gi, 'hỗ trợ hấp thu Glucose'],
  [/điều hòa trương lực mạch máu/gi, 'hỗ trợ trương lực mạch máu'],
  [/điều hòa hormon/gi, 'hỗ trợ cân bằng hormon'],
];

function fixText(text) {
  if (!text) return text;
  let result = text;
  for (const [pattern, replacement] of replacements) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công\n');

    const products = await Product.find({});
    console.log(`📦 Tổng số sản phẩm: ${products.length}\n`);

    let updated = 0, unchanged = 0;

    for (const p of products) {
      const newDesc = fixText(p.description);
      const newUses = fixText(p.uses);

      if (newDesc !== p.description || newUses !== p.uses) {
        await Product.findByIdAndUpdate(p._id, {
          description: newDesc,
          ...(newUses !== p.uses && { uses: newUses }),
        });
        console.log(`✏️  Cập nhật: ${p.name}`);
        if (newDesc !== p.description) {
          // In ra sự thay đổi để kiểm tra
          const changes = [];
          for (const [pattern] of replacements) {
            const matches = p.description.match(pattern);
            if (matches) changes.push(...matches);
          }
          if (changes.length) console.log(`   → Sửa: ${[...new Set(changes)].join(', ')}`);
        }
        updated++;
      } else {
        unchanged++;
      }
    }

    console.log(`\n✅ Xong! Đã cập nhật: ${updated} sản phẩm, không thay đổi: ${unchanged} sản phẩm.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
}

main();
