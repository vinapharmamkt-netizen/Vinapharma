// Seed 5 bài Góc Sức Khỏe (phần 3) — node seed-goc-suc-khoe-3.js
if (require.main === module) {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const posts = [

  // ── BÀI 1: HUYẾT ÁP CAO ─────────────────────────────────────────────────
  {
    title: 'Tăng huyết áp — "kẻ giết người thầm lặng": Hiểu đúng chỉ số và 6 cách kiểm soát không cần thuốc',
    category: 'Góc sức khỏe', topic: 'Tim mạch', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80',
    excerpt: 'Hơn 25% người Việt trưởng thành mắc tăng huyết áp nhưng chỉ 1/3 biết mình có bệnh. Huyết áp cao không gây đau, không có triệu chứng rõ ràng — nhưng âm thầm phá hủy tim, não, thận và mắt trong nhiều năm. Hiểu đúng chỉ số và kiểm soát sớm có thể ngăn ngừa 80% ca đột quỵ và nhồi máu cơ tim.',
    readTime: 8, published: true,
    publishedAt: new Date('2026-04-07'),
    tags: ['Huyết áp', 'Tăng huyết áp', 'Tim mạch', 'Đột quỵ', 'Phòng bệnh'],
    content: `<p>Tại Việt Nam, theo Điều tra Quốc gia về các yếu tố nguy cơ bệnh không lây nhiễm (STEPS 2021), tỷ lệ tăng huyết áp ở người trưởng thành là <strong>26.2%</strong> — tương đương khoảng 17 triệu người. Đáng lo hơn, chỉ 31.3% trong số đó đang được điều trị, và chỉ 14% kiểm soát được huyết áp về mức bình thường.</p>

<img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80" alt="Đo huyết áp kiểm soát tăng huyết áp" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Hiểu đúng chỉ số huyết áp</h2>
<p>Huyết áp được biểu diễn bằng 2 số: <strong>tâm thu / tâm trương</strong> (mmHg).</p>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
<tr style="background:#ffebee"><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Phân loại</th><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Tâm thu</th><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Tâm trương</th></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">Bình thường</td><td style="padding:.75rem;border:1px solid #ffcdd2">&lt;120</td><td style="padding:.75rem;border:1px solid #ffcdd2">&lt;80</td></tr>
<tr style="background:#fafafa"><td style="padding:.75rem;border:1px solid #ffcdd2">Cao bình thường</td><td style="padding:.75rem;border:1px solid #ffcdd2">120–129</td><td style="padding:.75rem;border:1px solid #ffcdd2">&lt;80</td></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">Tăng huyết áp độ 1</td><td style="padding:.75rem;border:1px solid #ffcdd2">130–139</td><td style="padding:.75rem;border:1px solid #ffcdd2">80–89</td></tr>
<tr style="background:#fafafa"><td style="padding:.75rem;border:1px solid #ffcdd2">Tăng huyết áp độ 2</td><td style="padding:.75rem;border:1px solid #ffcdd2">≥140</td><td style="padding:.75rem;border:1px solid #ffcdd2">≥90</td></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">Cơn tăng huyết áp</td><td style="padding:.75rem;border:1px solid #ffcdd2">≥180</td><td style="padding:.75rem;border:1px solid #ffcdd2">≥120</td></tr>
</table>

<h2>Tăng huyết áp phá hủy cơ thể như thế nào?</h2>
<p>Huyết áp cao tạo ra áp lực liên tục lên thành mạch máu — giống như bơm lốp xe quá căng. Theo thời gian:</p>
<ul>
<li><strong>Tim:</strong> Phải bơm mạnh hơn → dày thất trái → suy tim, rối loạn nhịp</li>
<li><strong>Não:</strong> Mạch máu não bị tổn thương → đột quỵ (THA là yếu tố nguy cơ #1 của đột quỵ)</li>
<li><strong>Thận:</strong> Mao mạch thận bị xơ hóa → suy thận mạn tính</li>
<li><strong>Mắt:</strong> Bệnh võng mạc do tăng huyết áp → mù lòa</li>
</ul>

<blockquote style="border-left:4px solid #cc1f1f;padding:1rem 1.5rem;background:#fff5f5;border-radius:0 .5rem .5rem 0;margin:1.5rem 0">
<p style="margin:0;font-style:italic;color:#555">"Giảm huyết áp tâm thu 10mmHg giảm 20% nguy cơ biến cố tim mạch lớn, 27% nguy cơ đột quỵ và 28% nguy cơ suy tim. Không có thuốc hay thực phẩm chức năng nào có hiệu quả tốt hơn kiểm soát huyết áp về lâu dài."</p>
<p style="margin:.5rem 0 0;font-weight:700;color:#cc1f1f">— Ettehad D. et al., The Lancet (2016) — meta-analysis 123 nghiên cứu, 613.815 người</p>
</blockquote>

<img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80" alt="Lối sống lành mạnh kiểm soát huyết áp" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>6 cách kiểm soát huyết áp không cần thuốc (hoặc giảm liều thuốc)</h2>

<h3>1. Giảm muối — hiệu quả nhất</h3>
<p>Giảm từ 10g/ngày xuống 5g/ngày (khuyến nghị WHO) hạ tâm thu trung bình 4–5mmHg. Người Việt ăn trung bình 9.4g muối/ngày — gần gấp đôi mức an toàn. Lưu ý: nước mắm, mì tôm, thức ăn chế biến sẵn chứa rất nhiều muối ẩn.</p>

<h3>2. Chế độ ăn DASH</h3>
<p>Dietary Approaches to Stop Hypertension — hạ tâm thu 8–14mmHg: nhiều rau quả, ngũ cốc nguyên hạt, sản phẩm từ sữa ít béo; ít thịt đỏ, đường, chất béo bão hòa.</p>

<h3>3. Vận động aerobic đều đặn</h3>
<p>150 phút/tuần vận động vừa (đi bộ nhanh, bơi, đạp xe) hạ tâm thu 4–9mmHg. Tác dụng xuất hiện sau 2–4 tuần và duy trì lâu dài.</p>

<h3>4. Giảm cân</h3>
<p>Mỗi 10kg giảm cân hạ tâm thu khoảng 6mmHg. Đặc biệt hiệu quả với người thừa cân béo bụng.</p>

<h3>5. Hạn chế rượu bia</h3>
<p>≤1 đơn vị/ngày với nữ, ≤2 đơn vị/ngày với nam. Uống nhiều hơn làm tăng huyết áp và giảm hiệu quả thuốc.</p>

<h3>6. Kiểm soát stress</h3>
<p>Stress mạn tính duy trì hệ thần kinh giao cảm hoạt động — tăng nhịp tim và co mạch. Thiền định, yoga, thở sâu có bằng chứng hạ huyết áp 3–5mmHg.</p>

<h2>Đo huyết áp tại nhà đúng cách</h2>
<ul>
<li>Nghỉ ngơi 5 phút trước khi đo, không uống cà phê/thuốc lá 30 phút trước</li>
<li>Ngồi thẳng, lưng tựa, chân không bắt chéo, cánh tay ngang tim</li>
<li>Đo 2 lần, cách nhau 1–2 phút, lấy giá trị trung bình</li>
<li>Đo vào buổi sáng trước khi uống thuốc và buổi tối trước khi ngủ</li>
</ul>

<hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>
<p style="font-size:.82rem;color:#888"><strong>Nguồn tham khảo:</strong><br/>
• Ettehad D. et al.: "Blood pressure lowering for prevention of cardiovascular disease and death" — The Lancet (2016)<br/>
• Whelton P.K. et al.: "2017 ACC/AHA Hypertension Guideline" — JACC (2018)<br/>
• Bộ Y tế Việt Nam / WHO: Báo cáo STEPS Việt Nam (2021)<br/>
• Viện Tim mạch Quốc gia: Hướng dẫn chẩn đoán và điều trị tăng huyết áp (2023)</p>`
  },

  // ── BÀI 2: CHOLESTEROL ───────────────────────────────────────────────────
  {
    title: 'Cholesterol và mỡ máu: Hiểu đúng để không sợ hãi vô lý và biết khi nào thực sự cần điều trị',
    category: 'Góc sức khỏe', topic: 'Tim mạch', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1200&q=80',
    excerpt: 'Không phải mọi cholesterol đều xấu — LDL mới là "kẻ thù", còn HDL thực ra bảo vệ tim mạch. Nhiều người uống statin không cần thiết trong khi người thực sự cần lại bỏ qua. Hướng dẫn đọc kết quả xét nghiệm mỡ máu và quyết định đúng dựa trên nguy cơ tim mạch tổng thể.',
    readTime: 8, published: true,
    publishedAt: new Date('2026-04-10'),
    tags: ['Cholesterol', 'Mỡ máu', 'Tim mạch', 'LDL', 'Statin'],
    content: `<p>Cholesterol là chất béo thiết yếu — cơ thể cần để tạo màng tế bào, tổng hợp hormone giới tính (estrogen, testosterone), vitamin D và acid mật tiêu hóa chất béo. Vấn đề không phải là "có cholesterol" mà là <strong>loại nào, bao nhiêu, và trong bối cảnh nguy cơ tim mạch tổng thể</strong>.</p>

<img src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=80" alt="Xét nghiệm mỡ máu cholesterol" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Giải mã bảng xét nghiệm lipid máu</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
<tr style="background:#ffebee"><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Chỉ số</th><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Mức tối ưu</th><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Vai trò</th></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">LDL-C ("cholesterol xấu")</td><td style="padding:.75rem;border:1px solid #ffcdd2">&lt;100 mg/dL (nguy cơ cao: &lt;70)</td><td style="padding:.75rem;border:1px solid #ffcdd2">Gây xơ vữa động mạch khi cao</td></tr>
<tr style="background:#fafafa"><td style="padding:.75rem;border:1px solid #ffcdd2">HDL-C ("cholesterol tốt")</td><td style="padding:.75rem;border:1px solid #ffcdd2">Nam ≥40, Nữ ≥50 mg/dL</td><td style="padding:.75rem;border:1px solid #ffcdd2">Vận chuyển cholesterol về gan để thải</td></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">Triglyceride</td><td style="padding:.75rem;border:1px solid #ffcdd2">&lt;150 mg/dL</td><td style="padding:.75rem;border:1px solid #ffcdd2">Mỡ máu từ đường và rượu</td></tr>
<tr style="background:#fafafa"><td style="padding:.75rem;border:1px solid #ffcdd2">Total Cholesterol</td><td style="padding:.75rem;border:1px solid #ffcdd2">&lt;200 mg/dL</td><td style="padding:.75rem;border:1px solid #ffcdd2">Tổng hợp — ít có ý nghĩa một mình</td></tr>
</table>

<h2>Tại sao LDL cao lại nguy hiểm?</h2>
<p>LDL vận chuyển cholesterol từ gan đến các mô. Khi LDL quá nhiều, chúng xâm nhập vào thành động mạch, bị oxy hóa và kích thích phản ứng viêm — dần tạo thành mảng xơ vữa (plaque). Plaque thu hẹp lòng mạch và khi vỡ ra tạo cục máu đông → nhồi máu cơ tim hoặc đột quỵ.</p>

<blockquote style="border-left:4px solid #cc1f1f;padding:1rem 1.5rem;background:#fff5f5;border-radius:0 .5rem .5rem 0;margin:1.5rem 0">
<p style="margin:0;font-style:italic;color:#555">"Mối liên hệ nhân quả giữa LDL và bệnh tim mạch vành là một trong những mối liên hệ được chứng minh chắc chắn nhất trong y học. Giảm LDL 1 mmol/L (38 mg/dL) giảm 22% nguy cơ biến cố tim mạch lớn trong 5 năm."</p>
<p style="margin:.5rem 0 0;font-weight:700;color:#cc1f1f">— Cholesterol Treatment Trialists' Collaboration, The Lancet (2010)</p>
</blockquote>

<img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80" alt="Chế độ ăn kiểm soát cholesterol" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Thực phẩm ảnh hưởng cholesterol như thế nào?</h2>
<p>Sự thật bất ngờ: <strong>cholesterol trong thức ăn ít ảnh hưởng đến LDL máu hơn bạn nghĩ</strong>. Điều thực sự quan trọng là:</p>
<ul>
<li><strong>Chất béo bão hòa</strong> (mỡ động vật, dầu dừa, bơ): Tăng LDL mạnh nhất — hạn chế &lt;10% tổng calo</li>
<li><strong>Chất béo trans</strong> (bánh quy, đồ chiên công nghiệp): Tăng LDL VÀ giảm HDL — tránh hoàn toàn</li>
<li><strong>Chất béo không bão hòa đơn</strong> (dầu ô liu, bơ, hạt): Giảm LDL, tăng HDL</li>
<li><strong>Chất xơ hòa tan</strong> (yến mạch, đậu, táo): Giảm LDL 5–10% qua cơ chế liên kết acid mật</li>
<li><strong>Omega-3</strong> (cá hồi, hạt chia): Giảm triglyceride mạnh, tăng HDL</li>
</ul>

<h2>Khi nào cần dùng statin?</h2>
<p>Statin không chỉ được chỉ định khi LDL cao — mà dựa trên <strong>nguy cơ tim mạch 10 năm tổng thể</strong> (tính theo thang điểm SCORE2 hoặc Framingham). Cần dùng statin khi:</p>
<ul>
<li>Đã có bệnh tim mạch (nhồi máu cơ tim, đột quỵ, bệnh động mạch ngoại vi)</li>
<li>Đái tháo đường type 2 + một yếu tố nguy cơ khác</li>
<li>LDL ≥190 mg/dL (tăng cholesterol gia đình)</li>
<li>Nguy cơ tim mạch 10 năm ≥7.5% và LDL ≥70 mg/dL</li>
</ul>
<p>Người không có yếu tố nguy cơ, LDL 130–159 mg/dL → ưu tiên thay đổi lối sống trước, theo dõi 3–6 tháng.</p>

<h2>Tăng HDL — "cholesterol tốt"</h2>
<ul>
<li>Vận động aerobic thường xuyên (+3–9% HDL)</li>
<li>Bỏ thuốc lá (+15–20% HDL sau 1–3 tuần)</li>
<li>Giảm triglyceride (thường tương quan nghịch với HDL)</li>
<li>Chất béo không bão hòa đơn từ dầu ô liu, bơ</li>
</ul>

<hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>
<p style="font-size:.82rem;color:#888"><strong>Nguồn tham khảo:</strong><br/>
• Cholesterol Treatment Trialists' Collaboration: "Efficacy and safety of more intensive lowering of LDL cholesterol" — The Lancet (2010)<br/>
• Grundy S.M. et al.: "2018 AHA/ACC Guideline on Management of Blood Cholesterol" — Circulation (2019)<br/>
• Viện Tim mạch Quốc gia: Hướng dẫn quản lý rối loạn lipid máu (2023)<br/>
• Bộ Y tế Việt Nam: Hướng dẫn chẩn đoán và điều trị rối loạn lipid máu (2022)</p>`
  },

  // ── BÀI 3: SỨC KHỎE THẬN ────────────────────────────────────────────────
  {
    title: 'Bảo vệ thận từ hôm nay: 8 thói quen hàng ngày đang âm thầm phá hủy thận của bạn',
    category: 'Góc sức khỏe', topic: 'Sức khỏe', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    excerpt: 'Thận lọc khoảng 200 lít máu mỗi ngày, nhưng suy thận mạn tính thường không có triệu chứng cho đến khi chức năng thận giảm còn 30%. Tại Việt Nam có khoảng 5 triệu người bị bệnh thận mạn. 8 thói quen phổ biến dưới đây đang tàn phá thận mà bạn không hề hay biết.',
    readTime: 7, published: true,
    publishedAt: new Date('2026-04-13'),
    tags: ['Sức khỏe thận', 'Suy thận', 'Thận', 'Phòng bệnh', 'Lối sống'],
    content: `<p>Hai quả thận chỉ bằng nắm đấm nhưng thực hiện hơn 12 chức năng sống còn: lọc chất độc, điều tiết huyết áp, cân bằng điện giải, kích thích sản xuất hồng cầu và hoạt hóa vitamin D. Vấn đề: khi thận bị tổn thương, cơ thể bù trừ rất hiệu quả — triệu chứng thường chỉ xuất hiện khi đã mất 60–70% chức năng thận.</p>

<img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80" alt="Sức khỏe thận bảo vệ chức năng thận" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>8 thói quen phổ biến đang phá hủy thận</h2>

<h3>1. Uống không đủ nước</h3>
<p>Thiếu nước mạn tính làm đặc nước tiểu, tạo điều kiện hình thành sỏi thận và nhiễm trùng đường tiết niệu. Nước tiểu màu vàng đậm hoặc mùi nặng là dấu hiệu đang mất nước. Mục tiêu: 2–2.5L nước/ngày (điều chỉnh theo cân nặng và mức vận động).</p>

<h3>2. Lạm dụng thuốc giảm đau NSAIDs</h3>
<p>Ibuprofen, naproxen, diclofenac — các NSAIDs thông dụng — giảm tưới máu thận bằng cách ức chế prostaglandin. Dùng thường xuyên (hơn 10 ngày/tháng) có thể gây bệnh thận mạn tính do thuốc giảm đau (analgesic nephropathy). Paracetamol an toàn hơn cho thận khi dùng đúng liều.</p>

<h3>3. Ăn quá nhiều muối và đạm động vật</h3>
<p>Muối dư thừa làm tăng huyết áp — nguyên nhân số 2 gây suy thận. Đạm động vật quá nhiều tăng tải lọc cho cầu thận và tăng acid uric — nguy cơ gout và sỏi thận. Người có bệnh thận mạn cần hạn chế đạm 0.6–0.8g/kg/ngày theo chỉ dẫn bác sĩ.</p>

<h3>4. Không kiểm soát đường huyết</h3>
<p>Đái tháo đường là nguyên nhân hàng đầu gây suy thận giai đoạn cuối toàn cầu. Đường huyết cao mạn tính tổn thương cầu thận qua cơ chế glycation và tăng áp lực lọc. Kiểm soát HbA1c &lt;7% giảm 33% nguy cơ tiến triển bệnh thận đái tháo đường.</p>

<h3>5. Nhịn tiểu thường xuyên</h3>
<p>Nước tiểu ứ đọng trong bàng quang tạo môi trường cho vi khuẩn phát triển, dẫn đến nhiễm trùng đường tiết niệu — nếu không điều trị có thể lan lên thận gây viêm bể thận và sẹo thận mạn tính.</p>

<blockquote style="border-left:4px solid #cc1f1f;padding:1rem 1.5rem;background:#fff5f5;border-radius:0 .5rem .5rem 0;margin:1.5rem 0">
<p style="margin:0;font-style:italic;color:#555">"Bệnh thận mạn tính là 'đại dịch thầm lặng' — ảnh hưởng 10% dân số toàn cầu nhưng ít được chú ý hơn nhiều so với mức độ nguy hiểm thực sự. Phát hiện và điều trị sớm có thể làm chậm tiến triển đến suy thận giai đoạn cuối lên đến 50%."</p>
<p style="margin:.5rem 0 0;font-weight:700;color:#cc1f1f">— GS. Vlado Perkovic, Chủ tịch Hội Thận học Quốc tế (ISN) 2023</p>
</blockquote>

<img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=80" alt="Chế độ ăn tốt cho thận" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h3>6. Hút thuốc lá</h3>
<p>Nicotine gây co mạch thận, giảm lưu lượng máu đến thận 20–40%. Người hút thuốc có nguy cơ suy thận mạn cao gấp 2–3 lần người không hút. Bỏ thuốc là một trong những biện pháp bảo vệ thận hiệu quả nhất.</p>

<h3>7. Uống quá nhiều nước ngọt và nước tăng lực</h3>
<p>Fructose trong nước ngọt làm tăng acid uric và tăng nguy cơ sỏi thận. Một nghiên cứu theo dõi 3.000 người trong 11 năm cho thấy uống ≥2 lon nước ngọt/ngày tăng 30% nguy cơ bệnh thận mạn tính.</p>

<h3>8. Bỏ qua kiểm tra định kỳ</h3>
<p>Xét nghiệm creatinine máu và tổng phân tích nước tiểu là đủ để phát hiện sớm bệnh thận — giá chỉ vài chục nghìn đồng. Người có đái tháo đường, tăng huyết áp, hoặc tiền sử gia đình nên kiểm tra mỗi 6–12 tháng.</p>

<h2>Dấu hiệu cảnh báo thận đang có vấn đề</h2>
<ul>
<li>Nước tiểu có bọt (protein niệu), màu hồng/đỏ (tiểu máu)</li>
<li>Đi tiểu đêm nhiều hơn bình thường</li>
<li>Phù mắt cá chân, bàn chân, mặt vào buổi sáng</li>
<li>Mệt mỏi không giải thích được, da xỉn</li>
<li>Huyết áp tăng khó kiểm soát</li>
</ul>

<hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>
<p style="font-size:.82rem;color:#888"><strong>Nguồn tham khảo:</strong><br/>
• GBD Chronic Kidney Disease Collaboration: "Global, regional, and national burden of chronic kidney disease" — The Lancet (2020)<br/>
• KDIGO 2024 Clinical Practice Guideline for CKD Evaluation and Management<br/>
• Bệnh viện Thận Hà Nội: Hướng dẫn bảo vệ sức khỏe thận (2023)<br/>
• Bộ Y tế Việt Nam: Chương trình phòng chống bệnh thận mạn tính 2022–2030</p>`
  },

  // ── BÀI 4: UNG THƯ ĐẠI TRÀNG ────────────────────────────────────────────
  {
    title: 'Ung thư đại tràng: Tầm soát sớm có thể phòng ngừa 90% ca bệnh — những điều bạn cần biết',
    category: 'Góc sức khỏe', topic: 'Sức khỏe', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80',
    excerpt: 'Ung thư đại trực tràng là loại ung thư phổ biến thứ 3 tại Việt Nam với hơn 16.000 ca mới mỗi năm. Điều đặc biệt: đây là loại ung thư CÓ THỂ PHÒNG NGỪA — polyp tiền ung thư cần 10–15 năm để trở thành ung thư thật. Tầm soát nội soi đúng thời điểm có thể cắt bỏ polyp trước khi chúng trở thành ung thư.',
    readTime: 8, published: true,
    publishedAt: new Date('2026-04-16'),
    tags: ['Ung thư đại tràng', 'Tầm soát ung thư', 'Nội soi', 'Phòng bệnh', 'Sức khỏe'],
    content: `<p>Theo GLOBOCAN 2022, ung thư đại trực tràng là ung thư phổ biến <strong>thứ 3 ở nam và thứ 4 ở nữ</strong> tại Việt Nam, với 16.831 ca mới và 11.596 ca tử vong mỗi năm. Con số tử vong cao phản ánh thực tế: phần lớn bệnh nhân được phát hiện ở giai đoạn muộn khi điều trị kém hiệu quả.</p>

<img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80" alt="Tầm soát ung thư đại tràng" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Tại sao ung thư đại tràng có thể phòng ngừa?</h2>
<p>Không giống nhiều loại ung thư khác, ung thư đại trực tràng có một giai đoạn tiền ung thư rõ ràng và dài: <strong>polyp tuyến (adenoma)</strong>. Phần lớn ung thư đại tràng bắt đầu từ polyp lành tính và cần trung bình 10–15 năm để tiến triển thành ung thư xâm lấn. Trong khoảng thời gian đó, nội soi phát hiện và cắt polyp hoàn toàn ngăn được ung thư phát triển.</p>

<h2>Tỷ lệ sống theo giai đoạn phát hiện</h2>
<table style="width:100%;border-collapse:collapse;margin:1.5rem 0">
<tr style="background:#ffebee"><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Giai đoạn</th><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Tỷ lệ sống 5 năm</th><th style="padding:.75rem;text-align:left;border:1px solid #ffcdd2">Đặc điểm</th></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">Giai đoạn I</td><td style="padding:.75rem;border:1px solid #ffcdd2">90–95%</td><td style="padding:.75rem;border:1px solid #ffcdd2">Còn trong thành ruột</td></tr>
<tr style="background:#fafafa"><td style="padding:.75rem;border:1px solid #ffcdd2">Giai đoạn II</td><td style="padding:.75rem;border:1px solid #ffcdd2">75–85%</td><td style="padding:.75rem;border:1px solid #ffcdd2">Qua thành ruột, chưa hạch</td></tr>
<tr><td style="padding:.75rem;border:1px solid #ffcdd2">Giai đoạn III</td><td style="padding:.75rem;border:1px solid #ffcdd2">40–70%</td><td style="padding:.75rem;border:1px solid #ffcdd2">Có hạch bạch huyết</td></tr>
<tr style="background:#fafafa"><td style="padding:.75rem;border:1px solid #ffcdd2">Giai đoạn IV</td><td style="padding:.75rem;border:1px solid #ffcdd2">10–15%</td><td style="padding:.75rem;border:1px solid #ffcdd2">Di căn xa (gan, phổi)</td></tr>
</table>

<blockquote style="border-left:4px solid #cc1f1f;padding:1rem 1.5rem;background:#fff5f5;border-radius:0 .5rem .5rem 0;margin:1.5rem 0">
<p style="margin:0;font-style:italic;color:#555">"Nội soi đại tràng tầm soát là can thiệp y tế có hiệu quả - chi phí tốt nhất trong các biện pháp phòng ngừa ung thư. Mỗi đồng đầu tư vào nội soi tầm soát tiết kiệm 3–5 đồng chi phí điều trị ung thư giai đoạn muộn."</p>
<p style="margin:.5rem 0 0;font-weight:700;color:#cc1f1f">— Zauber A.G. et al., New England Journal of Medicine (2012)</p>
</blockquote>

<img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80" alt="Chế độ ăn phòng ung thư đại tràng" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Ai cần tầm soát và khi nào?</h2>
<p><strong>Nguy cơ trung bình (không có yếu tố đặc biệt):</strong></p>
<ul>
<li>Bắt đầu tầm soát từ <strong>45 tuổi</strong> (theo ACS 2018, Bộ Y tế VN 2023)</li>
<li>Nội soi đại tràng mỗi 10 năm nếu kết quả bình thường</li>
<li>Hoặc xét nghiệm phân tìm máu ẩn (FIT) mỗi năm</li>
</ul>
<p><strong>Nguy cơ cao — bắt đầu sớm hơn:</strong></p>
<ul>
<li>Cha/mẹ/anh chị em ruột mắc ung thư đại tràng → bắt đầu từ 40 tuổi hoặc trước 10 năm so với tuổi người thân mắc bệnh</li>
<li>Hội chứng Lynch (HNPCC) → bắt đầu từ 20–25 tuổi, nội soi mỗi 1–2 năm</li>
<li>Đa polyp tuyến gia đình (FAP) → bắt đầu từ 10–15 tuổi</li>
<li>Bệnh viêm ruột mạn tính (Crohn, viêm loét đại tràng) → theo dõi đặc biệt</li>
</ul>

<h2>Dấu hiệu cảnh báo cần đi khám ngay</h2>
<ul>
<li>Đi ngoài ra máu tươi hoặc phân đen (melena)</li>
<li>Thay đổi thói quen đại tiện kéo dài hơn 4 tuần (tiêu chảy xen táo bón)</li>
<li>Cảm giác đại tiện chưa hết, mót rặn</li>
<li>Đau bụng âm ỉ vùng hố chậu kéo dài</li>
<li>Sụt cân không rõ nguyên nhân + mệt mỏi (thiếu máu)</li>
</ul>

<h2>Phòng ngừa qua lối sống</h2>
<ul>
<li><strong>Chất xơ:</strong> 25–38g/ngày — giảm 10% nguy cơ mỗi 10g thêm vào (Reynolds et al., Lancet 2019)</li>
<li><strong>Hạn chế thịt đỏ và thịt chế biến:</strong> WHO phân loại thịt chế biến là chất gây ung thư nhóm 1 (cùng nhóm thuốc lá)</li>
<li><strong>Vận động:</strong> Người vận động thường xuyên giảm 24% nguy cơ ung thư đại tràng</li>
<li><strong>Không hút thuốc, hạn chế rượu bia</strong></li>
<li><strong>Duy trì cân nặng hợp lý:</strong> Béo phì tăng nguy cơ 30–50%</li>
</ul>

<hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>
<p style="font-size:.82rem;color:#888"><strong>Nguồn tham khảo:</strong><br/>
• GLOBOCAN 2022: "Global Cancer Statistics" — CA Cancer J Clin (2024)<br/>
• Zauber A.G. et al.: "Colonoscopic Polypectomy and Long-Term Prevention of Colorectal-Cancer Deaths" — NEJM (2012)<br/>
• Wolf A.M.D. et al.: "Colorectal Cancer Screening for Average-Risk Adults 2018 Guideline Update" — CA Cancer J Clin (2018)<br/>
• Bộ Y tế Việt Nam: Hướng dẫn tầm soát ung thư đại trực tràng (2023)</p>`
  },

  // ── BÀI 5: VIÊM KHỚP DẠNG THẤP ──────────────────────────────────────────
  {
    title: 'Viêm khớp dạng thấp: Bệnh tự miễn nguy hiểm và cách sống khỏe dù mắc bệnh suốt đời',
    category: 'Góc sức khỏe', topic: 'Sức khỏe', featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
    excerpt: 'Viêm khớp dạng thấp không chỉ gây đau khớp — đây là bệnh tự miễn toàn thân ảnh hưởng đến tim, phổi và mạch máu. Tại Việt Nam có khoảng 300.000 người mắc bệnh. Phát hiện sớm và điều trị đúng phác đồ hiện đại có thể đạt lui bệnh hoàn toàn ở 40–50% bệnh nhân.',
    readTime: 8, published: true,
    publishedAt: new Date('2026-04-19'),
    tags: ['Viêm khớp', 'Bệnh tự miễn', 'Xương khớp', 'Sức khỏe', 'Điều trị'],
    content: `<p>Viêm khớp dạng thấp (Rheumatoid Arthritis — RA) là bệnh tự miễn mạn tính trong đó hệ miễn dịch tấn công nhầm vào màng hoạt dịch của khớp. Không được điều trị, RA dẫn đến phá hủy sụn khớp và xương, biến dạng khớp vĩnh viễn trong vòng vài năm. Đặc biệt nguy hiểm: RA tăng nguy cơ nhồi máu cơ tim gấp đôi, tương đương tác động của hút thuốc lá.</p>

<img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80" alt="Viêm khớp dạng thấp điều trị và sống chung" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Triệu chứng đặc trưng — khác với đau khớp thông thường</h2>
<p>RA có những đặc điểm riêng giúp phân biệt với thoái hóa khớp (osteoarthritis):</p>
<ul>
<li><strong>Cứng khớp buổi sáng &gt;1 tiếng</strong> (thoái hóa khớp thường &lt;30 phút)</li>
<li><strong>Viêm đối xứng hai bên</strong> — cùng khớp ở cả hai tay/chân</li>
<li><strong>Ưu tiên khớp nhỏ:</strong> ngón tay, cổ tay, ngón chân — không phải đầu gối, háng (như thoái hóa)</li>
<li><strong>Triệu chứng toàn thân:</strong> mệt mỏi, sốt nhẹ, sụt cân, thiếu máu</li>
<li><strong>Nổi u dưới da</strong> (rheumatoid nodules) ở khuỷu tay — 20% bệnh nhân</li>
</ul>

<h2>Chẩn đoán — không chỉ dựa vào RF</h2>
<p>Xét nghiệm RF (Rheumatoid Factor) chỉ dương tính ở 70–80% bệnh nhân RA — 20–30% là "RF âm tính" nhưng vẫn mắc bệnh. Xét nghiệm anti-CCP (anti-cyclic citrullinated peptide) đặc hiệu hơn — dương tính trước khi triệu chứng xuất hiện 10–15 năm. Chẩn đoán theo tiêu chí ACR/EULAR 2010 kết hợp lâm sàng + xét nghiệm + hình ảnh học.</p>

<blockquote style="border-left:4px solid #cc1f1f;padding:1rem 1.5rem;background:#fff5f5;border-radius:0 .5rem .5rem 0;margin:1.5rem 0">
<p style="margin:0;font-style:italic;color:#555">"Chiến lược Treat-to-Target (T2T) — điều trị tích cực để đạt lui bệnh hoặc hoạt động bệnh thấp trong vòng 6 tháng — đã cách mạng hóa tiên lượng RA. Bệnh nhân được điều trị theo T2T có chất lượng cuộc sống không khác biệt đáng kể so với người bình thường sau 5 năm."</p>
<p style="margin:.5rem 0 0;font-weight:700;color:#cc1f1f">— Smolen J.S. et al., EULAR Recommendations for Management of RA (2022)</p>
</blockquote>

<img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80" alt="Vận động nhẹ nhàng hỗ trợ điều trị viêm khớp" style="max-width:100%;border-radius:0.75rem;margin:1.5rem 0"/>

<h2>Điều trị RA hiện đại — không phải chỉ giảm đau</h2>

<h3>DMARDs — nền tảng điều trị</h3>
<p>Disease-Modifying Antirheumatic Drugs (DMARDs) không chỉ giảm triệu chứng mà ức chế tiến triển bệnh:</p>
<ul>
<li><strong>Methotrexate:</strong> Vẫn là "anchor drug" đầu tay sau 50 năm — hiệu quả, rẻ, quen thuộc. Dùng 1 lần/tuần kết hợp folate</li>
<li><strong>Thuốc sinh học (Biologics):</strong> TNF inhibitors (adalimumab, etanercept), IL-6 inhibitors (tocilizumab) — khi DMARDs cổ điển thất bại</li>
<li><strong>JAK inhibitors (tofacitinib, baricitinib):</strong> Thế hệ mới, uống viên, hiệu quả nhanh — đã có tại Việt Nam</li>
</ul>

<h3>Mục tiêu điều trị</h3>
<p>Theo chiến lược T2T: đạt <strong>lui bệnh hoàn toàn hoặc hoạt động bệnh thấp</strong> (DAS28 &lt;2.6 hoặc &lt;3.2) trong vòng 6 tháng. Nếu không đạt mục tiêu sau 3 tháng → điều chỉnh phác đồ.</p>

<h2>Sống khỏe với RA — những điều bạn có thể làm</h2>
<ul>
<li><strong>Vận động phù hợp:</strong> Đi bộ, bơi lội, yoga nhẹ giảm đau và cải thiện chức năng khớp — không làm nặng bệnh như nhiều người lo sợ</li>
<li><strong>Chế độ ăn chống viêm:</strong> Omega-3 (cá béo), nghệ (curcumin), rau quả giàu chất chống oxy hóa giúp giảm viêm</li>
<li><strong>Bỏ thuốc lá:</strong> Thuốc lá làm nặng RA và giảm hiệu quả điều trị sinh học</li>
<li><strong>Kiểm soát stress:</strong> Stress kích hoạt đợt bùng phát — mindfulness và thiền định có bằng chứng giảm hoạt động bệnh</li>
<li><strong>Duy trì lịch tái khám:</strong> RA cần theo dõi sát để điều chỉnh thuốc kịp thời</li>
</ul>

<h2>Biến chứng ngoài khớp cần theo dõi</h2>
<ul>
<li><strong>Tim mạch:</strong> Khám tim định kỳ, kiểm soát các yếu tố nguy cơ tim mạch</li>
<li><strong>Loãng xương:</strong> RA + corticoid dài hạn → bổ sung canxi, vitamin D, đo mật độ xương</li>
<li><strong>Nhiễm trùng:</strong> Thuốc ức chế miễn dịch tăng nguy cơ — tiêm vắc-xin cúm, phế cầu định kỳ</li>
</ul>

<hr style="margin:2rem 0;border:none;border-top:1px solid #eee"/>
<p style="font-size:.82rem;color:#888"><strong>Nguồn tham khảo:</strong><br/>
• Smolen J.S. et al.: "EULAR recommendations for the management of rheumatoid arthritis" — Ann Rheum Dis (2022)<br/>
• Aletaha D. et al.: "2010 Rheumatoid Arthritis Classification Criteria" — Arthritis Rheum (2010)<br/>
• Bệnh viện Bạch Mai — Khoa Cơ xương khớp: Hướng dẫn chẩn đoán và điều trị VKDT (2023)<br/>
• Hội Thấp khớp học Việt Nam: Khuyến cáo điều trị viêm khớp dạng thấp (2022)</p>`
  }

];

module.exports = { SEED_DATA: posts };

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const admin = await User.findOne({ role: 'admin' });
  if (!admin) { console.error('Không tìm thấy admin user'); process.exit(1); }
  let added = 0;
  for (const p of posts) {
    const exists = await Post.findOne({ title: p.title });
    if (exists) { console.log('Bỏ qua:', p.title); continue; }
    await Post.create({ ...p, author: admin._id });
    console.log('✅', p.title);
    added++;
  }
  console.log(`\nHoàn tất: ${added} bài đã thêm.`);
  process.exit(0);
}

if (require.main === module) {
  seed().catch(e => { console.error(e); process.exit(1); });
}
