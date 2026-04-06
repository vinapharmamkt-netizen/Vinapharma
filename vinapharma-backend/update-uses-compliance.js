// Cập nhật lại trường "uses" cho 18 sản phẩm No1EU
// Tuân thủ Luật Quảng cáo 2012, Nghị định 15/2018/NĐ-CP về TPCN,
// và Thông tư 09/2015/TT-BYT về quảng cáo thực phẩm chức năng
// Quy tắc: dùng "Hỗ trợ ...", không dùng "điều trị / chữa / ngăn ngừa bệnh / tiêu diệt vi khuẩn",
//          không đưa ra số liệu lâm sàng cụ thể, không nhắm vào "bệnh nhân"
// Chạy: node update-uses-compliance.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./models/Product');

const updates = [
  {
    name: 'Beauty Biocell Elixir',
    uses:
      '• Hỗ trợ nuôi dưỡng, làm mềm và cải thiện độ đàn hồi của da\n' +
      '• Hỗ trợ cung cấp độ ẩm, giúp da trông rạng rỡ và săn chắc hơn\n' +
      '• Hỗ trợ chống oxy hóa, giúp làm chậm quá trình lão hóa da'
  },
  {
    name: 'Track Support',
    uses:
      '• Hỗ trợ sức khỏe đường tiết niệu\n' +
      '• Hỗ trợ duy trì môi trường lành mạnh của đường tiết niệu nhờ thành phần D-Mannose và chiết xuất nam việt quất\n' +
      '• Hỗ trợ tăng cường hệ miễn dịch thông qua Vitamin C, A, E và Kẽm\n' +
      '• Hỗ trợ chống oxy hóa, bảo vệ tế bào'
  },
  {
    name: 'Helpaid',
    uses:
      '• Hỗ trợ tăng cường quá trình trao đổi chất\n' +
      '• Hỗ trợ chuyển hóa chất béo thành năng lượng\n' +
      '• Hỗ trợ duy trì cân nặng ổn định, giảm tích lũy mỡ thừa\n' +
      '• Hỗ trợ cân bằng lipid trong cơ thể\n' +
      '• Hỗ trợ chức năng tiêu hóa, giúp cơ thể hấp thu dưỡng chất hiệu quả hơn'
  },
  {
    name: 'Veins Aid',
    uses:
      '• Hỗ trợ điều hòa lưu thông máu và duy trì sự linh hoạt của thành mạch\n' +
      '• Hỗ trợ bảo vệ thành mạch máu nhờ khả năng chống oxy hóa\n' +
      '• Hỗ trợ sức khỏe hệ tim mạch và tuần hoàn\n' +
      '• Hỗ trợ cung cấp vi chất thiết yếu cho hệ mạch máu'
  },
  {
    name: 'Ginseng Royal 2000',
    uses:
      '• Hỗ trợ tăng cường hoạt động thể chất và tinh thần, giảm mệt mỏi\n' +
      '• Hỗ trợ phục hồi và cân bằng năng lượng cho cơ thể\n' +
      '• Hỗ trợ bảo vệ cơ thể nhờ sự kết hợp của nhân sâm, sữa ong chúa và Vitamin C\n' +
      '• Hỗ trợ chống oxy hóa, điều hòa quá trình trao đổi chất\n' +
      '• Hỗ trợ tăng cường sinh lực nam giới'
  },
  {
    name: 'Gluco Aid',
    uses:
      '• Hỗ trợ ổn định đường huyết\n' +
      '• Hỗ trợ điều hòa chuyển hóa đường và lipid trong cơ thể\n' +
      '• Hỗ trợ tăng độ nhạy cảm với Insulin nhờ thành phần Crom\n' +
      '• Hỗ trợ chống oxy hóa, bảo vệ tế bào nội tạng nhờ Vitamin C, E và β-Caroten'
  },
  {
    name: 'Focus+Memo',
    uses:
      '• Hỗ trợ tăng khả năng tập trung\n' +
      '• Hỗ trợ cải thiện trí nhớ\n' +
      '• Hỗ trợ ổn định hoạt động của não bộ\n' +
      '• Hỗ trợ tăng khả năng tiếp nhận và xử lý thông tin'
  },
  {
    name: 'Krill Ocean',
    uses:
      '• Hỗ trợ tăng cường tuần hoàn máu, hỗ trợ duy trì mức cholesterol lành mạnh\n' +
      '• Hỗ trợ sức khỏe tim mạch\n' +
      '• Hỗ trợ duy trì chức năng gan khỏe mạnh\n' +
      '• Hỗ trợ cải thiện trí nhớ, khả năng tập trung, giảm căng thẳng mệt mỏi\n' +
      '• Hỗ trợ tăng cường thị lực\n' +
      '• Hỗ trợ chống oxy hóa'
  },
  {
    name: 'Vitaline A',
    uses:
      '• Hỗ trợ đổi mới và tái tạo tế bào\n' +
      '• Hỗ trợ tăng cường hệ miễn dịch\n' +
      '• Hỗ trợ duy trì hoạt động bình thường của các mô bề mặt\n' +
      '• Hỗ trợ duy trì và phát triển thị lực\n' +
      '• Hỗ trợ tăng cường sức đề kháng của cơ thể'
  },
  {
    name: 'Vitaline C',
    uses:
      '• Hỗ trợ chống oxy hóa, trung hòa các gốc tự do\n' +
      '• Hỗ trợ giảm mệt mỏi và căng thẳng\n' +
      '• Hỗ trợ làm sáng và cải thiện sắc tố da\n' +
      '• Hỗ trợ tăng cường sức đề kháng của cơ thể\n' +
      '• Hỗ trợ tỉnh táo, giảm tình trạng mệt mỏi\n' +
      '• Hỗ trợ tổng hợp collagen, giúp da trông tươi trẻ hơn và hỗ trợ sức khỏe sụn khớp'
  },
  {
    name: 'Vitaline D3',
    uses:
      '• Hỗ trợ hấp thu Canxi, giúp xương và răng chắc khỏe\n' +
      '• Hỗ trợ giảm tình trạng chuột rút và mệt mỏi cơ thể\n' +
      '• Hỗ trợ tăng cường hệ miễn dịch'
  },
  {
    name: 'Vitaline Mg',
    uses:
      '• Hỗ trợ cải thiện chất lượng giấc ngủ\n' +
      '• Hỗ trợ xương chắc khỏe và hỗ trợ ổn định đường huyết\n' +
      '• Hỗ trợ bảo vệ sức khỏe tim mạch\n' +
      '• Hỗ trợ giảm căng cơ và chuột rút\n' +
      '• Hỗ trợ giảm căng thẳng thần kinh và stress\n' +
      '• Hỗ trợ tăng cường sức khỏe thể chất và phục hồi cơ sau tập luyện'
  },
  {
    name: 'Vitaline Se',
    uses:
      '• Hỗ trợ hoạt động bình thường của tuyến giáp\n' +
      '• Hỗ trợ chống oxy hóa, trung hòa gốc tự do\n' +
      '• Hỗ trợ sức khỏe sinh sản\n' +
      '• Hỗ trợ tóc và móng chắc khỏe'
  },
  {
    name: 'Vitaline Zn',
    uses:
      '• Hỗ trợ tái tạo da và giúp da trông khỏe mạnh hơn\n' +
      '• Hỗ trợ sức khỏe sinh lý nam giới\n' +
      '• Hỗ trợ khả năng tập trung và hoạt động thần kinh\n' +
      '• Hỗ trợ sức khỏe cơ bắp và xương khớp\n' +
      '• Hỗ trợ tóc chắc khỏe\n' +
      '• Hỗ trợ chống viêm và tăng cường miễn dịch'
  },
  {
    name: 'Kids Royal Jelly',
    uses:
      '• Hỗ trợ cung cấp năng lượng hoạt động hàng ngày cho trẻ\n' +
      '• Hỗ trợ phát triển hệ thần kinh và hệ miễn dịch ở trẻ em\n' +
      '• Hỗ trợ bảo vệ cơ thể nhờ khả năng chống oxy hóa từ Vitamin C và E\n' +
      '• Hỗ trợ duy trì thị lực và hỗ trợ sức khỏe xương cho trẻ'
  },
  {
    name: 'Smart Kids',
    uses:
      '• Hỗ trợ hoạt động bình thường của tim và hệ thần kinh\n' +
      '• Hỗ trợ tăng trưởng và phát triển toàn diện ở trẻ em\n' +
      '• Hỗ trợ sức khỏe tim mạch, hỗ trợ duy trì mức cholesterol lành mạnh\n' +
      '• Hỗ trợ tăng cường trí nhớ và khả năng học tập'
  },
  {
    name: 'Special Kids',
    uses:
      '• Hỗ trợ tăng cường nhận thức, khả năng ghi nhớ và học tập ở trẻ\n' +
      '• Hỗ trợ bảo vệ cơ thể và chống oxy hóa nhờ Vitamin C\n' +
      '• Hỗ trợ duy trì thị lực khỏe mạnh và xương chắc khỏe nhờ Vitamin A, D\n' +
      '• Hỗ trợ bổ sung đầy đủ Vitamin thiết yếu theo nhu cầu dinh dưỡng hàng ngày'
  },
  {
    name: 'K2D3 Drops',
    uses:
      '• Hỗ trợ cung cấp Vitamin K2 và D3 ở dạng dễ hấp thu\n' +
      '• Hỗ trợ phát triển chiều cao, hỗ trợ bổ sung Canxi giúp xương và răng chắc khỏe\n' +
      '• Hỗ trợ sức khỏe xương và tim mạch\n' +
      '• Hỗ trợ chuyển hóa xương bình thường ở trẻ em'
  }
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công');

    let updated = 0, notFound = 0;

    for (const u of updates) {
      const result = await Product.updateOne(
        { name: u.name },
        { $set: { uses: u.uses } }
      );
      if (result.matchedCount > 0) {
        console.log(`✅ ${u.name}`);
        updated++;
      } else {
        console.log(`❌ Không tìm thấy: ${u.name}`);
        notFound++;
      }
    }

    console.log(`\n📦 Xong! Cập nhật: ${updated}, Không tìm thấy: ${notFound}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi:', err.message);
    process.exit(1);
  }
};

run();
