// Seed bài viết bổ sung cho 7 danh mục — node seed-posts-extra.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const posts = [

  // ── GÓC SỨC KHỎE ────────────────────────────────────────────────────────
  {
    title: 'Sức khỏe xương khớp sau 40 tuổi: Những điều bạn cần biết ngay hôm nay',
    category: 'Góc sức khỏe', topic: 'Sức khỏe', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    excerpt: 'Sau 40 tuổi, mật độ xương và sụn khớp bắt đầu suy giảm đáng kể. Hiểu đúng để bảo vệ xương khớp từ sớm giúp bạn duy trì vận động linh hoạt và chất lượng cuộc sống tốt.',
    readTime: 6, published: true,
    tags: ['Xương khớp', 'Sức khỏe', 'Tuổi trung niên'],
    content: `<p>Xương khớp là hệ thống nâng đỡ toàn bộ cơ thể, nhưng thường chỉ được chú ý khi đã có triệu chứng đau nhức. Thực tế, quá trình lão hóa xương khớp bắt đầu từ rất sớm — và can thiệp kịp thời có thể tạo ra sự khác biệt lớn trong chất lượng cuộc sống về sau.</p>

<img src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80" alt="Xương khớp khỏe mạnh" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Xương và sụn thay đổi như thế nào theo tuổi?</h2>
<p>Từ khoảng 35–40 tuổi, quá trình tái tạo xương bắt đầu chậm lại — cơ thể phá vỡ xương cũ nhanh hơn khả năng tạo xương mới. Mật độ xương (bone mineral density) giảm dần, làm tăng nguy cơ loãng xương (osteoporosis), đặc biệt ở phụ nữ sau mãn kinh khi estrogen giảm mạnh.</p>
<p>Sụn khớp — lớp đệm bảo vệ giữa các đầu xương — cũng dần mỏng và mất độ đàn hồi. Đây là nguyên nhân chính dẫn đến thoái hóa khớp (osteoarthritis), tình trạng phổ biến nhất trong các bệnh lý khớp ở người trưởng thành.</p>

<h2>Các yếu tố nguy cơ cần biết</h2>
<ul>
<li><strong>Ít vận động:</strong> Khớp cần được vận động để nhận dưỡng chất từ dịch khớp. Ngồi nhiều khiến sụn khớp thiếu nuôi dưỡng và thoái hóa nhanh hơn.</li>
<li><strong>Thừa cân, béo phì:</strong> Mỗi kg thừa tạo áp lực gấp 3–5 lần lên khớp gối khi đi bộ.</li>
<li><strong>Thiếu Canxi và Vitamin D:</strong> Hai vi chất thiết yếu cho mật độ xương.</li>
<li><strong>Hút thuốc lá:</strong> Làm giảm lưu lượng máu đến xương và ức chế hấp thu canxi.</li>
<li><strong>Di truyền:</strong> Tiền sử gia đình có loãng xương hoặc thoái hóa khớp là yếu tố nguy cơ đáng kể.</li>
</ul>

<img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80" alt="Dinh dưỡng cho xương khớp" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Dinh dưỡng bảo vệ xương khớp</h2>
<p><strong>Canxi:</strong> Người trưởng thành cần 1.000–1.200 mg canxi/ngày. Nguồn tốt nhất: sữa và chế phẩm từ sữa, cá nhỏ ăn cả xương (cá mòi, cá hồi đóng hộp), rau lá xanh đậm (cải kale, bông cải xanh), đậu hũ kết tủa bằng canxi.</p>
<p><strong>Vitamin D:</strong> Giúp ruột hấp thu canxi. Tắm nắng 15–20 phút/ngày và bổ sung qua thực phẩm hoặc supplement nếu thiếu hụt.</p>
<p><strong>Collagen type II:</strong> Thành phần chính của sụn khớp. Có trong nước hầm xương, da cá, thịt sụn.</p>
<p><strong>Chống viêm:</strong> Omega-3 (cá béo, hạt chia), nghệ (curcumin), gừng có tác dụng hỗ trợ giảm viêm tại khớp.</p>

<h2>Vận động đúng cách cho xương khớp</h2>
<p>Bài tập chịu trọng lượng (weight-bearing exercise) như đi bộ, leo cầu thang, nhảy nhẹ giúp kích thích tạo xương mới. Bơi lội và đạp xe là lựa chọn tốt cho người đã có vấn đề khớp — ít tác động nhưng vẫn duy trì cơ và linh hoạt.</p>
<p>Bài tập tăng cường cơ bắp quanh khớp (đặc biệt cơ đùi cho khớp gối) giúp giảm tải áp lực lên sụn khớp đáng kể.</p>

<p><em>Nguồn tham khảo: Arthritis Foundation; NIH – Osteoporosis and Bone Diseases; Mayo Clinic – Arthritis; Bệnh viện Chợ Rẫy – Thoái hóa khớp.</em></p>`,
  },

  {
    title: 'Kiểm tra sức khỏe định kỳ: Ai nên làm gì và ở độ tuổi nào?',
    category: 'Góc sức khỏe', topic: 'Sức khỏe', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    excerpt: 'Khám sức khỏe định kỳ không chỉ dành cho người có bệnh. Phát hiện sớm là chìa khóa để điều trị hiệu quả và tiết kiệm chi phí. Hướng dẫn đầy đủ theo từng nhóm tuổi.',
    readTime: 7, published: true,
    tags: ['Khám sức khỏe', 'Phòng bệnh', 'Sức khỏe định kỳ'],
    content: `<p>Theo Tổ chức Y tế Thế giới (WHO), hơn 70% các bệnh mãn tính nghiêm trọng có thể được phát hiện và kiểm soát tốt hơn nếu được chẩn đoán ở giai đoạn sớm. Đó là lý do khám sức khỏe định kỳ được coi là khoản đầu tư khôn ngoan nhất cho sức khỏe dài hạn.</p>

<img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80" alt="Khám sức khỏe định kỳ" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Tại sao cần khám định kỳ dù không có triệu chứng?</h2>
<p>Nhiều bệnh nguy hiểm như tiểu đường type 2, tăng huyết áp, bệnh thận mãn tính, và thậm chí một số loại ung thư giai đoạn đầu <strong>không có triệu chứng rõ ràng</strong>. Khi triệu chứng xuất hiện, bệnh đã ở giai đoạn tiến triển và việc điều trị khó khăn hơn nhiều.</p>

<h2>Gói khám cơ bản cho người trưởng thành (18–39 tuổi)</h2>
<ul>
<li>Đo huyết áp (mỗi năm)</li>
<li>Xét nghiệm máu: đường huyết, mỡ máu (cholesterol toàn phần, LDL, HDL, triglyceride)</li>
<li>Tổng phân tích nước tiểu</li>
<li>Đo chỉ số BMI và vòng bụng</li>
<li>Kiểm tra thị lực và thính lực</li>
<li>Phụ nữ: Pap smear (tầm soát ung thư cổ tử cung từ 21 tuổi)</li>
</ul>

<img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900&q=80" alt="Xét nghiệm máu" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Bổ sung cho nhóm 40–59 tuổi</h2>
<ul>
<li>Nội soi đại tràng (từ 45 tuổi, lặp lại mỗi 10 năm nếu bình thường)</li>
<li>Đo mật độ xương (DEXA scan) — đặc biệt quan trọng với phụ nữ</li>
<li>Siêu âm bụng tổng quát</li>
<li>Điện tâm đồ (ECG)</li>
<li>Tầm soát ung thư: PSA (nam giới từ 50 tuổi), mammogram (nữ từ 40 tuổi)</li>
<li>Kiểm tra chức năng tuyến giáp</li>
</ul>

<h2>Tần suất khuyến nghị</h2>
<p>Người khỏe mạnh: khám tổng quát <strong>1 lần/năm</strong>. Người có yếu tố nguy cơ (tiền sử gia đình, thừa cân, hút thuốc, ít vận động): khám <strong>2 lần/năm</strong> hoặc theo chỉ định bác sĩ.</p>

<h2>Chuẩn bị trước khi đi khám</h2>
<p>Nhịn ăn 8–12 tiếng trước khi xét nghiệm máu. Mang theo hồ sơ bệnh án cũ và danh sách thuốc đang dùng. Ghi lại các triệu chứng bất thường dù nhỏ để báo bác sĩ.</p>

<p><em>Nguồn tham khảo: WHO – Preventive Health Checkups; Bộ Y tế Việt Nam – Hướng dẫn khám sức khỏe định kỳ; Mayo Clinic – Preventive Care.</em></p>`,
  },

  // ── GÓC LÀM ĐẸP ──────────────────────────────────────────────────────────
  {
    title: 'Collagen và sức khỏe làn da: Khoa học đằng sau xu hướng đẹp từ bên trong',
    category: 'Góc làm đẹp', topic: 'Làm đẹp', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80',
    excerpt: 'Collagen chiếm 75% cấu trúc da nhưng bắt đầu giảm từ năm 25 tuổi. Hiểu đúng về collagen giúp bạn chọn cách bổ sung hiệu quả — từ thực phẩm đến supplement.',
    readTime: 6, published: true,
    tags: ['Collagen', 'Chăm sóc da', 'Làm đẹp'],
    content: `<p>Collagen là protein dồi dào nhất trong cơ thể người, chiếm khoảng 30% tổng lượng protein và lên đến 75% cấu trúc da. Nó tạo ra "khung sườn" đàn hồi giúp da căng, mịn và có độ đàn hồi. Khi collagen giảm — bắt đầu từ khoảng 25 tuổi với tốc độ 1–1.5%/năm — da bắt đầu xuất hiện nếp nhăn và mất độ tươi sáng.</p>

<img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80" alt="Chăm sóc da với collagen" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Các loại collagen quan trọng với da</h2>
<p><strong>Collagen type I:</strong> Loại phổ biến nhất, tạo nên cấu trúc chính của da, xương, gân và dây chằng. Đây là loại được nhắc đến nhiều nhất trong các sản phẩm làm đẹp.</p>
<p><strong>Collagen type III:</strong> Thường xuất hiện cùng type I, đặc biệt quan trọng với da đàn hồi và mạch máu.</p>
<p><strong>Collagen type II:</strong> Tập trung chủ yếu ở sụn khớp.</p>

<h2>Bổ sung collagen qua thực phẩm</h2>
<p>Cơ thể tổng hợp collagen từ các axit amin (đặc biệt là glycine, proline, hydroxyproline) kết hợp với Vitamin C. Do đó, chế độ ăn giàu hai nhóm dưỡng chất này là nền tảng:</p>
<ul>
<li><strong>Nguồn axit amin cho collagen:</strong> Thịt (đặc biệt da và gân), cá (kể cả da cá), trứng, đậu, hạt.</li>
<li><strong>Nước hầm xương:</strong> Chứa collagen thủy phân tự nhiên, gelatin và khoáng chất hỗ trợ xương khớp và da.</li>
<li><strong>Vitamin C:</strong> Bắt buộc cho quá trình tổng hợp collagen. Thiếu Vitamin C dẫn đến suy giảm sản xuất collagen nhanh chóng.</li>
</ul>

<img src="https://images.unsplash.com/photo-1570958944376-02b8b4b3e8c5?w=900&q=80" alt="Thực phẩm giàu collagen" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Collagen dạng supplement có thực sự hiệu quả?</h2>
<p>Collagen thủy phân (hydrolyzed collagen peptides) — dạng collagen đã được phân giải thành các peptide nhỏ hơn — có thể được hấp thu qua đường tiêu hóa và phân bố đến da. Một số nghiên cứu có đối chứng giả dược (double-blind) ghi nhận cải thiện độ đàn hồi da và giảm nếp nhăn sau 8–12 tuần bổ sung 2.5–10g collagen peptide/ngày.</p>
<p>Tuy nhiên, hiệu quả phụ thuộc vào nhiều yếu tố: chất lượng sản phẩm, nguồn gốc collagen (thủy sản thường có sinh khả dụng cao hơn nguồn bò), và chế độ dinh dưỡng tổng thể — đặc biệt cần có đủ Vitamin C để tổng hợp.</p>

<h2>Bảo vệ collagen đã có — quan trọng không kém bổ sung</h2>
<p><strong>Tránh tia UV:</strong> Tia UVA phá hủy sợi collagen trực tiếp — kem chống nắng SPF 30+ mỗi ngày là biện pháp chống lão hóa hiệu quả nhất được khoa học chứng minh.</p>
<p><strong>Không hút thuốc:</strong> Nicotine làm co mạch máu nuôi da, giảm oxy và dưỡng chất đến tế bào, đẩy nhanh phân hủy collagen.</p>
<p><strong>Hạn chế đường:</strong> Đường dư thừa gắn kết với collagen qua quá trình glycation, làm cứng và giòn sợi collagen.</p>
<p><strong>Ngủ đủ giấc:</strong> Hormone tăng trưởng tiết ra mạnh nhất trong giấc ngủ sâu, kích thích tổng hợp collagen và sửa chữa tế bào da.</p>

<p><em>Nguồn tham khảo: Sibilla S et al. Skin Pharmacol Physiol 2015; Proksch E et al. J Cosmet Dermatol 2014; Harvard Health Publishing – Collagen; AAD – Skin Care Tips.</em></p>`,
  },

  {
    title: 'Chăm sóc da mùa nắng: Bí quyết bảo vệ và dưỡng ẩm hiệu quả',
    category: 'Góc làm đẹp', topic: 'Làm đẹp', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
    excerpt: 'Ánh nắng Việt Nam gay gắt quanh năm khiến da dễ bị cháy nắng, thâm sạm và lão hóa sớm. Hướng dẫn chăm sóc da toàn diện giúp da luôn khỏe mạnh và sáng mịn.',
    readTime: 5, published: true,
    tags: ['Chăm sóc da', 'Chống nắng', 'Dưỡng ẩm'],
    content: `<p>Việt Nam nằm trong vùng nhiệt đới với cường độ UV cao quanh năm. Chỉ số UV ở các thành phố lớn thường đạt mức 8–11 (rất cao) vào buổi trưa mùa hè. Đây là một trong những lý do da người Việt dễ bị thâm sạm và lão hóa sớm nếu không có biện pháp bảo vệ đúng cách.</p>

<img src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=900&q=80" alt="Chăm sóc da dưới nắng" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Kem chống nắng — bước quan trọng nhất</h2>
<p>Kem chống nắng là sản phẩm chăm sóc da có nhiều bằng chứng khoa học nhất về hiệu quả ngăn lão hóa và giảm nguy cơ ung thư da. Một số lưu ý khi chọn và dùng:</p>
<ul>
<li><strong>SPF 30–50 cho dùng hàng ngày:</strong> SPF 30 chặn ~97% tia UVB; SPF 50 chặn ~98%. Hiệu quả tăng thêm không nhiều khi SPF cao hơn.</li>
<li><strong>Broad Spectrum (PA+++):</strong> Đảm bảo sản phẩm chống được cả UVA (lão hóa da) lẫn UVB (gây cháy nắng).</li>
<li><strong>Thoa lại sau 2 tiếng</strong> nếu ở ngoài trời, sau khi ra mồ hôi nhiều hoặc tiếp xúc nước.</li>
<li><strong>Lượng đủ:</strong> Cần khoảng ¼ thìa cà phê (~1.5ml) cho mặt và cổ để đạt được mức SPF ghi trên nhãn.</li>
</ul>

<h2>Quy trình chăm sóc da buổi sáng mùa nắng</h2>
<p><strong>Bước 1 – Rửa mặt:</strong> Dùng sữa rửa mặt dịu nhẹ, pH thấp (5.0–5.5) để không phá vỡ hàng rào bảo vệ da.</p>
<p><strong>Bước 2 – Toner/Essence:</strong> Cấp ẩm và cân bằng da với sản phẩm chứa hyaluronic acid, niacinamide hoặc centella asiatica.</p>
<p><strong>Bước 3 – Serum Vitamin C:</strong> Chống oxy hóa, hỗ trợ làm sáng da và tăng hiệu quả chống nắng.</p>
<p><strong>Bước 4 – Dưỡng ẩm:</strong> Khóa ẩm với kem dưỡng nhẹ, không gây bít tắc lỗ chân lông.</p>
<p><strong>Bước 5 – Kem chống nắng:</strong> Bước cuối cùng và quan trọng nhất, thoa đều 15–20 phút trước khi ra nắng.</p>

<img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80" alt="Sản phẩm chăm sóc da" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Chăm sóc từ bên trong</h2>
<p><strong>Uống đủ nước:</strong> 2–2.5 lít/ngày, tăng thêm khi trời nóng hoặc vận động nhiều. Da thiếu ẩm từ bên trong không loại kem dưỡng nào bù đắp được.</p>
<p><strong>Ăn nhiều chống oxy hóa:</strong> Cà chua, ớt chuông đỏ (lycopene, Vitamin C), việt quất, trà xanh giúp bảo vệ da khỏi tổn thương do UV từ bên trong.</p>
<p><strong>Omega-3:</strong> Duy trì hàng rào ẩm của da và giảm viêm do tia UV gây ra.</p>

<p><em>Nguồn tham khảo: American Academy of Dermatology – Sunscreen FAQs; Journal of the American Academy of Dermatology 2019; Hiệp hội Da liễu Việt Nam.</em></p>`,
  },

  // ── GÓC DINH DƯỠNG ───────────────────────────────────────────────────────
  {
    title: 'Chế độ ăn Địa Trung Hải: Bí quyết sống lâu và tim mạch khỏe của người châu Âu',
    category: 'Góc dinh dưỡng', topic: 'Dinh dưỡng', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80',
    excerpt: 'Được xếp hạng số 1 thế giới nhiều năm liên tiếp, chế độ ăn Địa Trung Hải không chỉ ngon miệng mà còn được chứng minh giảm nguy cơ bệnh tim mạch, tiểu đường và sa sút trí tuệ.',
    readTime: 7, published: true,
    tags: ['Chế độ ăn', 'Tim mạch', 'Dinh dưỡng khoa học'],
    content: `<p>Chế độ ăn Địa Trung Hải (Mediterranean Diet) đã liên tục được US News & World Report xếp hạng là chế độ ăn lành mạnh nhất thế giới trong nhiều năm. Không phải chế độ ăn kiêng — đây là lối ăn uống truyền thống của các quốc gia ven Địa Trung Hải như Hy Lạp, Ý, Tây Ban Nha — và khoa học đã xác nhận tại sao nó tốt đến vậy.</p>

<img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=900&q=80" alt="Thực phẩm Địa Trung Hải" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Nền tảng của chế độ ăn Địa Trung Hải</h2>
<p><strong>Rau củ và trái cây:</strong> Chiếm phần lớn đĩa ăn mỗi bữa. Đa dạng màu sắc đảm bảo nhiều loại chất chống oxy hóa và phytochemical khác nhau.</p>
<p><strong>Ngũ cốc nguyên hạt:</strong> Bánh mì nguyên cám, pasta làm từ lúa mì nguyên cám, cơm gạo lứt, quinoa thay vì ngũ cốc tinh chế.</p>
<p><strong>Dầu ô liu nguyên chất (extra virgin):</strong> Nguồn chất béo chính — giàu oleic acid và polyphenol chống oxy hóa. Thay thế bơ, mỡ động vật trong nấu ăn hàng ngày.</p>
<p><strong>Các loại đậu:</strong> Đậu lăng, đậu chickpea, đậu đen — giàu protein thực vật, chất xơ và khoáng chất. Ăn 3–4 lần/tuần.</p>
<p><strong>Cá và hải sản:</strong> Ít nhất 2 lần/tuần, đặc biệt cá béo giàu omega-3 (cá hồi, cá thu, cá mòi, cá trích).</p>
<p><strong>Hạt và quả hạch:</strong> Hạnh nhân, óc chó, hạt điều — nguồn chất béo tốt, protein và khoáng chất.</p>

<img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80" alt="Salad Địa Trung Hải" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Ăn ít hơn</h2>
<ul>
<li><strong>Thịt đỏ:</strong> Tối đa 1–2 lần/tuần, khẩu phần nhỏ</li>
<li><strong>Sản phẩm từ sữa:</strong> Phô mai và sữa chua nguyên kem nhưng với lượng vừa phải</li>
<li><strong>Thực phẩm chế biến sẵn:</strong> Hạn chế tối đa thức ăn nhanh, đồ đóng gói nhiều muối và đường</li>
</ul>

<h2>Bằng chứng khoa học</h2>
<p>Nghiên cứu PREDIMED (Prevención con Dieta Mediterránea) — một trong những nghiên cứu dinh dưỡng lớn nhất thế giới với 7.447 người tham gia — cho thấy chế độ ăn Địa Trung Hải bổ sung dầu ô liu hoặc các loại hạt giảm tỷ lệ biến cố tim mạch chính (đột quỵ, nhồi máu cơ tim, tử vong tim mạch) khoảng 30% so với chế độ ăn ít chất béo.</p>
<p>Ngoài tim mạch, các nghiên cứu quan sát cũng ghi nhận chế độ ăn này liên quan đến giảm nguy cơ tiểu đường type 2, ung thư đại tràng, bệnh Alzheimer và trầm cảm.</p>

<h2>Áp dụng cho bữa ăn Việt Nam</h2>
<p>Không cần mua dầu ô liu hay ăn pasta mỗi ngày. Triết lý cốt lõi hoàn toàn phù hợp với ẩm thực Việt: nhiều rau, ít thịt, ăn cá thường xuyên, dùng dầu thực vật tốt, hạn chế thực phẩm chế biến.</p>

<p><em>Nguồn tham khảo: Estruch R et al. NEJM 2013 (PREDIMED Study); US News Best Diets 2024; Harvard T.H. Chan School of Public Health – Mediterranean Diet.</em></p>`,
  },

  {
    title: 'Đường và sức khỏe: Bao nhiêu là quá nhiều và cách cắt giảm thông minh',
    category: 'Góc dinh dưỡng', topic: 'Dinh dưỡng', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1200&q=80',
    excerpt: 'Người Việt tiêu thụ đường trung bình vượt khuyến nghị WHO từ 2–3 lần. Tìm hiểu tác hại của đường thêm vào, cách đọc nhãn thực phẩm và chiến lược giảm đường thực tế.',
    readTime: 6, published: true,
    tags: ['Đường', 'Dinh dưỡng', 'Sức khỏe tim mạch'],
    content: `<p>Tổ chức Y tế Thế giới khuyến nghị lượng "đường tự do" (free sugars — bao gồm đường thêm vào và đường tự nhiên trong nước hoa quả ép) không nên vượt quá 10% tổng năng lượng hàng ngày, tương đương khoảng 50g (12 thìa cà phê) với người trưởng thành ăn 2.000 kcal/ngày. Lý tưởng hơn là dưới 5% — khoảng 25g/ngày.</p>

<img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" alt="Đường và thực phẩm ngọt" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Tác hại của tiêu thụ đường quá mức</h2>
<p><strong>Tăng cân và béo phì:</strong> Đường thêm vào cung cấp "calo rỗng" — năng lượng không kèm vi chất dinh dưỡng. Fructose (trong đường sucrose và HFCS) được chuyển hóa chủ yếu ở gan và dễ chuyển thành mỡ.</p>
<p><strong>Kháng insulin và tiểu đường type 2:</strong> Tiêu thụ đồ uống có đường thường xuyên liên quan chặt chẽ với nguy cơ tiểu đường type 2 trong nhiều nghiên cứu dài hạn.</p>
<p><strong>Bệnh gan nhiễm mỡ không do rượu (NAFLD):</strong> Fructose dư thừa tích lũy thành mỡ ở gan, ngay cả ở người không thừa cân.</p>
<p><strong>Sức khỏe răng miệng:</strong> Vi khuẩn trong miệng chuyển hóa đường thành axit, ăn mòn men răng.</p>
<p><strong>Viêm mãn tính:</strong> Chế độ ăn nhiều đường liên quan đến tăng marker viêm trong máu (CRP, IL-6).</p>

<h2>Đường ẩn trong thực phẩm thường ngày</h2>
<p>Nguồn đường lớn nhất không phải bánh kẹo — mà là những thực phẩm bạn không ngờ tới:</p>
<ul>
<li>Nước ngọt có ga (330ml): 35g đường (7 thìa cà phê)</li>
<li>Trà sữa trân châu (500ml): 50–70g đường</li>
<li>Nước tăng lực (250ml): 27g đường</li>
<li>Sữa chua hương trái cây (100g): 12–15g đường thêm</li>
<li>Sốt cà chua (2 thìa): 6–8g đường</li>
<li>Bánh mì sandwich (2 lát): 3–5g đường</li>
</ul>

<img src="https://images.unsplash.com/photo-1559181567-c3190bbbece2?w=900&q=80" alt="Trái cây tươi thay thế đường" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Cách cắt giảm đường thực tế</h2>
<p><strong>Đọc nhãn:</strong> Tìm "đường thêm" (added sugars) trên nhãn dinh dưỡng. Các tên gọi khác của đường: glucose, fructose, sucrose, maltose, corn syrup, dextrose, honey, agave nectar.</p>
<p><strong>Đổi đồ uống:</strong> Thay nước ngọt bằng nước lọc, nước lọc có gas không đường, trà không đường hoặc cà phê đen. Đây là bước đơn giản nhất để cắt giảm lượng đường đáng kể.</p>
<p><strong>Ăn trái cây nguyên trái thay vì nước ép:</strong> Trái cây nguyên trái chứa chất xơ làm chậm hấp thu đường; nước ép loại bỏ chất xơ và cô đặc đường.</p>
<p><strong>Nấu ăn tại nhà:</strong> Kiểm soát lượng đường trong công thức. Thường có thể giảm 25–50% lượng đường trong hầu hết các công thức mà không ảnh hưởng nhiều đến vị.</p>

<p><em>Nguồn tham khảo: WHO – Guideline: Sugars Intake for Adults and Children 2015; Lustig RH. Fructose 2.0, Metabolism 2013; Harvard T.H. Chan School of Public Health – Added Sugar; Viện Dinh dưỡng Quốc gia Việt Nam.</em></p>`,
  },

  // ── VẤN ĐỀ THƯỜNG GẶP ────────────────────────────────────────────────────
  {
    title: 'Đầy hơi, khó tiêu: Nguyên nhân thường gặp và cách cải thiện từ thói quen ăn uống',
    category: 'Vấn đề thường gặp', topic: 'Sức khỏe', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
    excerpt: 'Đầy hơi khó tiêu là phàn nàn tiêu hóa phổ biến nhất. Hầu hết trường hợp có thể cải thiện đáng kể nhờ thay đổi thói quen ăn uống và lối sống đúng cách.',
    readTime: 5, published: true,
    tags: ['Tiêu hóa', 'Đầy hơi', 'Sức khỏe đường ruột'],
    content: `<p>Đầy hơi, chướng bụng và khó tiêu là những triệu chứng tiêu hóa mà hầu hết mọi người gặp phải ít nhất một lần. Tuy không nguy hiểm trong phần lớn trường hợp, những triệu chứng này gây khó chịu đáng kể và ảnh hưởng đến chất lượng cuộc sống hàng ngày.</p>

<img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80" alt="Thực phẩm tốt cho tiêu hóa" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Nguyên nhân phổ biến</h2>
<p><strong>Nuốt không khí (aerophagia):</strong> Ăn nhanh, nhai không kỹ, uống nhiều đồ có gas, nói chuyện nhiều khi ăn — tất cả làm tăng lượng không khí trong đường tiêu hóa.</p>
<p><strong>Thực phẩm sinh khí:</strong> Các loại đậu, bắp cải, súp lơ, hành, tỏi, lúa mì (fructans) — chứa các loại carbohydrate lên men (FODMAP) sinh nhiều khí trong ruột.</p>
<p><strong>Không dung nạp lactose:</strong> Thiếu enzyme lactase để tiêu hóa đường sữa, gây đầy hơi và tiêu chảy sau khi uống sữa.</p>
<p><strong>Hội chứng ruột kích thích (IBS):</strong> Rối loạn chức năng đường ruột phổ biến, gây đau bụng, đầy hơi và thay đổi thói quen đại tiện.</p>
<p><strong>Rối loạn vi hệ đường ruột:</strong> Mất cân bằng hệ vi sinh đường ruột (gut microbiome) sau dùng kháng sinh, stress hoặc chế độ ăn ít chất xơ.</p>

<h2>Thay đổi thói quen ăn uống</h2>
<p><strong>Ăn chậm, nhai kỹ:</strong> Tiêu hóa bắt đầu từ miệng. Nhai kỹ giúp cơ học và enzyme nước bọt phân giải thức ăn tốt hơn trước khi xuống dạ dày.</p>
<p><strong>Ăn bữa nhỏ hơn, thường xuyên hơn:</strong> Bữa ăn lớn làm dạ dày căng và chậm thoát thức ăn. 4–5 bữa nhỏ/ngày thường dễ tiêu hóa hơn 2–3 bữa lớn.</p>
<p><strong>Hạn chế thực phẩm kích thích:</strong> Cà phê, rượu bia, thức ăn cay và chất béo cao kích thích dạ dày tiết nhiều axit hơn.</p>

<img src="https://images.unsplash.com/photo-1559181567-c3190bbbece2?w=900&q=80" alt="Trái cây và chất xơ" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Hỗ trợ từ probiotics và chất xơ</h2>
<p><strong>Chất xơ hòa tan (prebiotic):</strong> Nuôi dưỡng vi khuẩn có lợi trong ruột. Có nhiều trong yến mạch, táo, chuối xanh, hành tây, tỏi, măng tây.</p>
<p><strong>Thực phẩm lên men (probiotic):</strong> Sữa chua sống, kefir, dưa cải lên men, kimchi cung cấp vi khuẩn có lợi tự nhiên cho đường ruột.</p>
<p><strong>Uống đủ nước:</strong> Nước giúp thức ăn di chuyển qua đường tiêu hóa trơn tru hơn, đặc biệt khi tăng chất xơ.</p>

<h2>Khi nào cần gặp bác sĩ?</h2>
<p>Hầu hết đầy hơi khó tiêu là lành tính. Tuy nhiên, cần thăm khám nếu: đau bụng dữ dội hoặc kéo dài, sụt cân không rõ lý do, phân có máu, nuốt khó, hoặc triệu chứng không cải thiện sau 2–3 tuần thay đổi lối sống.</p>

<p><em>Nguồn tham khảo: American Gastroenterological Association – Bloating and Distension; Mayo Clinic – Gas and Gas Pains; Bệnh viện Đại học Y Dược TP.HCM – Rối loạn tiêu hóa chức năng.</em></p>`,
  },

  {
    title: 'Tóc rụng nhiều: Khi nào đáng lo và những giải pháp từ dinh dưỡng đến điều trị',
    category: 'Vấn đề thường gặp', topic: 'Sức khỏe', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80',
    excerpt: 'Rụng 50–100 sợi tóc/ngày là bình thường. Nhưng khi tóc rụng quá nhiều và tóc mới không mọc lại, đây có thể là dấu hiệu thiếu dinh dưỡng hoặc vấn đề sức khỏe cần chú ý.',
    readTime: 6, published: true,
    tags: ['Rụng tóc', 'Tóc khỏe', 'Dinh dưỡng cho tóc'],
    content: `<p>Chu kỳ tóc bình thường gồm 3 giai đoạn: tăng trưởng (anagen, 2–7 năm), chuyển tiếp (catagen, vài tuần), và nghỉ ngơi (telogen, 3 tháng) rồi rụng. Ở bất kỳ thời điểm nào, khoảng 10–15% sợi tóc đang ở giai đoạn telogen và chuẩn bị rụng. Do đó, rụng 50–100 sợi mỗi ngày là hoàn toàn bình thường.</p>

<img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80" alt="Chăm sóc tóc" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Nguyên nhân rụng tóc phổ biến</h2>
<p><strong>Telogen effluvium:</strong> Rụng tóc đột ngột và lan tỏa sau stress mạnh (bệnh nặng, phẫu thuật, sinh con, sụt cân nhanh). Thường tự hồi phục trong 3–6 tháng khi loại bỏ nguyên nhân.</p>
<p><strong>Thiếu dinh dưỡng:</strong> Thiếu sắt, kẽm, biotin (B7), protein, vitamin D là những nguyên nhân dinh dưỡng hay gặp nhất.</p>
<p><strong>Rối loạn nội tiết:</strong> Suy giáp, cường giáp, hội chứng buồng trứng đa nang (PCOS) đều có thể gây rụng tóc.</p>
<p><strong>Rụng tóc di truyền (androgenetic alopecia):</strong> Phổ biến ở cả nam và nữ, liên quan đến hormone DHT tác động lên nang tóc.</p>
<p><strong>Bệnh lý da đầu:</strong> Nấm da đầu, viêm da tiết bã, vảy nến.</p>

<h2>Dinh dưỡng hỗ trợ tóc khỏe</h2>
<p><strong>Sắt (Iron):</strong> Thiếu sắt — đặc biệt phổ biến ở phụ nữ trong độ tuổi sinh sản — là nguyên nhân rụng tóc có thể điều trị được hay gặp nhất. Xét nghiệm ferritin (sắt dự trữ) là cách chính xác nhất để đánh giá. Nguồn sắt heme (dễ hấp thu): thịt đỏ nạc, gan, hải sản; nguồn sắt non-heme: đậu, rau lá xanh đậm.</p>
<p><strong>Protein:</strong> Tóc được cấu tạo chủ yếu từ keratin — một dạng protein. Chế độ ăn thiếu protein ảnh hưởng trực tiếp đến tóc. Cần đủ 1–1.2g protein/kg cân nặng/ngày.</p>
<p><strong>Kẽm (Zinc):</strong> Tham gia vào tổng hợp protein và phân chia tế bào nang tóc. Thiếu kẽm gây rụng tóc và da đầu khô. Nguồn: hải sản, thịt đỏ, hạt bí.</p>
<p><strong>Biotin (Vitamin B7):</strong> Nổi tiếng với tác dụng hỗ trợ tóc và móng, dù thiếu biotin thực sự khá hiếm. Nguồn: lòng đỏ trứng, các loại hạt, ngũ cốc.</p>

<img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80" alt="Thực phẩm cho tóc khỏe" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Khi nào cần gặp bác sĩ?</h2>
<p>Thăm khám da liễu hoặc nội tiết khi: tóc rụng thành mảng tập trung, đường chân tóc lùi nhanh, rụng tóc kèm triệu chứng khác (mệt mỏi, thay đổi cân nặng, kinh nguyệt không đều). Bác sĩ sẽ chỉ định xét nghiệm phù hợp (TSH, ferritin, hormone) để xác định nguyên nhân cụ thể trước khi điều trị.</p>

<p><em>Nguồn tham khảo: American Academy of Dermatology – Hair Loss; Guo EL, Katta R. Dermatology Practical & Conceptual 2017; Bệnh viện Da liễu Trung ương – Rụng tóc.</em></p>`,
  },

  // ── TIN Y TẾ ──────────────────────────────────────────────────────────────
  {
    title: 'Nghiên cứu mới 2025: Đi bộ 7.000 bước mỗi ngày giảm đáng kể nguy cơ tử vong sớm',
    category: 'Tin Y tế', topic: 'Sức khỏe', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
    excerpt: 'Nghiên cứu từ JAMA Internal Medicine xác nhận không cần đạt 10.000 bước/ngày — chỉ 7.000 bước đã giảm 50–70% nguy cơ tử vong từ mọi nguyên nhân so với ít vận động.',
    readTime: 5, published: true,
    tags: ['Đi bộ', 'Nghiên cứu khoa học', 'Sức khỏe tim mạch'],
    content: `<p>Con số 10.000 bước mỗi ngày từ lâu đã trở thành "tiêu chuẩn vàng" trong giới sức khỏe — nhưng thực ra nó xuất phát từ một chiến dịch marketing của công ty máy đếm bước chân Nhật Bản năm 1965, không phải khoa học. Nghiên cứu gần đây đã làm sáng tỏ con số thực sự chúng ta cần.</p>

<img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&q=80" alt="Đi bộ tốt cho sức khỏe" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Kết quả nghiên cứu quan trọng</h2>
<p>Một phân tích tổng hợp (meta-analysis) công bố trên JAMA Internal Medicine năm 2021, theo dõi hơn 47.000 người ở 4 quốc gia, kết luận:</p>
<ul>
<li>Những người đi bộ <strong>7.000–8.000 bước/ngày</strong> có nguy cơ tử vong từ mọi nguyên nhân thấp hơn <strong>50–70%</strong> so với nhóm dưới 4.000 bước/ngày</li>
<li>Lợi ích sức khỏe tăng đáng kể từ mức 7.000 bước, nhưng tăng thêm từ 7.000 lên 10.000+ bước cho lợi ích bổ sung ít hơn</li>
<li>Tốc độ bước (step intensity) cũng quan trọng — đi bộ nhanh cho lợi ích tim mạch cao hơn đi bộ chậm cùng số bước</li>
</ul>

<h2>Tại sao đi bộ tốt đến vậy?</h2>
<p>Đi bộ là bài tập aerobic nhẹ đến vừa phải, phù hợp với hầu hết mọi lứa tuổi và không cần thiết bị. Lợi ích được ghi nhận bao gồm: cải thiện sức khỏe tim mạch, hỗ trợ kiểm soát đường huyết và huyết áp, duy trì cân nặng khỏe mạnh, cải thiện sức khỏe tâm thần và giảm nguy cơ trầm cảm, tăng cường mật độ xương, cải thiện chất lượng giấc ngủ.</p>

<img src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=900&q=80" alt="Lợi ích đi bộ" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Làm thế nào để đạt 7.000 bước mỗi ngày?</h2>
<p>7.000 bước tương đương khoảng 5–5.5 km, mất khoảng 60–70 phút đi bộ liên tục — hoặc có thể chia nhỏ trong ngày:</p>
<ul>
<li>Đỗ xe xa hơn hoặc xuống xe buýt sớm 1–2 trạm</li>
<li>Đi cầu thang thay thang máy</li>
<li>Đi bộ 10–15 phút sau mỗi bữa ăn</li>
<li>Dạo bộ buổi tối 30 phút cùng gia đình</li>
<li>Họp đi bộ (walking meeting) thay vì ngồi trong phòng</li>
</ul>
<p>Điện thoại thông minh ngày nay đều có tính năng đếm bước — không cần mua thiết bị riêng. Đặt mục tiêu 7.000 bước/ngày và tăng dần lên 8.000–9.000 khi đã thành thói quen.</p>

<p><em>Nguồn tham khảo: Saint-Maurice PF et al. JAMA Internal Medicine 2020; Paluch AE et al. JAMA Internal Medicine 2021; WHO – Physical Activity Guidelines 2020.</em></p>`,
  },

  {
    title: 'WHO cảnh báo: Kháng kháng sinh là một trong những mối đe dọa sức khỏe toàn cầu lớn nhất',
    category: 'Tin Y tế', topic: 'Sức khỏe', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200&q=80',
    excerpt: 'Mỗi năm, kháng kháng sinh gây ra ít nhất 1.27 triệu ca tử vong trực tiếp trên toàn cầu. Việt Nam là một trong những nước có tỷ lệ sử dụng kháng sinh bừa bãi cao nhất khu vực.',
    readTime: 6, published: true,
    tags: ['Kháng kháng sinh', 'Sức khỏe cộng đồng', 'Y tế'],
    content: `<p>Kháng kháng sinh (Antimicrobial Resistance – AMR) xảy ra khi vi khuẩn, virus, nấm và ký sinh trùng tiến hóa để kháng lại các loại thuốc được thiết kế để tiêu diệt chúng. Đây không còn là mối đe dọa trong tương lai — nó đang xảy ra ngay bây giờ và ảnh hưởng đến khả năng điều trị các bệnh nhiễm trùng thông thường.</p>

<img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80" alt="Kháng kháng sinh" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Quy mô của vấn đề</h2>
<p>Theo nghiên cứu toàn cầu công bố trên The Lancet năm 2022, ít nhất <strong>1.27 triệu người</strong> tử vong trực tiếp do nhiễm khuẩn kháng thuốc mỗi năm — và 4.95 triệu ca tử vong có liên quan. Nếu không có biện pháp can thiệp, WHO dự báo con số này có thể lên đến 10 triệu người/năm vào năm 2050, vượt qua cả ung thư.</p>

<h2>Tình trạng tại Việt Nam</h2>
<p>Việt Nam được xếp vào nhóm các nước có tỷ lệ kháng kháng sinh cao và là một trong những nước tiêu thụ kháng sinh nhiều nhất khu vực Đông Nam Á. Nguyên nhân chính:</p>
<ul>
<li>Bán kháng sinh không cần đơn thuốc tại nhiều nhà thuốc (dù đã bị hạn chế)</li>
<li>Người dân tự mua và sử dụng kháng sinh khi bị cảm lạnh, cúm (vốn do virus gây ra — kháng sinh không có tác dụng)</li>
<li>Dùng kháng sinh không đủ liều hoặc bỏ giữa chừng khi triệu chứng cải thiện</li>
<li>Sử dụng kháng sinh trong chăn nuôi và nuôi trồng thủy sản</li>
</ul>

<img src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=900&q=80" alt="Sử dụng kháng sinh đúng cách" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Những điều cần biết để dùng kháng sinh đúng cách</h2>
<p><strong>Kháng sinh không chữa cảm lạnh, cúm:</strong> Đây là bệnh do virus gây ra. Kháng sinh chỉ tác dụng với vi khuẩn. Dùng kháng sinh trong trường hợp này không có lợi ích và gây hại.</p>
<p><strong>Hoàn thành liệu trình:</strong> Dù cảm thấy khỏe hơn sau 2–3 ngày, vẫn phải uống đủ liều theo chỉ định. Dừng sớm để lại vi khuẩn chưa chết có cơ hội phát triển kháng thuốc.</p>
<p><strong>Không chia sẻ kháng sinh:</strong> Kháng sinh được kê theo từng người, từng loại nhiễm khuẩn cụ thể. Thuốc của bạn có thể không phù hợp và thậm chí gây hại cho người khác.</p>
<p><strong>Không tích trữ kháng sinh:</strong> Không giữ kháng sinh thừa để dùng lần sau — tình trạng bệnh khác nhau cần kháng sinh khác nhau.</p>

<p><em>Nguồn tham khảo: Murray CJ et al. The Lancet 2022; WHO – Antimicrobial Resistance Fact Sheet; Bộ Y tế Việt Nam – Kế hoạch hành động quốc gia về chống kháng thuốc 2024–2025.</em></p>`,
  },

  // ── TIN TUYỂN DỤNG ────────────────────────────────────────────────────────
  {
    title: 'Vinapharma tuyển dụng Trình dược viên và Nhân viên kinh doanh khu vực TP.HCM 2026',
    category: 'Tin Tuyển dụng', topic: '', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
    excerpt: 'Vinapharma đang mở rộng đội ngũ bán hàng tại TP.HCM và các tỉnh phía Nam. Chúng tôi tìm kiếm những ứng viên năng động, đam mê ngành dược và sức khỏe để cùng phát triển.',
    readTime: 4, published: true,
    tags: ['Tuyển dụng', 'Trình dược viên', 'Nhân viên kinh doanh'],
    content: `<p>Vinapharma – nhà phân phối thực phẩm bảo vệ sức khỏe hàng đầu Việt Nam – đang tiếp tục mở rộng đội ngũ để đáp ứng nhu cầu tăng trưởng mạnh trong năm 2026. Chúng tôi tìm kiếm những người tài năng, nhiệt huyết và đam mê với lĩnh vực sức khỏe để cùng xây dựng thương hiệu và phục vụ cộng đồng.</p>

<img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80" alt="Đội ngũ Vinapharma" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Vị trí 1: Trình dược viên (Medical Sales Representative)</h2>
<p><strong>Số lượng:</strong> 5 người | <strong>Khu vực:</strong> TP.HCM, Bình Dương, Đồng Nai</p>

<h3>Mô tả công việc</h3>
<ul>
<li>Giới thiệu, tư vấn và bán các sản phẩm thực phẩm bảo vệ sức khỏe của Vinapharma đến nhà thuốc, bệnh viện, phòng khám và khách hàng doanh nghiệp</li>
<li>Xây dựng và duy trì mối quan hệ với khách hàng trong khu vực được phân công</li>
<li>Đạt chỉ tiêu doanh số theo tháng/quý</li>
<li>Cập nhật thông tin thị trường và báo cáo định kỳ cho quản lý</li>
</ul>

<h3>Yêu cầu</h3>
<ul>
<li>Tốt nghiệp Cao đẳng trở lên, ưu tiên ngành Dược, Y, Dinh dưỡng hoặc Kinh doanh</li>
<li>Có ít nhất 1 năm kinh nghiệm bán hàng (kinh nghiệm ngành dược là lợi thế lớn)</li>
<li>Có xe máy và bằng lái xe hợp lệ</li>
<li>Kỹ năng giao tiếp và thuyết trình tốt</li>
<li>Năng động, chủ động và có định hướng mục tiêu rõ ràng</li>
</ul>

<img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80" alt="Làm việc tại Vinapharma" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Vị trí 2: Nhân viên Kinh doanh Online (E-commerce Executive)</h2>
<p><strong>Số lượng:</strong> 3 người | <strong>Hình thức:</strong> Toàn thời gian, tại văn phòng TP.HCM</p>

<h3>Mô tả công việc</h3>
<ul>
<li>Quản lý và phát triển kênh bán hàng online: website, Shopee, Lazada, TikTok Shop</li>
<li>Tư vấn và chăm sóc khách hàng qua các kênh digital</li>
<li>Phối hợp với team marketing để chạy các chương trình khuyến mãi</li>
<li>Phân tích dữ liệu bán hàng và đề xuất cải thiện</li>
</ul>

<h2>Quyền lợi hấp dẫn</h2>
<ul>
<li>Lương cơ bản cạnh tranh + hoa hồng hấp dẫn (không giới hạn thu nhập)</li>
<li>Phụ cấp xăng xe, điện thoại, công tác phí</li>
<li>Đóng đầy đủ BHXH, BHYT, BHTN từ ngày đầu làm việc</li>
<li>Thưởng KPI hàng quý và thưởng tết</li>
<li>Đào tạo chuyên sâu về sản phẩm và kỹ năng bán hàng</li>
<li>Cơ hội thăng tiến nhanh trong môi trường năng động</li>
</ul>

<h2>Cách ứng tuyển</h2>
<p>Gửi CV và thư giới thiệu về email: <strong>tuyendung@vinapharmajsc.vn</strong> với tiêu đề: [Vị trí ứng tuyển] – [Họ tên]. Hoặc điền form liên hệ tại trang web với chủ đề "Đăng ký đại lý / Cộng tác viên".</p>
<p>Hạn nộp hồ sơ: <strong>31/03/2026</strong>. Chúng tôi sẽ liên hệ các ứng viên phù hợp trong vòng 7 ngày làm việc.</p>`,
  },

  {
    title: 'Vinapharma tuyển dụng Dược sĩ tư vấn và Chuyên viên Marketing sức khỏe 2026',
    category: 'Tin Tuyển dụng', topic: '', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1559523161-0fc0d8b814dc?w=1200&q=80',
    excerpt: 'Chúng tôi tìm kiếm Dược sĩ tư vấn sản phẩm và Chuyên viên Marketing am hiểu lĩnh vực sức khỏe để tham gia đội ngũ Vinapharma ngày càng lớn mạnh.',
    readTime: 4, published: true,
    tags: ['Tuyển dụng', 'Dược sĩ', 'Marketing sức khỏe'],
    content: `<p>Vinapharma không chỉ là nơi bán sản phẩm — chúng tôi là đơn vị cung cấp giải pháp sức khỏe toàn diện. Để thực hiện sứ mệnh đó, chúng tôi cần những chuyên gia có kiến thức chuyên môn sâu về dược phẩm và dinh dưỡng, cũng như những người sáng tạo trong lĩnh vực truyền thông sức khỏe.</p>

<img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80" alt="Dược sĩ tư vấn" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Vị trí 1: Dược sĩ Tư vấn sản phẩm (Pharmacist Consultant)</h2>
<p><strong>Số lượng:</strong> 2 người | <strong>Hình thức:</strong> Toàn thời gian</p>

<h3>Mô tả công việc</h3>
<ul>
<li>Tư vấn khách hàng về sản phẩm thực phẩm bảo vệ sức khỏe phù hợp với nhu cầu và tình trạng sức khỏe</li>
<li>Biên soạn nội dung thông tin sản phẩm, bài tư vấn sức khỏe cho website và tài liệu marketing</li>
<li>Đào tạo kiến thức sản phẩm cho đội ngũ bán hàng</li>
<li>Phối hợp với nhà cung cấp và bộ phận nhập khẩu để cập nhật thông tin khoa học mới nhất</li>
<li>Đảm bảo tuân thủ quy định của Bộ Y tế về quảng cáo và ghi nhãn thực phẩm bảo vệ sức khỏe</li>
</ul>

<h3>Yêu cầu</h3>
<ul>
<li>Bằng Dược sĩ Đại học (bắt buộc)</li>
<li>Kiến thức về thực phẩm bảo vệ sức khỏe, thực phẩm chức năng, dược liệu</li>
<li>Kỹ năng viết tốt, có khả năng truyền đạt thông tin khoa học dễ hiểu</li>
<li>Ưu tiên ứng viên có kinh nghiệm tư vấn tại nhà thuốc hoặc bệnh viện</li>
</ul>

<img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80" alt="Marketing sức khỏe" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Vị trí 2: Chuyên viên Marketing Sức khỏe (Health Marketing Specialist)</h2>
<p><strong>Số lượng:</strong> 2 người | <strong>Hình thức:</strong> Toàn thời gian</p>

<h3>Mô tả công việc</h3>
<ul>
<li>Lên kế hoạch và triển khai các chiến dịch marketing digital: Facebook, Instagram, TikTok, Google Ads</li>
<li>Sản xuất nội dung (bài viết, video ngắn, infographic) về sức khỏe và sản phẩm</li>
<li>Quản lý fanpage và các kênh mạng xã hội của Vinapharma</li>
<li>Phân tích hiệu quả chiến dịch và tối ưu hóa liên tục</li>
<li>Phối hợp với Dược sĩ tư vấn để đảm bảo nội dung chính xác và tuân thủ quy định</li>
</ul>

<h3>Yêu cầu</h3>
<ul>
<li>Tốt nghiệp Đại học ngành Marketing, Truyền thông, Báo chí hoặc liên quan</li>
<li>Ít nhất 2 năm kinh nghiệm marketing digital</li>
<li>Hiểu biết về lĩnh vực sức khỏe, dược phẩm hoặc dinh dưỡng là lợi thế lớn</li>
<li>Thành thạo các công cụ: Facebook Ads Manager, Google Analytics, Canva, CapCut</li>
</ul>

<h2>Môi trường làm việc tại Vinapharma</h2>
<p>Chúng tôi tự hào về văn hóa làm việc cởi mở, học hỏi liên tục và tôn trọng đóng góp của từng cá nhân. Đội ngũ trẻ, năng động với sứ mệnh thực sự có ý nghĩa — giúp người Việt tiếp cận sản phẩm sức khỏe chất lượng và thông tin y tế đáng tin cậy.</p>

<p><strong>Ứng tuyển:</strong> Email CV đến <strong>tuyendung@vinapharmajsc.vn</strong> với tiêu đề: [Vị trí ứng tuyển] – [Họ tên].</p>`,
  },

  // ── TRUYỀN THÔNG ──────────────────────────────────────────────────────────
  {
    title: 'Vinapharma ra mắt nền tảng sức khỏe trực tuyến toàn diện vinapharmajsc.vn',
    category: 'Truyền thông', topic: '', featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80',
    excerpt: 'Vinapharma chính thức ra mắt website vinapharmajsc.vn — nền tảng kết hợp thương mại điện tử, tư vấn sức khỏe và chương trình khách hàng thân thiết đầu tiên trong ngành dược phẩm Việt Nam.',
    readTime: 4, published: true,
    tags: ['Vinapharma', 'Ra mắt website', 'Công nghệ sức khỏe'],
    content: `<p>Trong bối cảnh chuyển đổi số đang diễn ra mạnh mẽ trong ngành y tế và dược phẩm, Vinapharma JSC chính thức ra mắt nền tảng trực tuyến tích hợp tại địa chỉ <strong>vinapharmajsc.vn</strong> — đánh dấu bước chuyển mình quan trọng trong hành trình đồng hành cùng sức khỏe người Việt.</p>

<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" alt="Nền tảng trực tuyến Vinapharma" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Những tính năng nổi bật</h2>
<p><strong>Danh mục sản phẩm toàn diện:</strong> Hàng trăm sản phẩm thực phẩm bảo vệ sức khỏe được kiểm định chất lượng từ các thương hiệu uy tín trong nước và quốc tế, phân loại theo mục tiêu sức khỏe để khách hàng dễ dàng tìm kiếm.</p>
<p><strong>Tư vấn sức khỏe miễn phí:</strong> Đội ngũ dược sĩ và chuyên gia dinh dưỡng sẵn sàng tư vấn qua chat trực tiếp, giúp khách hàng chọn sản phẩm phù hợp nhất với nhu cầu cá nhân.</p>
<p><strong>Chương trình tích điểm Thành viên Vinapharma:</strong> Hệ thống 5 hạng thành viên (Thành viên – Đồng – Bạc – Vàng – Kim Cương) với quyền lợi ngày càng cao theo mức chi tiêu. Điểm tích lũy có thể đổi lấy quà tặng và ưu đãi mua hàng.</p>
<p><strong>Kho tri thức sức khỏe:</strong> Thư viện bài viết chuyên sâu về dinh dưỡng, sức khỏe, làm đẹp và lối sống lành mạnh — được biên soạn bởi đội ngũ chuyên gia và trích dẫn từ nguồn khoa học uy tín.</p>

<img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80" alt="Mua sắm sức khỏe trực tuyến" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Cam kết chất lượng</h2>
<p>Tất cả sản phẩm trên vinapharmajsc.vn đều có đầy đủ giấy tờ pháp lý theo quy định của Bộ Y tế Việt Nam, nguồn gốc xuất xứ rõ ràng và được kiểm tra chất lượng trước khi đến tay người tiêu dùng.</p>
<p>"Chúng tôi không chỉ bán sản phẩm — chúng tôi đồng hành cùng hành trình sức khỏe của mỗi người Việt. Nền tảng vinapharmajsc.vn là hiện thân của cam kết đó," đại diện Ban lãnh đạo Vinapharma chia sẻ.</p>

<h2>Ưu đãi chào mừng</h2>
<p>Nhân dịp ra mắt, khách hàng đăng ký tài khoản mới tại vinapharmajsc.vn nhận ngay ưu đãi đặc biệt cho đơn hàng đầu tiên. Theo dõi trang Khuyến mãi để cập nhật các chương trình ưu đãi mới nhất.</p>`,
  },

  {
    title: 'Vinapharma đồng hành cùng chương trình "Sức khỏe cộng đồng" tại 5 tỉnh thành 2026',
    category: 'Truyền thông', topic: '', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80',
    excerpt: 'Tiếp nối hành trình thiện nguyện, Vinapharma tài trợ chương trình tư vấn sức khỏe miễn phí và tặng sản phẩm cho hơn 5.000 người dân tại các vùng nông thôn trong năm 2026.',
    readTime: 4, published: true,
    tags: ['CSR', 'Cộng đồng', 'Sức khỏe cộng đồng', 'Thiện nguyện'],
    content: `<p>Năm 2026, Vinapharma JSC tiếp tục triển khai chuỗi hoạt động trách nhiệm xã hội doanh nghiệp (CSR) với quy mô lớn hơn, hướng đến mục tiêu nâng cao nhận thức và chăm sóc sức khỏe cho cộng đồng — đặc biệt là người dân tại các vùng nông thôn, vùng sâu vùng xa còn hạn chế tiếp cận dịch vụ y tế.</p>

<img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&q=80" alt="Hoạt động cộng đồng Vinapharma" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Chương trình "Sức khỏe đến từng nhà" 2026</h2>
<p>Phối hợp với Hội Liên hiệp Phụ nữ và Hội Y học cộng đồng các tỉnh, Vinapharma tổ chức các buổi khám và tư vấn sức khỏe miễn phí tại 5 tỉnh thành: Long An, Tiền Giang, Bến Tre, Đồng Tháp và An Giang.</p>
<p>Mỗi buổi khám huy động từ 5–10 bác sĩ, dược sĩ và chuyên gia dinh dưỡng tự nguyện, phục vụ 200–500 người dân mỗi ngày. Vinapharma tài trợ toàn bộ chi phí tổ chức và tặng gói sản phẩm bảo vệ sức khỏe cho các gia đình có hoàn cảnh khó khăn.</p>

<h2>Kết quả năm 2025</h2>
<ul>
<li>Hơn <strong>8.500 lượt</strong> người dân được khám và tư vấn sức khỏe miễn phí</li>
<li><strong>3.200 phần quà</strong> sức khỏe (bao gồm Vitamin C, Canxi, Omega-3 và khẩu trang y tế) được trao tặng</li>
<li><strong>12 buổi</strong> hội thảo giáo dục sức khỏe cộng đồng tại trường học và nhà văn hóa</li>
<li>Phối hợp với <strong>6 bệnh viện tuyến huyện</strong> trong các hoạt động nâng cao năng lực y tế địa phương</li>
</ul>

<img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=80" alt="Trao quà cộng đồng" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0">

<h2>Sứ mệnh vươn xa</h2>
<p>"Sức khỏe tốt không chỉ là quyền của người có điều kiện. Chúng tôi tin rằng mỗi người Việt, dù ở đâu, đều xứng đáng được tiếp cận thông tin và sản phẩm chăm sóc sức khỏe chất lượng," đại diện Vinapharma JSC chia sẻ về triết lý phát triển bền vững của doanh nghiệp.</p>
<p>Kế hoạch 2026 bao gồm mở rộng chương trình đến <strong>8 tỉnh thành</strong>, tăng số lượng người thụ hưởng lên <strong>15.000 người</strong> và thiết lập quỹ học bổng dành cho sinh viên ngành Dược và Y tế công cộng tại các trường Đại học khu vực phía Nam.</p>

<p><em>Để đồng hành cùng Vinapharma trong các hoạt động thiện nguyện, cá nhân và tổ chức có thể liên hệ qua trang Liên hệ tại vinapharmajsc.vn.</em></p>`,
  },

];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const admin = await User.findOne({ role: 'admin' });
  if (!admin) { console.error('No admin user found'); process.exit(1); }
  console.log('Author:', admin.email || admin.name);

  let created = 0, skipped = 0;
  for (const p of posts) {
    const exists = await Post.findOne({ title: p.title });
    if (exists) { console.log('  SKIP:', p.title); skipped++; continue; }
    await Post.create({ ...p, author: admin._id, publishedAt: new Date() });
    console.log('  OK:', p.title);
    created++;
  }

  console.log(`\nDone: ${created} created, ${skipped} skipped`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
