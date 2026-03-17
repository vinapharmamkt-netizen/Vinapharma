// Tạo 10 bài viết mẫu — chạy: node seed-posts.js
require('dotenv').config();
const mongoose = require('mongoose');
const User  = require('./models/User');
const Post  = require('./models/Post');

const posts = [
  {
    title: '5 thực phẩm chức năng thiết yếu cho người trên 40 tuổi',
    category: 'Dinh dưỡng',
    tags: ['Dinh dưỡng', 'Vitamin', 'Tuổi 40+'],
    featured: true, order: 1,
    excerpt: 'Khi bước qua tuổi 40, cơ thể cần nhiều hỗ trợ dinh dưỡng hơn. Các enzym tiêu hóa giảm, khả năng hấp thụ chất dinh dưỡng cũng theo đó suy giảm đáng kể.',
    content: '<p>Bước qua tuổi 40, cơ thể bắt đầu thay đổi. Đây là lúc TPCN đóng vai trò quan trọng...</p>',
    icon: '🌿', readTime: 5, published: true,
  },
  {
    title: 'Vitamin D và tầm quan trọng với hệ miễn dịch mùa hè',
    category: 'Sức khỏe',
    tags: ['Vitamin D', 'Miễn dịch', 'Mùa hè'],
    featured: true, order: 2,
    excerpt: 'Người Việt Nam dù sống ở xứ nhiệt đới vẫn có thể thiếu Vitamin D vì nhiều lý do bất ngờ. Kem chống nắng, thời gian làm việc trong nhà là những nguyên nhân chính.',
    content: '<p>Vitamin D không chỉ giúp xương chắc khỏe mà còn điều phối hàng trăm phản ứng trong cơ thể...</p>',
    icon: '☀️', readTime: 4, published: true,
  },
  {
    title: 'Kết hợp thực phẩm chức năng với lối sống lành mạnh',
    category: 'Lối sống',
    tags: ['Lối sống', 'Thể thao', 'TPCN'],
    featured: false,
    excerpt: 'TPCN hiệu quả nhất khi được dùng đúng cách, kết hợp với chế độ dinh dưỡng cân bằng và vận động đều đặn. Bài viết chia sẻ 7 nguyên tắc vàng.',
    content: '<p>Thực phẩm chức năng không thể thay thế thuốc chữa bệnh nhưng là người bạn đồng hành lý tưởng...</p>',
    icon: '🧘', readTime: 6, published: true,
  },
  {
    title: 'Omega-3 và sức khỏe tim mạch: Những điều bạn cần biết',
    category: 'Tim mạch',
    tags: ['Omega-3', 'Tim mạch', 'Dầu cá'],
    featured: false,
    excerpt: 'Omega-3 từ dầu cá đã được nghiên cứu lâm sàng chứng minh giảm triglyceride, hỗ trợ huyết áp và bảo vệ nhịp tim. Liều dùng và thời điểm uống hợp lý.',
    content: '<p>EPA và DHA trong Omega-3 là hai axit béo thiết yếu mà cơ thể không tự tổng hợp được...</p>',
    icon: '❤️', readTime: 7, published: true,
  },
  {
    title: 'Collagen và làn da: Sự thật phía sau quảng cáo',
    category: 'Làm đẹp',
    tags: ['Collagen', 'Làn da', 'Chống lão hóa'],
    featured: false,
    excerpt: 'Collagen uống có thực sự giúp da đẹp hơn? Khoa học nói gì về tốc độ hấp thụ, loại collagen nào phù hợp và cần dùng bao lâu để thấy kết quả.',
    content: '<p>Collagen chiếm khoảng 30% tổng lượng protein trong cơ thể người, là nền tảng của da, tóc, móng...</p>',
    icon: '✨', readTime: 5, published: true,
  },
  {
    title: 'Probiotics: Hệ vi sinh vật đường ruột và sức đề kháng',
    category: 'Sức khỏe',
    tags: ['Probiotics', 'Đường ruột', 'Vi sinh vật'],
    featured: false,
    excerpt: '70% hệ miễn dịch nằm ở đường ruột. Probiotics giúp cân bằng hệ vi sinh vật, tăng cường miễn dịch và cải thiện tiêu hóa rõ rệt chỉ sau 2-4 tuần.',
    content: '<p>Hàng tỷ vi khuẩn sống trong đường ruột của bạn — đây là hệ sinh thái quyết định sức khỏe toàn diện...</p>',
    icon: '🧬', readTime: 6, published: true,
  },
  {
    title: 'Canxi và Vitamin K2: Bộ đôi hoàn hảo cho xương khớp',
    category: 'Dinh dưỡng',
    tags: ['Canxi', 'Vitamin K2', 'Xương khớp'],
    featured: false,
    excerpt: 'Canxi đơn thuần không đủ để ngăn loãng xương. Vitamin K2 là "người dẫn đường" đưa canxi vào xương thay vì bám vào thành mạch máu — điều ít ai biết.',
    content: '<p>Nghịch lý canxi: uống nhiều nhưng xương vẫn yếu? Đó là vì thiếu Vitamin K2 và D3...</p>',
    icon: '🦴', readTime: 5, published: true,
  },
  {
    title: 'Protein và tăng cơ: Hướng dẫn cho người mới bắt đầu tập gym',
    category: 'Thể hình',
    tags: ['Protein', 'Tăng cơ', 'Gym', 'Whey'],
    featured: false,
    excerpt: 'Tập gym nhưng không thấy cơ? Có thể bạn đang thiếu protein. Hướng dẫn tính lượng protein cần thiết, thời điểm bổ sung và cách chọn whey protein.',
    content: '<p>Cơ bắp được xây dựng từ protein — điều này không còn là bí mật. Nhưng bao nhiêu là đủ?...</p>',
    icon: '💪', readTime: 8, published: true,
  },
  {
    title: 'Melatonin và giấc ngủ sâu: Có nên dùng lâu dài không?',
    category: 'Sức khỏe',
    tags: ['Melatonin', 'Giấc ngủ', 'Stress'],
    featured: false,
    excerpt: 'Melatonin giúp điều chỉnh nhịp sinh học và cải thiện chất lượng giấc ngủ. Tuy nhiên cần dùng đúng liều, đúng thời điểm và không lạm dụng.',
    content: '<p>Melatonin là hormone tự nhiên do tuyến tùng tiết ra khi trời tối. Bổ sung bên ngoài có thể giúp...</p>',
    icon: '🌙', readTime: 5, published: true,
  },
  {
    title: 'Detox cơ thể đúng cách: Khoa học hay chỉ là xu hướng?',
    category: 'Lối sống',
    tags: ['Detox', 'Gan', 'Thanh lọc cơ thể'],
    featured: false,
    excerpt: 'Trào lưu detox nước ép, nhịn ăn gián đoạn, than hoạt tính... đâu là thực sự có khoa học, đâu chỉ là marketing? Chuyên gia dinh dưỡng giải đáp.',
    content: '<p>Cơ thể người có hệ thống detox tự nhiên cực kỳ hiệu quả: gan, thận, phổi và da...</p>',
    icon: '🧪', readTime: 7, published: true,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected');

  const admin = await User.findOne({ role: 'admin' });
  if (!admin) { console.error('No admin user found — run seed.js first'); process.exit(1); }

  await Post.deleteMany({});
  console.log('Cleared old posts');

  const now = new Date();
  for (let i = 0; i < posts.length; i++) {
    const p = posts[i];
    const d = new Date(now - i * 86400000 * 5); // stagger by 5 days
    await Post.create({ ...p, author: admin._id, publishedAt: d });
    console.log('Created:', p.title.slice(0, 50));
  }

  console.log('Done — created', posts.length, 'posts');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
