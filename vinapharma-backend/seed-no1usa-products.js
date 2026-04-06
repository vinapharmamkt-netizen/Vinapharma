// Thêm 7 sản phẩm thương hiệu No.1USA từ catalogue
// Brand ID: 69b3a064e4ea0cc6bcbf931f (No1USA)
// Giá từ Bảng báo giá ngày 16/03/2026
// Chạy: node seed-no1usa-products.js

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/Product');

const BRAND_ID = '69b3a064e4ea0cc6bcbf931f';
const BRAND_NAME = 'No1USA';

const products = [
  {
    name: 'Super Fucoidan 1560mg',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Thực phẩm bổ sung hỗ trợ sức đề kháng và chống oxy hoá với Fucoidan 500mg phối hợp thảo dược và linh chi. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ tăng cường sức đề kháng, nâng cao thể trạng (tuỳ cơ địa)\n• Hỗ trợ chống oxy hoá\n• Hỗ trợ bồi bổ sức khoẻ, hỗ trợ phục hồi thể lực (tuỳ cơ địa)',
    dosage: '1 viên/lần (sáng hoặc trưa)\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'Fucoidan 500mg, Scutellaria Barbata 75mg, Hedyotis Diffusa 75mg, Curcumin 50mg, Linh Chi 80mg',
    packaging: '1 lọ x 30 viên nang',
    weight: '30 viên · 1 lọ',
    price: 1190000,
    badge: 'Bán chạy',
    icon: '🌿',
    inStock: true,
    featured: true,
    active: true
  },
  {
    name: 'Multi Cordyceps 10.000mg',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Tăng đề kháng',
    ageGroup: 'Tất cả',
    description: 'Thực phẩm bổ sung hỗ trợ nâng cao thể trạng, giảm mệt mỏi và hỗ trợ đề kháng với đông trùng hạ thảo kết hợp linh chi, hồng sâm và saffron. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ tăng cường sức đề kháng, nâng cao thể trạng (tuỳ cơ địa)\n• Hỗ trợ giảm mệt mỏi, hỗ trợ phục hồi sức khoẻ (tuỳ cơ địa)\n• Hỗ trợ chống oxy hoá\n• Hỗ trợ sức bền khi làm việc và vận động (tuỳ cơ địa)',
    dosage: '1 viên/lần (sáng hoặc trưa)\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'Cordyceps Sinensis 500mg, Linh Chi 170mg, Hồng Sâm 70mg, Saffron Extract 5mg',
    packaging: '1 lọ x 30 viên nang',
    weight: '30 viên · 1 lọ',
    price: 710000,
    badge: '',
    icon: '🍄',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Women Care Extra',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Khác',
    ageGroup: 'Nữ',
    description: 'Thực phẩm bổ sung hỗ trợ cân bằng nội tiết tố nữ, đồng thời hỗ trợ da – tóc – móng và sức khoẻ xương. Kết hợp thảo dược hỗ trợ nội tiết với canxi, collagen và biotin. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ cân bằng nội tiết tố nữ (tuỳ cơ địa)\n• Hỗ trợ giảm khó chịu giai đoạn tiền mãn kinh (tuỳ cơ địa)\n• Hỗ trợ da – tóc – móng nhờ collagen và biotin\n• Hỗ trợ sức khoẻ xương nhờ bổ sung canxi',
    dosage: '1 viên/lần (sáng hoặc trưa)\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'Calcium Carbonate 125mg, Noni 100mg, Turmeric 100mg, Đương Quy 100mg, Black Cohosh 50mg, Collagen 50mg, Biotin 50mg',
    packaging: '1 lọ x 30 viên nang',
    weight: '30 viên · 1 lọ',
    price: 1020000,
    badge: 'Hot',
    icon: '🌸',
    inStock: true,
    featured: true,
    active: true
  },
  {
    name: 'Double White Extra',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Làm đẹp',
    ageGroup: 'Nữ',
    description: 'Thực phẩm bổ sung với Glutathione hàm lượng cao (1200mg/viên) hỗ trợ sáng da, chống oxy hoá và hỗ trợ bảo vệ da dưới nắng. Kết hợp HA, Collagen và chiết xuất lựu. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ làm sáng da, giảm sạm xỉn (tuỳ cơ địa)\n• Hỗ trợ chống oxy hoá\n• Hỗ trợ bảo vệ da trước ánh nắng (hỗ trợ từ bên trong)\n• Hỗ trợ dưỡng ẩm, giúp da mịn màng hơn',
    dosage: '1 viên/ngày (buổi sáng)\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'Glutathione 1200mg, Placenta 100mg, Collagen 200mg, Polypodium Leucotomos 100mg, Chiết xuất lựu 50mg, Hyaluronic Acid 100mg',
    packaging: '1 lọ x 30 viên nang',
    weight: '30 viên · 1 lọ',
    price: 820000,
    badge: 'Bán chạy',
    icon: '✨',
    inStock: true,
    featured: true,
    active: true
  },
  {
    name: 'Joint Care',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Xương khớp',
    ageGroup: 'Tất cả',
    description: 'Thực phẩm bổ sung hỗ trợ khớp linh hoạt và hỗ trợ giảm cảm giác đau mỏi nhờ Boswellia hàm lượng cao (520mg/viên) kết hợp thảo dược đa thành phần. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ giảm cảm giác đau nhức và khó chịu tại khớp (tuỳ cơ địa)\n• Hỗ trợ duy trì linh hoạt khớp, hỗ trợ vận động\n• Hỗ trợ chăm sóc và bảo vệ khớp nhờ nhóm thảo dược',
    dosage: '1 viên/lần (sáng)\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'Boswellia 520mg, Licorice 120mg, Willow 120mg, Turmeric 80mg, Alfalfa 40mg, Black Cohosh 40mg',
    packaging: '1 lọ x 30 viên nang',
    weight: '30 viên · 1 lọ',
    price: 715000,
    badge: '',
    icon: '🦴',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Double White',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Làm đẹp',
    ageGroup: 'Nữ',
    description: 'Thực phẩm bổ sung với công thức NAC + Vitamin C + Polypodium hỗ trợ chống oxy hoá và hỗ trợ làm sáng da khi thường xuyên tiếp xúc nắng. Kết hợp amino acid L-Glutamin và L-Glycine hỗ trợ nền tảng sức khoẻ làn da. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ làm sáng da (tuỳ cơ địa)\n• Hỗ trợ bảo vệ da khỏi tác nhân oxy hoá (tuỳ cơ địa)\n• Hỗ trợ bảo vệ da khi tiếp xúc ánh nắng mặt trời (hỗ trợ từ bên trong)\n• Hỗ trợ làm chậm quá trình lão hoá theo cơ chế chống oxy hoá (tuỳ cơ địa)',
    dosage: '1 viên/ngày (buổi sáng)\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'L-Glutamin 320mg, L-Glycine 320mg, NAC 320mg, Vitamin C 140mg, Polypodium Leucotomos 300mg',
    packaging: '1 hộp x 60 viên nang',
    weight: '60 viên · 1 hộp',
    price: 980000,
    badge: '',
    icon: '💫',
    inStock: true,
    featured: false,
    active: true
  },
  {
    name: 'Sakura Flex Advance',
    brand: BRAND_ID,
    brandName: BRAND_NAME,
    category: 'Xương khớp',
    ageGroup: 'Tất cả',
    description: 'Thực phẩm bổ sung hỗ trợ sức khỏe khớp với MSM kết hợp chiết xuất mộc lan cô đặc và thảo dược. Liều dùng 1 viên/ngày giúp dễ duy trì. Sản xuất bởi AIE Pharmaceuticals (Mỹ) – đạt chuẩn FDA, cGMP, USP.',
    uses: '• Hỗ trợ sức khỏe khớp\n• Hỗ trợ giảm cảm giác đau nhức và khó chịu tại khớp (tuỳ cơ địa)\n• Hỗ trợ duy trì linh hoạt khớp, hỗ trợ vận động hằng ngày',
    dosage: '1 viên/ngày\nKHUYẾN CÁO: Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.',
    ingredients: 'MSM 250mg, Chiết xuất mộc lan (10/1) 200mg, Cam Thảo 100mg, Cô Cà Ri 100mg, Địa Hoàng 100mg, Hạt Thì Là 100mg',
    packaging: '1 lọ x 30 viên nang',
    weight: '30 viên · 1 lọ',
    price: 925000,
    badge: 'Mới',
    icon: '🌺',
    inStock: true,
    featured: false,
    active: true
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    let added = 0, skipped = 0;

    for (const p of products) {
      const exists = await Product.findOne({ name: p.name, brand: p.brand });
      if (exists) {
        console.log(`⏭️  Đã tồn tại: ${p.name}`);
        skipped++;
        continue;
      }
      await Product.create(p);
      console.log(`✅ Đã thêm: ${p.name}`);
      added++;
    }

    console.log(`\n📦 Xong! Thêm mới: ${added}, Bỏ qua: ${skipped}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
};

run();
