require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');

const ADMIN_ID = '69b3a064e4ea0cc6bcbf931a';

const posts = [
  // ===== DINH DƯỠNG =====
  {
    title: 'Omega-3 và vai trò thiết yếu với sức khỏe tim mạch, não bộ',
    category: 'Dinh dưỡng',
    excerpt: 'Omega-3 là axit béo thiết yếu mà cơ thể không tự tổng hợp được. Bổ sung đúng cách giúp hỗ trợ sức khỏe tim mạch, não bộ và giảm viêm hiệu quả.',
    thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ NIH Office of Dietary Supplements, Harvard T.H. Chan School of Public Health',
    author: ADMIN_ID,
    content: '<p>Omega-3 là nhóm axit béo không bão hòa đa chuỗi dài (PUFA) gồm ba dạng chính: ALA (alpha-linolenic acid) có nhiều trong hạt lanh và quả óc chó; EPA (eicosapentaenoic acid) và DHA (docosahexaenoic acid) có nhiều trong cá béo như cá hồi, cá thu, cá sardine.</p><h3>Lợi ích nổi bật của Omega-3</h3><p>Theo Viện Dinh dưỡng Quốc gia Hoa Kỳ (NIH), omega-3 đặc biệt EPA và DHA có liên quan đến việc hỗ trợ duy trì sức khỏe tim mạch thông qua cơ chế giúp điều hòa nồng độ triglyceride trong máu, hỗ trợ độ đàn hồi thành mạch và giảm nguy cơ viêm nhiễm mạn tính.</p><p>DHA là thành phần cấu trúc chính của não và võng mạc. Bổ sung đủ DHA trong giai đoạn phát triển não bộ — đặc biệt ở trẻ em và phụ nữ mang thai — được nhiều nghiên cứu ghi nhận là quan trọng để hỗ trợ chức năng nhận thức và thị lực khỏe mạnh.</p><h3>Nguồn thực phẩm giàu Omega-3</h3><ul><li><strong>Cá béo:</strong> Cá hồi, cá thu, cá trích, cá sardine (2–3 khẩu phần/tuần)</li><li><strong>Hạt chia, hạt lanh:</strong> Giàu ALA — dạng omega-3 thực vật</li><li><strong>Quả óc chó:</strong> Một trong những loại hạt giàu ALA nhất</li><li><strong>Dầu tảo:</strong> Nguồn DHA phù hợp cho người ăn chay/thuần chay</li></ul><h3>Liều lượng tham khảo</h3><p>Tổ chức Y tế Thế giới (WHO) khuyến nghị người trưởng thành nên tiêu thụ ít nhất 250–500 mg EPA + DHA mỗi ngày từ thực phẩm hoặc thực phẩm bổ sung. Tuy nhiên, nhu cầu cụ thể có thể khác nhau tùy theo tình trạng sức khỏe cá nhân.</p><h3>Lưu ý khi bổ sung</h3><p>Omega-3 từ thực phẩm tự nhiên được coi là an toàn cho hầu hết mọi người. Với thực phẩm bổ sung dạng viên nang, nên tham khảo ý kiến bác sĩ hoặc dược sĩ trước khi sử dụng, đặc biệt nếu đang dùng thuốc chống đông máu hoặc có bệnh lý nền.</p><p><em>Nguồn tham khảo: NIH Office of Dietary Supplements – Omega-3 Fatty Acids Fact Sheet; Harvard T.H. Chan School of Public Health – The Nutrition Source: Omega-3 Fatty Acids.</em></p>'
  },
  {
    title: 'Protein trong chế độ ăn: bao nhiêu là đủ và từ đâu?',
    category: 'Dinh dưỡng',
    excerpt: 'Protein là nền tảng của mọi tế bào trong cơ thể. Hiểu đúng về nhu cầu protein hàng ngày và cách chọn nguồn protein chất lượng giúp bạn xây dựng chế độ ăn khoa học hơn.',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ WHO, Viện Dinh dưỡng Việt Nam, Harvard School of Public Health',
    author: ADMIN_ID,
    content: '<p>Protein — hay còn gọi là chất đạm — là một trong ba nhóm dinh dưỡng đa lượng thiết yếu, đóng vai trò quan trọng trong việc xây dựng và sửa chữa mô tế bào, sản xuất enzyme và hormone, hỗ trợ hệ miễn dịch và vận chuyển dưỡng chất trong cơ thể.</p><h3>Nhu cầu protein hàng ngày</h3><p>Theo khuyến nghị của Viện Dinh dưỡng Việt Nam, người trưởng thành khỏe mạnh cần khoảng 0,8–1,0 g protein/kg cân nặng/ngày. Người tập thể dục cường độ cao, phụ nữ mang thai hoặc cho con bú, người cao tuổi, và người đang hồi phục sau bệnh/chấn thương có thể cần lượng cao hơn (1,2–2,0 g/kg/ngày tùy đối tượng).</p><h3>Nguồn protein động vật</h3><ul><li>Thịt nạc (gà, bò, lợn), cá, hải sản</li><li>Trứng — nguồn protein hoàn chỉnh, dễ hấp thu</li><li>Sữa và các sản phẩm từ sữa (phô mai, sữa chua)</li></ul><h3>Nguồn protein thực vật</h3><ul><li>Đậu nành và sản phẩm từ đậu nành (đậu phụ, sữa đậu nành, edamame)</li><li>Các loại đậu (đậu lăng, đậu đen, đậu xanh)</li><li>Quinoa — một trong ít nguồn protein thực vật đầy đủ axit amin thiết yếu</li><li>Hạt (hạt bí, hạt hướng dương, hạnh nhân)</li></ul><h3>Protein hoàn chỉnh và không hoàn chỉnh</h3><p>Protein hoàn chỉnh chứa đủ 9 axit amin thiết yếu mà cơ thể không tự tổng hợp được — thường có trong thực phẩm động vật và đậu nành. Protein không hoàn chỉnh thiếu một hoặc nhiều axit amin thiết yếu — phổ biến trong thực phẩm thực vật. Người ăn chay thuần có thể phối hợp nhiều nguồn thực phẩm để bổ sung đủ các axit amin cần thiết.</p><h3>Phân bổ protein trong ngày</h3><p>Nghiên cứu từ Harvard School of Public Health gợi ý rằng phân bổ đều lượng protein trong ba bữa ăn (thay vì dồn vào một bữa) giúp cơ thể hấp thu và sử dụng hiệu quả hơn, đặc biệt trong hỗ trợ duy trì và phát triển khối lượng cơ.</p><p><em>Nguồn tham khảo: Viện Dinh dưỡng Quốc gia Việt Nam; Harvard T.H. Chan School of Public Health – The Nutrition Source: Protein; WHO Protein and Amino Acid Requirements in Human Nutrition.</em></p>'
  },

  // ===== SỨC KHỎE =====
  {
    title: 'Vitamin D: "vitamin ánh nắng" và tầm quan trọng với sức khỏe xương khớp',
    category: 'Sức khỏe',
    excerpt: 'Thiếu hụt Vitamin D là một trong những tình trạng dinh dưỡng phổ biến nhất toàn cầu. Tìm hiểu vai trò của vitamin D với xương, miễn dịch và cách bổ sung an toàn.',
    thumbnail: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ NIH, Endocrine Society, Mayo Clinic',
    author: ADMIN_ID,
    content: '<p>Vitamin D là vitamin tan trong chất béo mà cơ thể có thể tự tổng hợp khi da tiếp xúc trực tiếp với ánh nắng mặt trời (tia UVB). Ngoài ra, vitamin D cũng có thể được bổ sung qua thực phẩm và thực phẩm bổ sung.</p><h3>Vai trò của Vitamin D với cơ thể</h3><p>Vitamin D đóng vai trò trung tâm trong việc điều hòa hấp thu canxi và phốt pho — hai khoáng chất thiết yếu cho sức khỏe xương và răng. Thiếu vitamin D có thể liên quan đến giảm mật độ xương, tăng nguy cơ loãng xương và gãy xương ở người lớn tuổi.</p><p>Ngoài vai trò với xương, các nghiên cứu cũng ghi nhận mối liên hệ giữa mức vitamin D đầy đủ với việc hỗ trợ chức năng hệ miễn dịch, điều hòa phản ứng viêm và duy trì sức khỏe cơ bắp.</p><h3>Ai có nguy cơ thiếu hụt Vitamin D?</h3><ul><li>Người ít tiếp xúc ánh nắng (làm việc trong nhà, mặc kín)</li><li>Người cao tuổi (da giảm khả năng tổng hợp vitamin D)</li><li>Người có làn da sẫm màu</li><li>Người mắc các bệnh lý ảnh hưởng đến hấp thu chất béo</li><li>Người ăn chay thuần (vitamin D3 chủ yếu từ thực phẩm động vật)</li></ul><h3>Nguồn cung cấp Vitamin D</h3><p><strong>Ánh nắng mặt trời:</strong> Tiếp xúc 10–30 phút/ngày trong thời điểm nắng nhẹ (9–10 giờ sáng hoặc 3–4 giờ chiều) giúp da tổng hợp vitamin D tự nhiên.</p><p><strong>Thực phẩm:</strong> Cá béo (cá hồi, cá thu), lòng đỏ trứng, nấm phơi nắng, thực phẩm tăng cường vitamin D (sữa, ngũ cốc).</p><p><strong>Thực phẩm bổ sung:</strong> Vitamin D3 (cholecalciferol) thường được khuyến dùng hơn D2 vì có hiệu quả hấp thu tốt hơn. Liều lượng phù hợp nên được tham vấn với bác sĩ dựa trên xét nghiệm máu.</p><h3>Mức vitamin D trong máu được coi là đủ</h3><p>Theo Endocrine Society, mức 25-hydroxyvitamin D (25(OH)D) trong máu từ 30 ng/mL trở lên được coi là đủ cho hầu hết người khỏe mạnh. Tuy nhiên, việc chẩn đoán thiếu hụt và bổ sung cần dựa trên kết quả xét nghiệm và tư vấn y tế chuyên nghiệp.</p><p><em>Nguồn tham khảo: NIH Office of Dietary Supplements – Vitamin D Fact Sheet; Endocrine Society Clinical Practice Guideline: Vitamin D Deficiency; Mayo Clinic – Vitamin D.</em></p>'
  },
  {
    title: 'Hệ miễn dịch và những vi chất không thể thiếu để tăng cường sức đề kháng',
    category: 'Sức khỏe',
    excerpt: 'Hệ miễn dịch khỏe mạnh là tuyến phòng thủ đầu tiên của cơ thể. Các vi chất như Vitamin C, Zinc, và Selenium đóng vai trò quan trọng trong việc hỗ trợ chức năng miễn dịch.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ NIH, Cochrane Reviews, Vinmec International Hospital',
    author: ADMIN_ID,
    content: '<p>Hệ miễn dịch là mạng lưới phức tạp gồm tế bào, mô và cơ quan phối hợp để bảo vệ cơ thể khỏi tác nhân gây bệnh. Dinh dưỡng đóng vai trò nền tảng trong việc duy trì khả năng hoạt động của hệ thống này.</p><h3>Vitamin C — chất chống oxy hóa thiết yếu</h3><p>Vitamin C (axit ascorbic) là một trong những vi chất được nghiên cứu nhiều nhất liên quan đến miễn dịch. Cơ thể không tự tổng hợp được vitamin C, do đó cần bổ sung hàng ngày qua thực phẩm. Vitamin C có nhiều trong: ổi, kiwi, ớt chuông, cam, chanh, dâu tây và rau lá xanh đậm.</p><h3>Zinc — khoáng chất điều hòa miễn dịch</h3><p>Zinc tham gia vào quá trình phát triển và hoạt động của tế bào miễn dịch, sản xuất kháng thể và điều hòa phản ứng viêm. Thiếu zinc có thể liên quan đến suy giảm chức năng tế bào T — một thành phần quan trọng của miễn dịch thích nghi. Nguồn zinc tốt gồm: thịt đỏ nạc, hải sản (hàu, cua), đậu, hạt bí, ngũ cốc nguyên cám.</p><h3>Selenium</h3><p>Selenium là khoáng vi lượng có vai trò quan trọng trong hoạt động của enzyme chống oxy hóa glutathione peroxidase, hỗ trợ bảo vệ tế bào miễn dịch khỏi stress oxy hóa. Nguồn selenium tốt gồm: hạt Brazil (giàu nhất), cá ngừ, trứng, gạo lứt.</p><h3>Vitamin D và miễn dịch</h3><p>Thụ thể vitamin D được tìm thấy trên hầu hết các tế bào miễn dịch. Mức vitamin D đầy đủ được liên kết với việc hỗ trợ chức năng điều hòa miễn dịch và giảm nguy cơ nhiễm trùng đường hô hấp theo một số nghiên cứu quan sát.</p><h3>Lưu ý</h3><p>Bổ sung vi chất qua thực phẩm tự nhiên và chế độ ăn đa dạng luôn được ưu tiên. Đối với thực phẩm bổ sung dạng viên, cần tham khảo ý kiến dược sĩ hoặc bác sĩ để tránh tình trạng bổ sung quá liều.</p><p><em>Nguồn tham khảo: NIH Office of Dietary Supplements; Hemilä H, Chalker E. Cochrane Database Syst Rev 2013; Vinmec International Hospital – Tăng cường hệ miễn dịch.</em></p>'
  },

  // ===== LỐI SỐNG =====
  {
    title: 'Giấc ngủ chất lượng: nền tảng sức khỏe bị đánh giá thấp nhất',
    category: 'Lối sống',
    excerpt: 'Ngủ đủ giấc và ngủ sâu không chỉ giúp bạn tỉnh táo mà còn là thời gian cơ thể phục hồi, tái tạo tế bào và củng cố trí nhớ. Khoa học nói gì về giấc ngủ lý tưởng?',
    thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ National Sleep Foundation, Matthew Walker – Why We Sleep, WHO',
    author: ADMIN_ID,
    content: '<p>Giấc ngủ chiếm khoảng một phần ba cuộc đời con người, nhưng tầm quan trọng của nó thường bị đánh giá thấp hơn so với chế độ ăn uống và tập luyện. Khoa học hiện đại ngày càng khẳng định rằng ngủ đủ giấc và ngủ chất lượng là nền tảng không thể thay thế cho sức khỏe thể chất và tinh thần.</p><h3>Cơ thể làm gì trong lúc bạn ngủ?</h3><p>Trong thời gian ngủ, não bộ củng cố ký ức và xử lý thông tin thu thập trong ngày. Hệ thống glymphatic — cơ chế "làm sạch" não — hoạt động mạnh nhất trong giấc ngủ sâu, loại bỏ các sản phẩm chuyển hóa và protein liên quan đến thoái hóa thần kinh. Các hormone tăng trưởng được tiết ra, tế bào và mô được sửa chữa, hệ miễn dịch được tái nạp.</p><h3>Bao nhiêu giờ ngủ là đủ?</h3><p>National Sleep Foundation khuyến nghị:</p><ul><li>Trẻ em (6–13 tuổi): 9–11 giờ</li><li>Thanh thiếu niên (14–17 tuổi): 8–10 giờ</li><li>Người trưởng thành (18–64 tuổi): 7–9 giờ</li><li>Người cao tuổi (≥65 tuổi): 7–8 giờ</li></ul><h3>Gợi ý cải thiện chất lượng giấc ngủ</h3><p><strong>Thiết lập giờ ngủ-thức cố định</strong> mỗi ngày kể cả cuối tuần để đồng hồ sinh học hoạt động ổn định.</p><p><strong>Hạn chế ánh sáng xanh</strong> từ màn hình điện thoại, máy tính ít nhất 1 giờ trước khi ngủ — ánh sáng xanh ức chế tiết melatonin.</p><p><strong>Giữ phòng ngủ mát, tối và yên tĩnh</strong>: nhiệt độ lý tưởng khoảng 18–20°C giúp não dễ đi vào trạng thái ngủ sâu.</p><p><strong>Tránh caffeine</strong> sau 14–15 giờ chiều vì caffeine có thể tồn tại trong cơ thể 5–7 giờ.</p><p><strong>Thư giãn trước khi ngủ</strong> bằng đọc sách, thiền, hít thở sâu hoặc nghe nhạc nhẹ.</p><p><em>Nguồn tham khảo: National Sleep Foundation – Sleep Duration Recommendations; Walker M. Why We Sleep. Scribner, 2017; WHO – Mental Health and Sleep.</em></p>'
  },
  {
    title: 'Stress mãn tính và cách quản lý để bảo vệ sức khỏe dài hạn',
    category: 'Lối sống',
    excerpt: 'Stress ngắn hạn có thể là động lực, nhưng stress kéo dài ảnh hưởng tiêu cực đến tim mạch, miễn dịch và sức khỏe tâm thần. Tìm hiểu các chiến lược quản lý stress hiệu quả.',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ American Psychological Association, Mayo Clinic, Harvard Health Publishing',
    author: ADMIN_ID,
    content: '<p>Stress là phản ứng sinh lý bình thường của cơ thể trước các tác nhân gây áp lực. Tuy nhiên, khi stress kéo dài và không được kiểm soát — gọi là stress mãn tính — nó có thể tác động tiêu cực đến nhiều hệ thống trong cơ thể.</p><h3>Stress mãn tính ảnh hưởng đến cơ thể như thế nào?</h3><p>Khi đối mặt với stress, tuyến thượng thận tiết ra cortisol và adrenaline. Trong ngắn hạn, điều này hữu ích. Nhưng nồng độ cortisol cao kéo dài có thể liên quan đến: rối loạn giấc ngủ, ảnh hưởng đến hệ tiêu hóa, suy giảm chức năng miễn dịch, thay đổi cân nặng và ảnh hưởng đến tâm trạng.</p><h3>Chiến lược quản lý stress hiệu quả</h3><p><strong>Tập thể dục thường xuyên:</strong> Hoạt động thể chất kích thích tiết endorphin — chất dẫn truyền thần kinh tạo cảm giác dễ chịu và giúp giảm căng thẳng. Ngay cả đi bộ 30 phút/ngày cũng có tác dụng tích cực.</p><p><strong>Thiền và hít thở chánh niệm:</strong> Kỹ thuật thở 4-7-8 (hít 4 giây, giữ 7 giây, thở ra 8 giây) hoặc thiền chánh niệm (mindfulness) đã được nhiều nghiên cứu ghi nhận giúp giảm phản ứng stress sinh lý.</p><p><strong>Kết nối xã hội:</strong> Dành thời gian cho gia đình và bạn bè giúp giảm cảm giác cô đơn — một yếu tố khuếch đại stress.</p><p><strong>Giới hạn thời gian trên mạng xã hội:</strong> Nghiên cứu từ APA ghi nhận liên quan giữa sử dụng mạng xã hội quá mức và mức độ stress cao hơn.</p><p><strong>Tìm kiếm hỗ trợ chuyên nghiệp:</strong> Nếu stress ảnh hưởng nghiêm trọng đến chất lượng cuộc sống, tham vấn với chuyên gia tâm lý hoặc bác sĩ là bước quan trọng.</p><p><em>Nguồn tham khảo: American Psychological Association – Stress in America; Mayo Clinic – Stress Symptoms; Harvard Health Publishing – Understanding the Stress Response.</em></p>'
  },

  // ===== THỂ HÌNH =====
  {
    title: 'Tập luyện sức bền: lợi ích tim mạch và cách bắt đầu đúng cách',
    category: 'Thể hình',
    excerpt: 'Tập luyện aerobic (sức bền) là một trong những hình thức vận động có lợi nhất cho tim mạch và sức khỏe tổng thể. Bài viết này hướng dẫn bạn bắt đầu an toàn và duy trì lâu dài.',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ American College of Sports Medicine, WHO Physical Activity Guidelines, Vinmec',
    author: ADMIN_ID,
    content: '<p>Tập luyện sức bền (aerobic) là bất kỳ hoạt động thể chất nào đòi hỏi hệ tuần hoàn và hô hấp làm việc liên tục trong thời gian kéo dài: đi bộ nhanh, chạy bộ, đạp xe, bơi lội, nhảy aerobic và nhiều hình thức khác.</p><h3>Lợi ích của tập luyện aerobic</h3><p>Theo Tổ chức Y tế Thế giới (WHO), người trưởng thành khỏe mạnh tập ít nhất 150–300 phút hoạt động aerobic cường độ vừa mỗi tuần có liên quan đến nhiều lợi ích sức khỏe, bao gồm:</p><ul><li>Hỗ trợ duy trì sức khỏe tim mạch và hệ hô hấp</li><li>Giúp kiểm soát cân nặng và giảm mỡ nội tạng</li><li>Hỗ trợ cải thiện độ nhạy insulin</li><li>Hỗ trợ tăng cường tâm trạng, giảm lo âu và trầm cảm</li><li>Cải thiện chất lượng giấc ngủ</li></ul><h3>Nguyên tắc bắt đầu cho người mới</h3><p><strong>Bắt đầu từ từ:</strong> Nếu lâu không vận động, bắt đầu với 10–15 phút đi bộ/ngày rồi tăng dần 5 phút mỗi tuần.</p><p><strong>Kiểm tra nhịp tim mục tiêu:</strong> Cường độ vừa = có thể nói chuyện nhưng không thể hát. Công thức tham khảo: nhịp tim mục tiêu = (220 − tuổi) × 0,6–0,75.</p><p><strong>Khởi động và hạ nhiệt:</strong> 5–10 phút khởi động nhẹ trước và hạ nhiệt sau mỗi buổi tập giúp giảm nguy cơ chấn thương.</p><p><strong>Tính nhất quán quan trọng hơn cường độ:</strong> Tập đều đặn 4–5 ngày/tuần ở cường độ vừa tốt hơn tập cường độ cao 1–2 ngày/tuần rồi bỏ.</p><h3>Lưu ý quan trọng</h3><p>Người có tiền sử bệnh tim mạch, huyết áp cao, tiểu đường hoặc bệnh lý xương khớp nên tham khảo ý kiến bác sĩ trước khi bắt đầu chương trình tập luyện mới.</p><p><em>Nguồn tham khảo: WHO Global Recommendations on Physical Activity for Health; American College of Sports Medicine Guidelines for Exercise Testing and Prescription; Vinmec – Lợi ích của tập thể dục aerobic.</em></p>'
  },
  {
    title: 'Tập tạ cho người mới bắt đầu: xây dựng sức mạnh an toàn và hiệu quả',
    category: 'Thể hình',
    excerpt: 'Tập tạ không chỉ dành cho vận động viên chuyên nghiệp. Rèn luyện sức mạnh đúng cách mang lại nhiều lợi ích sức khỏe cho mọi lứa tuổi, từ hỗ trợ cơ xương khớp đến kiểm soát cân nặng.',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ NSCA, American Council on Exercise, Journal of Strength and Conditioning Research',
    author: ADMIN_ID,
    content: '<p>Rèn luyện sức mạnh (strength training) — hay còn gọi là tập tạ — là hình thức tập luyện sử dụng sức cản (tạ, dây kháng lực, trọng lượng cơ thể) để thách thức cơ bắp và kích thích phát triển sức mạnh. Không chỉ dành cho người muốn tăng cơ, đây là hình thức vận động có lợi cho sức khỏe tổng thể ở mọi lứa tuổi.</p><h3>Lợi ích của rèn luyện sức mạnh</h3><ul><li>Hỗ trợ tăng khối lượng cơ và giảm mỡ thể (kể cả khi cân nặng không thay đổi)</li><li>Hỗ trợ duy trì mật độ xương, giảm nguy cơ loãng xương</li><li>Cải thiện độ nhạy insulin và hỗ trợ kiểm soát đường huyết</li><li>Tăng cường sức mạnh chức năng — khả năng thực hiện hoạt động hàng ngày dễ dàng hơn</li><li>Hỗ trợ tư thế và giảm đau lưng dưới liên quan đến yếu cơ core</li></ul><h3>Nguyên tắc cơ bản cho người mới</h3><p><strong>Ưu tiên kỹ thuật trước trọng lượng:</strong> Học động tác đúng với tạ nhẹ trước khi tăng tải. Kỹ thuật sai là nguyên nhân chấn thương hàng đầu ở người mới.</p><p><strong>Các động tác nền tảng cần học:</strong> Squat (ngồi xổm), Deadlift (kéo cản từ mặt đất), Bench Press (đẩy ngực), Overhead Press (đẩy trên đầu), Row (kéo lưng). Đây là các động tác đa khớp kích hoạt nhiều nhóm cơ cùng lúc.</p><p><strong>Tần suất tập:</strong> 2–3 buổi/tuần là lý tưởng cho người mới, để cơ có đủ thời gian phục hồi giữa các buổi.</p><p><strong>Nguyên tắc quá tải dần dần (progressive overload):</strong> Tăng dần trọng lượng, số hiệp hoặc số lần theo thời gian để cơ tiếp tục được thách thức.</p><h3>Lịch tập mẫu cho người mới (3 ngày/tuần)</h3><p><strong>Ngày 1 (Toàn thân):</strong> Squat 3x10 | Bench Press 3x10 | Bent-over Row 3x10</p><p><strong>Ngày 3 (Toàn thân):</strong> Deadlift 3x8 | Overhead Press 3x10 | Lat Pulldown 3x10</p><p><strong>Ngày 5 (Toàn thân):</strong> Lặp lại Ngày 1 với tăng nhẹ trọng lượng nếu cảm thấy sẵn sàng</p><p><em>Nguồn tham khảo: National Strength and Conditioning Association (NSCA) – Essentials of Strength Training and Conditioning; American Council on Exercise – Resistance Training for Beginners; J Strength Cond Res 2009.</em></p>'
  },

  // ===== LÀM ĐẸP =====
  {
    title: 'Chăm sóc da từ bên trong: dinh dưỡng ảnh hưởng đến làn da như thế nào?',
    category: 'Làm đẹp',
    excerpt: 'Làn da phản ánh sức khỏe bên trong. Các chất dinh dưỡng như collagen, vitamin C, E, kẽm và nước đóng vai trò quan trọng trong việc duy trì da khỏe mạnh, đàn hồi và chống lão hóa.',
    thumbnail: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ Journal of Dermatological Science, Healthline, American Academy of Dermatology',
    author: ADMIN_ID,
    content: '<p>Ngành công nghiệp mỹ phẩm trị giá hàng tỷ đô la, nhưng nhiều chuyên gia da liễu ngày càng nhấn mạnh rằng chăm sóc da hiệu quả nhất bắt đầu từ bên trong — từ những gì bạn ăn và uống hàng ngày.</p><h3>Collagen và các chất dinh dưỡng hỗ trợ sản xuất collagen</h3><p>Collagen là protein cấu trúc chính của da, giúp duy trì độ đàn hồi và độ căng bóng. Sau tuổi 25, lượng collagen tự nhiên trong da bắt đầu giảm khoảng 1%/năm. Cơ thể cần vitamin C để tổng hợp collagen — không có đủ vitamin C, quá trình này bị gián đoạn. Nguồn vitamin C tốt cho da: ổi, ớt chuông đỏ, kiwi, dâu tây, cam.</p><h3>Chống oxy hóa bảo vệ da khỏi lão hóa sớm</h3><p>Các chất chống oxy hóa như vitamin E, beta-carotene (tiền vitamin A), lycopene và polyphenol giúp trung hòa gốc tự do — tác nhân chính gây tổn thương DNA tế bào da và lão hóa sớm.</p><ul><li><strong>Vitamin E:</strong> Hạt hướng dương, hạnh nhân, dầu ô liu, bơ</li><li><strong>Beta-carotene:</strong> Cà rốt, khoai lang, bí đỏ, xoài</li><li><strong>Lycopene:</strong> Cà chua (đặc biệt là cà chua nấu chín)</li><li><strong>Polyphenol:</strong> Trà xanh, quả việt quất, nho đỏ</li></ul><h3>Kẽm và sức khỏe da</h3><p>Kẽm tham gia vào quá trình hàn gắn vết thương da, kiểm soát sản xuất dầu nhờn và có đặc tính kháng khuẩn nhẹ. Thiếu kẽm có thể liên quan đến da dễ bị tổn thương và chậm lành. Nguồn kẽm: hải sản, thịt đỏ nạc, đậu, hạt bí ngô, ngũ cốc nguyên cám.</p><h3>Nước — "mỹ phẩm" rẻ nhất và quan trọng nhất</h3><p>Da cần đủ nước để duy trì độ ẩm tự nhiên. Duy trì đủ nước (khoảng 2–2,5 lít/ngày từ tất cả nguồn) là cơ sở quan trọng cho chức năng tế bào khỏe mạnh, bao gồm tế bào da.</p><p><em>Nguồn tham khảo: Pullar JM et al. J Dermatol Sci 2017; American Academy of Dermatology – Diet and Skin Health; Healthline – 12 Foods for Healthy Skin.</em></p>'
  },
  {
    title: 'Tóc khỏe mạnh bắt đầu từ dinh dưỡng: những vi chất quan trọng nhất',
    category: 'Làm đẹp',
    excerpt: 'Rụng tóc, tóc khô và gãy có thể là dấu hiệu của thiếu hụt dinh dưỡng. Tìm hiểu vai trò của biotin, sắt, kẽm, protein và các vi chất quan trọng với sức khỏe tóc.',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ Dermatology Practical & Conceptual, Cleveland Clinic, Healthline',
    author: ADMIN_ID,
    content: '<p>Tóc là một trong những chỉ số phản ánh sức khỏe và dinh dưỡng bên trong. Mặc dù di truyền và yếu tố nội tiết tố đóng vai trò lớn, thiếu hụt các vi chất dinh dưỡng nhất định cũng có thể là một trong những nguyên nhân gây rụng tóc, tóc yếu và kém bóng khỏe.</p><h3>Biotin (Vitamin B7)</h3><p>Biotin là vi chất được biết đến nhiều nhất trong chăm sóc tóc. Biotin tham gia vào quá trình sản xuất keratin — protein cấu trúc chính của tóc. Nguồn biotin tốt: lòng đỏ trứng, cá hồi, thịt lợn, hướng dương, hạnh nhân, bơ, khoai lang.</p><p><em>Lưu ý:</em> Bổ sung biotin liều cao chỉ giúp ích nếu thực sự thiếu hụt. Người tóc khỏe mạnh và đủ biotin không nhận thêm lợi ích từ việc bổ sung liều cao.</p><h3>Sắt</h3><p>Thiếu sắt là một trong những nguyên nhân dinh dưỡng phổ biến nhất của rụng tóc, đặc biệt ở phụ nữ trong độ tuổi sinh sản. Sắt cần thiết để vận chuyển oxy đến nang tóc. Nguồn sắt: thịt đỏ nạc, gan, đậu lăng, rau lá xanh đậm, hạt bí ngô. Kết hợp với vitamin C giúp tăng hấp thu sắt từ thực vật.</p><h3>Kẽm</h3><p>Kẽm tham gia vào quá trình tổng hợp protein tóc và chức năng tuyến dầu quanh nang tóc. Nguồn kẽm: hải sản, thịt đỏ, đậu, hạt bí ngô, ngũ cốc nguyên cám.</p><h3>Protein</h3><p>Tóc được cấu tạo chủ yếu từ keratin — một dạng protein. Chế độ ăn thiếu protein nghiêm trọng và kéo dài có thể dẫn đến tóc yếu, gãy và rụng. Đảm bảo đủ protein từ thực phẩm (0,8–1,0 g/kg/ngày) là nền tảng cho tóc khỏe mạnh.</p><h3>Khi nào cần thăm khám bác sĩ?</h3><p>Rụng tóc nhiều bất thường nên được thăm khám để loại trừ các nguyên nhân y tế (rối loạn tuyến giáp, thiếu máu, bệnh tự miễn) trước khi tự bổ sung vi chất.</p><p><em>Nguồn tham khảo: Almohanna HM et al. Dermatol Pract Concept 2019; Cleveland Clinic – Hair Loss and Nutritional Deficiencies; Healthline – The Best Diet for Hair Growth.</em></p>'
  },

  // ===== TIM MẠCH =====
  {
    title: 'Kiểm soát huyết áp: thay đổi lối sống có thể mang lại sự khác biệt lớn',
    category: 'Tim mạch',
    excerpt: 'Tăng huyết áp là "kẻ giết người thầm lặng" vì thường không có triệu chứng rõ ràng. Tuy nhiên, thay đổi lối sống đúng cách có thể hỗ trợ kiểm soát huyết áp hiệu quả.',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ American Heart Association, WHO, Vinmec International Hospital',
    author: ADMIN_ID,
    content: '<p>Tăng huyết áp (hypertension) được định nghĩa là khi huyết áp tâm thu ≥130 mmHg và/hoặc huyết áp tâm trương ≥80 mmHg (theo Hướng dẫn AHA/ACC 2017). Đây là yếu tố nguy cơ tim mạch hàng đầu toàn cầu, ảnh hưởng đến khoảng 1,28 tỷ người trưởng thành theo WHO.</p><h3>Tại sao huyết áp cao nguy hiểm?</h3><p>Huyết áp cao kéo dài tạo áp lực lên thành mạch máu và tim, theo thời gian có thể liên quan đến tăng nguy cơ các biến cố tim mạch nghiêm trọng. Hầu hết người tăng huyết áp không có triệu chứng rõ ràng — chỉ phát hiện khi đo huyết áp thường xuyên.</p><h3>Thay đổi lối sống hỗ trợ kiểm soát huyết áp</h3><p><strong>Chế độ ăn DASH:</strong> Dietary Approaches to Stop Hypertension — được nhiều nghiên cứu ghi nhận hiệu quả trong hỗ trợ kiểm soát huyết áp. Chế độ ăn này nhấn mạnh nhiều rau quả, ngũ cốc nguyên hạt, protein nạc và sữa ít béo; đồng thời hạn chế natri, thịt đỏ và đường.</p><p><strong>Giảm natri:</strong> WHO khuyến nghị người trưởng thành dùng không quá 5g muối/ngày (khoảng 2g natri).</p><p><strong>Tập thể dục thường xuyên:</strong> Hoạt động aerobic cường độ vừa 150 phút/tuần được liên kết với hỗ trợ giảm huyết áp theo nghiên cứu từ AHA.</p><p><strong>Kiểm soát cân nặng:</strong> Thừa cân — đặc biệt mỡ bụng — có liên quan đến tăng nguy cơ huyết áp cao.</p><p><strong>Không hút thuốc lá:</strong> Nicotine trong thuốc lá làm co thắt mạch máu tạm thời và ảnh hưởng lâu dài đến sức khỏe mạch máu.</p><h3>Theo dõi huyết áp tại nhà</h3><p>Đo huyết áp tại nhà vào buổi sáng (trước khi ăn và uống thuốc) và buổi tối, mỗi lần đo 2 lần cách nhau 1 phút, ghi lại kết quả và chia sẻ với bác sĩ.</p><p><em>Nguồn tham khảo: American Heart Association – Understanding Blood Pressure Readings; WHO – Hypertension; Vinmec – Tăng huyết áp và cách kiểm soát.</em></p>'
  },
  {
    title: 'Cholesterol: hiểu đúng để bảo vệ tim mạch hiệu quả',
    category: 'Tim mạch',
    excerpt: 'Không phải mọi cholesterol đều có hại. Hiểu sự khác biệt giữa LDL, HDL và triglyceride, cùng với những thay đổi chế độ ăn và lối sống giúp duy trì mức cholesterol lành mạnh.',
    thumbnail: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=800&q=80',
    published: true,
    source: 'Tổng hợp từ American Heart Association, Mayo Clinic, National Heart, Lung, and Blood Institute (NHLBI)',
    author: ADMIN_ID,
    content: '<p>Cholesterol là một dạng chất béo (lipid) cần thiết cho cơ thể — là thành phần cấu trúc của màng tế bào, tiền chất cho hormone steroid, axit mật và vitamin D. Tuy nhiên, khi nồng độ cholesterol trong máu mất cân bằng, đặc biệt là LDL quá cao, nó có thể liên quan đến tăng nguy cơ bệnh tim mạch.</p><h3>Các loại cholesterol chính</h3><p><strong>LDL (Low-Density Lipoprotein) — "cholesterol xấu":</strong> Khi lượng LDL quá nhiều, cholesterol có thể tích tụ trên thành động mạch (mảng xơ vữa), theo thời gian liên quan đến tăng nguy cơ hẹp và tắc động mạch.</p><p><strong>HDL (High-Density Lipoprotein) — "cholesterol tốt":</strong> HDL vận chuyển cholesterol từ các mô về lại gan để xử lý và đào thải. Mức HDL cao hơn thường được liên kết với nguy cơ bệnh tim mạch thấp hơn.</p><p><strong>Triglyceride:</strong> Mức triglyceride cao kết hợp với LDL cao và HDL thấp tạo thành bộ ba yếu tố nguy cơ tim mạch quan trọng.</p><h3>Mức cholesterol tham khảo (theo NHLBI)</h3><ul><li>Cholesterol toàn phần: Lý tưởng &lt; 200 mg/dL</li><li>LDL: Lý tưởng &lt; 100 mg/dL</li><li>HDL: Lý tưởng ≥ 60 mg/dL</li><li>Triglyceride: Lý tưởng &lt; 150 mg/dL</li></ul><h3>Thay đổi chế độ ăn hỗ trợ cân bằng cholesterol</h3><p><strong>Tăng chất xơ hòa tan:</strong> Yến mạch, đậu, táo, lê và quả mọng — chất xơ hòa tan giúp hỗ trợ giảm hấp thu cholesterol từ đường tiêu hóa.</p><p><strong>Chất béo lành mạnh:</strong> Thay thế chất béo bão hòa bằng chất béo không bão hòa đơn (dầu ô liu, bơ, quả óc chó) và không bão hòa đa (cá béo, dầu hạt lanh).</p><p><strong>Hạn chế chất béo trans:</strong> Có trong một số thực phẩm chiên rán công nghiệp và bánh kẹo chứa dầu thực vật hydro hóa.</p><h3>Vai trò của vận động</h3><p>Hoạt động aerobic thường xuyên được ghi nhận có liên quan đến giúp tăng HDL và hỗ trợ giảm triglyceride. Tập luyện đủ 150 phút/tuần ở cường độ vừa là mục tiêu được khuyến nghị.</p><p><em>Nguồn tham khảo: American Heart Association – Cholesterol; Mayo Clinic – Cholesterol Levels: What Numbers Should You Aim For?; NHLBI – High Blood Cholesterol.</em></p>'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  let added = 0;
  for (const post of posts) {
    const exists = await Post.findOne({ title: post.title });
    if (!exists) {
      await Post.create({ ...post, createdAt: new Date(), updatedAt: new Date() });
      console.log('Added:', post.title);
      added++;
    } else {
      console.log('Skipped (exists):', post.title);
    }
  }
  console.log(`\nDone: ${added} added, ${posts.length - added} skipped.`);
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
