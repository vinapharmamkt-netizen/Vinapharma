/**
 * update-about-articles.js
 * Upload thêm ảnh và cập nhật nội dung dài hơn cho 4 bài giới thiệu (id 8-11)
 */
require('dotenv').config();
const mongoose   = require('mongoose');
const cloudinary = require('cloudinary').v2;
const fs         = require('fs');
const path       = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Settings = mongoose.model(
  'Settings',
  new mongoose.Schema({ key: String, value: mongoose.Schema.Types.Mixed })
);

const BASE = 'D:/Vinapharma Web/files/hình ảnh';

// ── helpers ──────────────────────────────────────────────────────────────────

async function upload(localPath, folder) {
  const name = path.basename(localPath);
  console.log(`  ↑ ${name}`);
  const res = await cloudinary.uploader.upload(localPath, { folder });
  return res.secure_url;
}

async function uploadAll(paths, folder) {
  const urls = [];
  for (const p of paths) urls.push(await upload(p, folder));
  return urls;
}

function pick(dir, n) {
  try {
    const files = fs.readdirSync(dir)
      .filter(f => /\.(jpe?g|png|webp)$/i.test(f))
      .slice(0, n);
    return files.map(f => path.join(dir, f));
  } catch(e) { return []; }
}

// ── img helpers for HTML ──────────────────────────────────────────────────────

function imgFull(url) {
  return `<img src="${url}" style="width:100%;border-radius:.7rem;margin:1.2rem 0;display:block;object-fit:cover">`;
}

function imgGrid2(urls) {
  if (!urls || !urls.length) return '';
  const imgs = urls.map(u =>
    `<img src="${u}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:.5rem;display:block">`
  ).join('');
  return `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.7rem;margin:1.2rem 0">${imgs}</div>`;
}

function imgGrid3(urls) {
  if (!urls || !urls.length) return '';
  const imgs = urls.map(u =>
    `<img src="${u}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:.5rem;display:block">`
  ).join('');
  return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.7rem;margin:1.2rem 0">${imgs}</div>`;
}

function imgGrid2x2(urls) {
  if (!urls || !urls.length) return '';
  const imgs = urls.slice(0, 4).map(u =>
    `<img src="${u}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:.5rem;display:block">`
  ).join('');
  return `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.7rem;margin:1.2rem 0">${imgs}</div>`;
}

// ── content builders ──────────────────────────────────────────────────────────

function buildContent8(g) {
  // g.yep25, g.yep24, g.yep23, g.activlab, g.birthday, g.hanquoc, g.thailand
  return `
<p>Tại VinaPharma, văn hóa không phải là khẩu hiệu treo tường — đó là cách chúng tôi sống và làm việc mỗi ngày. Từ những buổi lễ tổng kết cuối năm sôi nổi đến những chuyến du lịch gắn kết, từ sinh nhật nhân viên ấm áp đến những chuyến tham quan học hỏi đối tác — tất cả đều phản ánh một điều: VinaPharma trân trọng con người và xem sự gắn kết nội bộ là nền tảng của mọi thành công.</p>

<h2>YEP 2025 — Giải Thưởng Của Năm</h2>
<p>Chương trình Young Energetic People (YEP) là sự kiện thường niên đặc biệt nhất trong năm của VinaPharma. YEP 2025 diễn ra với chủ đề "Giải Thưởng Của Năm" — một đêm vinh danh những cá nhân và tập thể xuất sắc đã cống hiến hết mình trong suốt năm qua. Không khí hừng hực, những tiếng vỗ tay vang dội và ánh mắt tự hào của từng thành viên khi được nhìn nhận là những hình ảnh không thể quên trong hành trình phát triển của VinaPharma.</p>
<p>YEP không chỉ là một buổi tiệc — đó là nghi lễ kết thúc một chu kỳ và mở ra một trang mới, nơi mỗi người đều cảm nhận rõ ràng: "Tôi là một phần quan trọng của tổ chức này."</p>
${imgGrid2x2(g.yep25)}

<h2>YEP 2024 — Hành Trình Vươn Tầm</h2>
<p>Năm 2024 đánh dấu một cột mốc quan trọng trong hành trình phát triển của VinaPharma khi đội ngũ không ngừng mở rộng và chuyên nghiệp hóa. YEP 2024 là dịp để cả tập thể nhìn lại những gì đã xây dựng được — từ mạng lưới nhà thuốc được mở rộng, đến các sản phẩm mới được đưa ra thị trường, đến những mối quan hệ đối tác bền chặt hơn. Sự kiện quy tụ toàn bộ đội ngũ trong một không gian được thiết kế chu đáo, với phần trao giải xúc động và tiết mục văn nghệ do chính nhân viên thể hiện.</p>
${imgGrid3(g.yep24)}

<h2>YEP 2023 — Nền Móng Được Đặt</h2>
<p>Nếu 2024 là năm vươn tầm, thì 2023 là năm VinaPharma đặt những viên gạch đầu tiên cho nền móng văn hóa doanh nghiệp. YEP 2023 — buổi tổng kết đầu tiên mang quy mô chính thức — là minh chứng cho quyết tâm của ban lãnh đạo trong việc xây dựng một môi trường làm việc nơi mỗi đóng góp đều được ghi nhận và trân trọng.</p>
${imgGrid2(g.yep23)}

<h2>Tour Thưởng Nhân Viên — Hàn Quốc & Thái Lan</h2>
<p>Một trong những phúc lợi được đội ngũ VinaPharma trông chờ nhất mỗi năm là chương trình tour thưởng dành cho những nhân viên và cộng tác viên đạt thành tích xuất sắc. Năm 2024, VinaPharma đã đưa đội ngũ VIP đến Hàn Quốc và Thái Lan — hai hành trình đầy ắp kỷ niệm và tiếng cười.</p>
<p>Tại Hàn Quốc, đoàn được trải nghiệm văn hóa xứ kim chi, khám phá cảnh sắc và gặp gỡ đối tác thị trường. Tại Thái Lan, đoàn có dịp thư giãn, tham quan và cùng nhau tạo thêm những kỷ niệm khó quên. Đây không chỉ là phần thưởng — đây là cách VinaPharma nói lời cảm ơn chân thành với những người đã cống hiến hết mình.</p>
${imgGrid3(g.hanquoc)}
${imgGrid3(g.thailand)}

<h2>Chuyến Tham Quan Activlab 2025 — Học Hỏi Từ Đối Tác</h2>
<p>Đầu năm 2025, đội ngũ VinaPharma có cơ hội tham quan trực tiếp nhà máy và showroom của Activlab — một trong những thương hiệu thực phẩm chức năng hàng đầu mà VinaPharma phân phối tại Việt Nam. Chuyến đi không chỉ giúp đội ngũ hiểu sâu hơn về quy trình sản xuất, kiểm soát chất lượng và tiêu chuẩn quốc tế của sản phẩm, mà còn là cơ hội giao lưu, học hỏi và xây dựng mối quan hệ đối tác bền chặt hơn.</p>
<p>Những trải nghiệm thực tế như thế này giúp đội ngũ tư vấn sản phẩm tự tin hơn, chính xác hơn và đặt niềm tin vào từng sản phẩm mà mình đang mang đến cho khách hàng.</p>
${imgGrid3(g.activlab.slice(0,3))}
${imgGrid3(g.activlab.slice(3,6))}

<h2>Sinh Nhật Nhân Viên — Những Khoảnh Khắc Ấm Áp</h2>
<p>Tại VinaPharma, mỗi người đều được nhớ đến vào ngày sinh nhật của mình. Dù bận rộn đến đâu, tập thể vẫn luôn dành thời gian để tổ chức một buổi nhỏ ấm cúng, cùng nhau chúc mừng và chia sẻ niềm vui. Đây là một trong những truyền thống được đội ngũ yêu thích nhất — không cầu kỳ, không hình thức, chỉ là sự chân thành và tình cảm thật sự giữa những người cùng gắn bó.</p>
${imgGrid2x2(g.birthday)}
<p>Những khoảnh khắc nhỏ bé như vậy, được tích lũy qua thời gian, tạo nên sợi dây kết nối bền chặt — điều mà không bất kỳ quy trình hay chính sách nào có thể thay thế được.</p>
`.trim();
}

function buildContent9(g) {
  // g.pharma2024, g.maiamKhiet, g.oct2024, g.bao2025, g.tram2025, g.bualoi
  return `
<p>Sứ mệnh của VinaPharma không chỉ dừng lại ở việc phân phối thực phẩm chức năng chất lượng. Chúng tôi tin rằng, vai trò của một doanh nghiệp sức khỏe thực sự có trách nhiệm là cùng đồng hành với cộng đồng — từ việc hỗ trợ hệ thống nhà thuốc phát triển bền vững, đến việc tham gia vào các dự án xã hội có ý nghĩa thiết thực.</p>
<p>Từ những buổi gặp gỡ, ký kết hợp tác với nhà thuốc cho đến các chương trình tài trợ sức khỏe cộng đồng, VinaPharma luôn xem đây là một phần không thể thiếu trong hành trình phát triển của mình.</p>

<h2>Đồng Hành Cùng Nhà Thuốc — Nền Tảng Phân Phối Bền Vững</h2>
<p>Hệ thống nhà thuốc là cầu nối quan trọng nhất giữa VinaPharma và người tiêu dùng. Vì vậy, chúng tôi không chỉ xem các nhà thuốc là kênh bán hàng — mà là những người đồng hành chiến lược. VinaPharma liên tục tổ chức các buổi gặp gỡ, trao đổi và ký kết hợp tác, đồng thời cung cấp đào tạo, tài liệu hỗ trợ và các chương trình ưu đãi dành riêng cho đối tác nhà thuốc.</p>
<p>Đây là những khoảnh khắc VinaPharma gặp gỡ và đồng hành cùng nhà thuốc Nhân Hòa — một trong những đối tác trọng điểm trong mạng lưới phân phối của chúng tôi tại TP.HCM.</p>
${imgGrid3(g.pharma2024)}

<h2>Cùng Nhà Thuốc Nhân Hòa — Thăm Mái Ấm Khiết Tâm</h2>
<p>Tháng 8 năm 2024, VinaPharma cùng đội ngũ nhà thuốc Nhân Hòa đã thực hiện chuyến thăm và trao quà tại Mái ấm Khiết Tâm — nơi chăm sóc những mảnh đời đặc biệt cần được yêu thương và hỗ trợ. Chuyến thăm không chỉ mang đến những phần quà thiết thực gồm thực phẩm chức năng hỗ trợ sức khỏe, mà còn là nguồn động viên tinh thần to lớn cho các em nhỏ và các cô chú ở đây.</p>
<p>Hoạt động này là một phần trong chuỗi cam kết của VinaPharma và các đối tác về trách nhiệm xã hội — mang lại sức khỏe và giá trị thực cho những người cần nhất.</p>
${imgGrid2x2(g.maiamKhiet)}
${imgGrid2(g.maiamKhiet.slice(4,6))}

<h2>Ngày Phụ Nữ Việt Nam — Gắn Kết Và Tri Ân</h2>
<p>Tháng 10 năm 2024, nhân dịp Ngày Phụ Nữ Việt Nam 20/10, VinaPharma cùng nhà thuốc Nhân Hòa đã tổ chức buổi gặp mặt ấm áp để tri ân những người phụ nữ trong đội ngũ đối tác. Đây là dịp để thắt chặt thêm tình cảm, chia sẻ và cùng nhau ghi nhận những đóng góp của người phụ nữ trong ngành dược — những người ngày ngày âm thầm tư vấn và chăm sóc sức khỏe cho cộng đồng.</p>
${imgGrid2x2(g.oct2024)}

<h2>Hỗ Trợ Khắc Phục Bão Bualoi & Matmo — Đồng Hành Với Đồng Bào</h2>
<p>Tháng 10 năm 2025, khi cơn bão Bualoi và Matmo gây ra thiệt hại nặng nề cho các tỉnh Nghệ An, Thanh Hóa, Thái Nguyên và Bắc Ninh, VinaPharma đã không đứng ngoài. Cùng với các tổ chức từ thiện và nhóm cộng đồng, VinaPharma đồng hành hỗ trợ nhu yếu phẩm, thuốc men và tài trợ tại các điểm chịu ảnh hưởng nặng nề nhất — từ CLB Từ Ái (Nghệ An, Thanh Hóa) đến Chùa Minh Lương (Thái Nguyên, Bắc Ninh).</p>
<p>Trong những lúc khó khăn nhất, sự hiện diện và hỗ trợ kịp thời là điều người dân cần nhất. VinaPharma tin rằng một doanh nghiệp sức khỏe có trách nhiệm phải có mặt ở đó.</p>
${imgGrid3(g.bao2025.slice(0,3))}
${imgGrid3(g.bao2025.slice(3,6))}

<h2>Trạm Phòng Tương Lai — Sức Khỏe Học Đường</h2>
<p>Chương trình "Trạm Phòng Tương Lai" Mùa 3 là sáng kiến kết hợp giữa VinaPharma và các đối tác giáo dục nhằm mang kiến thức sức khỏe, dinh dưỡng và phòng bệnh đến gần hơn với thế hệ trẻ trong môi trường học đường. Các buổi trải nghiệm trực tiếp, trò chơi sức khỏe và hướng dẫn sử dụng thực phẩm chức năng phù hợp lứa tuổi đã tạo ra những ấn tượng sâu sắc cho cả học sinh lẫn phụ huynh.</p>
${imgGrid3(g.tram2025.slice(0,3))}
${imgGrid3(g.tram2025.slice(3,6))}
<p>Đây là một trong những chương trình mà đội ngũ VinaPharma tự hào nhất — vì nó đặt nền móng cho thói quen chăm sóc sức khỏe từ sớm và đúng cách.</p>
`.trim();
}

function buildContent10(g) {
  // g.trungthu, g.tiepbuoc, g.vogiaCu, g.tieuHoc, g.thcs, g.thamDuc
  return `
<p>VinaPharma tin rằng sức khỏe là quyền của tất cả mọi người — không phân biệt hoàn cảnh, địa lý hay điều kiện kinh tế. Xuất phát từ niềm tin đó, các hoạt động thiện nguyện không phải là hình ảnh của VinaPharma, mà là trách nhiệm và tình người mà chúng tôi muốn thực hiện một cách chân thành và bền vững. Qua nhiều chương trình thiện nguyện từ 2023 đến nay, VinaPharma đã tiếp cận hàng nghìn hoàn cảnh khó khăn tại TP.HCM, Phú Yên, Long An và nhiều địa phương khác.</p>

<h2>Trung Thu Cho Em — Ánh Đèn Lồng Thắp Sáng Tuổi Thơ</h2>
<p>Tháng 9 năm 2024, VinaPharma cùng các tình nguyện viên đã tổ chức chương trình Tết Trung Thu cho các em nhỏ có hoàn cảnh khó khăn tại Phú Yên. Những chiếc đèn lồng, những bánh trung thu và những tiếng hát vui vẻ đã mang đến một đêm rằm ý nghĩa cho các em — những đứa trẻ mà không phải lúc nào cũng có đầy đủ điều kiện để đón lễ hội như bao bạn cùng trang lứa.</p>
<p>Nhìn vào ánh mắt rạng rỡ của các em khi cầm đèn lồng và cười vang — đó là khoảnh khắc mà không một ngôn từ nào có thể diễn tả hết. Đây là nguồn năng lượng giúp đội ngũ VinaPharma tiếp tục cống hiến.</p>
${imgGrid2x2(g.trungthu)}

<h2>Tiếp Bước Đến Trường — Trao Cơ Hội Thay Đổi Tương Lai</h2>
<p>Cùng tháng 9 năm 2024, VinaPharma tham gia đồng hành cùng chương trình "Tiếp Bước Đến Trường" — trao xe đạp, học bổng và dụng cụ học tập cho các em học sinh vùng sâu vùng xa có hoàn cảnh khó khăn. Tại lễ trao, UBMT TQVN TP.Cao Đài đã trao 59 chiếc xe đạp cho học sinh nghèo vượt khó — một hình ảnh đẹp về sự đồng lòng của cộng đồng doanh nghiệp và tổ chức xã hội vì thế hệ tương lai.</p>
<p>VinaPharma tin rằng đầu tư vào giáo dục là đầu tư vào tương lai bền vững nhất. Khi một đứa trẻ có xe đạp đến trường, có sách vở để học — cơ hội thay đổi cuộc đời của em trở nên rộng mở hơn rất nhiều.</p>
${imgGrid3(g.tiepbuoc.slice(0,3))}
${imgGrid2(g.tiepbuoc.slice(3,5))}

<h2>Chương Trình Trăng Sáng Mùa 1 — Ánh Sáng Đến Nhiều Ngôi Trường</h2>
<p>Tháng 9 năm 2024, VinaPharma đồng hành cùng chương trình "Trăng Sáng Mùa 1" — thực hiện các buổi giao lưu, tặng quà và hỗ trợ dụng cụ học tập tại nhiều trường học ở tỉnh Long An: Tiểu học Hồ Văn Nhánh, THCS Vĩnh Ngươu và Tiểu học Lê Văn Tám. Đây là dịp để đội ngũ VinaPharma trực tiếp lắng nghe, giao lưu và cảm nhận cuộc sống của các em học sinh vùng nông thôn — qua đó càng thêm trân trọng những điều kiện học tập mà chúng ta thường coi là hiển nhiên.</p>
${imgGrid3(g.tieuHoc.slice(0,3))}
${imgGrid3(g.thcs.slice(0,3))}

<h2>Hỗ Trợ Người Vô Gia Cư Tại TP.HCM</h2>
<p>Tháng 11 năm 2024, trong những đêm mưa của Sài Gòn, đội ngũ VinaPharma đã có mặt trên các con phố để trao những phần cơm nóng, nước uống và quà tặng cho những người vô gia cư. Hoạt động nhỏ nhưng đầy ý nghĩa này nhắc nhở chúng tôi rằng giá trị của một doanh nghiệp không chỉ nằm ở doanh số — mà còn ở sự quan tâm và lòng nhân ái với những người quanh mình.</p>
${imgGrid2x2(g.vogiaCu)}

<h2>Trăng Sáng Mùa 2 — Yêu Thương Tại Mái Ấm Tâm Đức</h2>
<p>Năm 2025, chương trình "Trăng Sáng" bước sang Mùa 2 với điểm đến đặc biệt — Mái Ấm Tâm Đức, nơi chăm sóc những trẻ em và người cao tuổi có hoàn cảnh đặc biệt khó khăn. VinaPharma cùng các tình nguyện viên đã tổ chức buổi Trung Thu ấm cúng với bánh, đèn lồng, trò chơi và quà tặng, đồng thời trao tặng thực phẩm chức năng hỗ trợ sức khỏe cho các em nhỏ và người cao tuổi tại đây.</p>
<p>Mỗi nụ cười, mỗi cái ôm từ các em nhỏ tại mái ấm là phần thưởng lớn nhất và chân thực nhất mà đội ngũ VinaPharma nhận được — và là lý do để tiếp tục hành trình này.</p>
${imgGrid3(g.thamDuc.slice(0,3))}
${imgGrid3(g.thamDuc.slice(3,6))}
`.trim();
}

function buildContent11(g) {
  // g.all — flat folder with 107 files
  return `
<p>Dược sĩ là người tư vấn sức khỏe đầu tiên và gần gũi nhất của người dân Việt Nam. Trước mỗi quyết định sử dụng thực phẩm chức năng, sự tư vấn đúng đắn từ một dược sĩ có thể tạo ra sự khác biệt lớn trong hiệu quả chăm sóc sức khỏe. Nhận thức được tầm quan trọng đó, VinaPharma đã và đang đầu tư nghiêm túc vào các chương trình đào tạo chuyên sâu dành cho đội ngũ dược sĩ tại hệ thống nhà thuốc đối tác.</p>

<h2>Tại Sao VinaPharma Đào Tạo Dược Sĩ?</h2>
<p>Trong ngành thực phẩm chức năng, sản phẩm tốt chưa đủ — cần người hiểu sản phẩm và biết tư vấn đúng đối tượng. Một dược sĩ được đào tạo bài bản có thể phân biệt được từng dòng sản phẩm, hiểu rõ thành phần và cơ chế tác dụng hỗ trợ, đồng thời tư vấn phù hợp với từng nhóm khách hàng: người cao tuổi, phụ nữ mang thai, trẻ em, hay người có bệnh nền.</p>
<p>VinaPharma đào tạo không phải để bán được nhiều hàng hơn — mà để dược sĩ tư vấn đúng hơn, và người tiêu dùng sử dụng sản phẩm hiệu quả hơn. Đó mới là giá trị thực sự.</p>
${imgFull(g.all[0])}

<h2>Nội Dung Đào Tạo Chuyên Biệt</h2>
<p>Các buổi đào tạo của VinaPharma được thiết kế theo hướng thực tiễn — không chỉ cung cấp kiến thức lý thuyết mà còn rèn luyện kỹ năng tư vấn trực tiếp. Nội dung đào tạo bao gồm:</p>
<ul>
  <li><strong>Kiến thức sản phẩm:</strong> Thành phần, hàm lượng, cơ chế hỗ trợ sức khỏe và ưu điểm cạnh tranh của từng dòng sản phẩm trong danh mục VinaPharma.</li>
  <li><strong>Phân loại đối tượng:</strong> Cách xác định nhu cầu khách hàng theo nhóm tuổi, giới tính, tình trạng sức khỏe và thói quen sinh hoạt.</li>
  <li><strong>Kỹ năng tư vấn:</strong> Cách đặt câu hỏi, lắng nghe, giải thích và thuyết phục một cách chân thực và có trách nhiệm.</li>
  <li><strong>Tuân thủ pháp lý:</strong> Các quy định về quảng cáo và tư vấn thực phẩm chức năng theo quy định của Bộ Y tế Việt Nam.</li>
</ul>
${imgGrid2(g.all.slice(1, 3))}

<h2>Hình Thức Đào Tạo Đa Dạng</h2>
<p>VinaPharma áp dụng nhiều hình thức đào tạo khác nhau để phù hợp với lịch làm việc của dược sĩ tại nhà thuốc:</p>
<p><strong>Hội thảo tập trung quy mô lớn</strong> — được tổ chức định kỳ tại TP.HCM, quy tụ hàng chục đến hàng trăm dược sĩ từ các nhà thuốc đối tác. Đây là dịp để cập nhật kiến thức mới, gặp gỡ chuyên gia và giao lưu giữa các đối tác.</p>
<p><strong>Đào tạo tại nhà thuốc</strong> — đội ngũ đại diện VinaPharma trực tiếp đến từng nhà thuốc để đào tạo theo nhóm nhỏ, tiện lợi và phù hợp với lịch làm việc của từng đơn vị.</p>
<p><strong>Tài liệu & công cụ hỗ trợ</strong> — VinaPharma cung cấp tài liệu đào tạo, bảng so sánh sản phẩm, video hướng dẫn và ứng dụng tư vấn giúp dược sĩ có thể tự học và ôn luyện bất cứ lúc nào.</p>
${imgGrid3(g.all.slice(3, 6))}

<h2>Những Khoảnh Khắc Đáng Nhớ Trong Các Buổi Đào Tạo</h2>
<p>Mỗi buổi đào tạo không chỉ là nơi truyền đạt kiến thức — đó còn là không gian giao lưu, chia sẻ kinh nghiệm thực tế và xây dựng niềm tin giữa VinaPharma và đối tác. Những câu hỏi thẳng thắn từ dược sĩ, những tình huống thực tế được đặt ra và giải quyết cùng nhau — đó chính là giá trị cốt lõi mà các buổi đào tạo mang lại.</p>
${imgGrid2x2(g.all.slice(6, 10))}
${imgGrid2(g.all.slice(10, 12))}

<h2>Kết Quả Và Định Hướng Tương Lai</h2>
<p>Đến nay, VinaPharma đã tổ chức hàng chục buổi đào tạo với hàng trăm lượt dược sĩ tham gia từ nhiều tỉnh thành. Kết quả đo lường được không chỉ là doanh số — mà là chất lượng tư vấn được nâng lên, khách hàng hài lòng hơn và dược sĩ tự tin hơn trong công việc hàng ngày của mình.</p>
<p>Trong thời gian tới, VinaPharma sẽ tiếp tục mở rộng chương trình đào tạo ra các tỉnh thành ngoài TP.HCM, đồng thời phát triển nền tảng đào tạo trực tuyến để tiếp cận được nhiều dược sĩ hơn, ở bất kỳ đâu trên cả nước. Bởi vì khi dược sĩ giỏi hơn, người Việt được chăm sóc sức khỏe tốt hơn — và đó chính là sứ mệnh mà VinaPharma theo đuổi.</p>
${imgGrid3(g.all.slice(12, 15))}
`.trim();
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB\n');

  const B = BASE;
  const FOLDER = 'vinapharma/about';

  // ── Section 8 ──
  console.log('=== Section 8: Hoạt động công ty ===');
  const s8 = {
    yep25:    await uploadAll(pick(`${B}/Hoạt động công ty/2025 YEP`, 4), `${FOLDER}/s8`),
    yep24:    await uploadAll(pick(`${B}/Hoạt động công ty/2024 YEP`, 4), `${FOLDER}/s8`),
    yep23:    await uploadAll(pick(`${B}/Hoạt động công ty/2023 YEP`, 3), `${FOLDER}/s8`),
    activlab: await uploadAll(pick(`${B}/Hoạt động công ty/2025 Tham quan Activlab`, 6), `${FOLDER}/s8`),
    birthday: await uploadAll(pick(`${B}/Hoạt động công ty/Sinh nhật nhân viên`, 4), `${FOLDER}/s8`),
    hanquoc:  await uploadAll(pick(`${B}/Hoạt động công ty/2024 Tour tham quan_VIP/Hàn Quốc`, 3), `${FOLDER}/s8`),
    thailand: await uploadAll(pick(`${B}/Hoạt động công ty/2024 Tour tham quan_VIP/Thái Lan`, 3), `${FOLDER}/s8`),
  };

  // ── Section 9 ──
  console.log('\n=== Section 9: Hợp tác & Tài trợ ===');
  const s9 = {
    pharma2024:  await uploadAll(pick(`${B}/Hoạt động hợp tác - Tài trợ/2024`, 3), `${FOLDER}/s9`),
    maiamKhiet:  await uploadAll(pick(`${B}/Hoạt động hợp tác - Tài trợ/2024/Tháng 8 Nhà Thuốc Nhân Hòa_Mái ấm Khiết Tâm`, 6), `${FOLDER}/s9`),
    oct2024:     await uploadAll(pick(`${B}/Hoạt động hợp tác - Tài trợ/2024/Tháng 10 Nhà thuốc Nhân Hòa_20.10`, 4), `${FOLDER}/s9`),
    bao2025:     await uploadAll(pick(`${B}/Hoạt động hợp tác - Tài trợ/2025/Tháng 10 Bão Bualoi và Matmo/CLB Từ Ái - Nghệ An, Thanh Hóa`, 6), `${FOLDER}/s9`),
    tram2025:    await uploadAll(pick(`${B}/Hoạt động hợp tác - Tài trợ/2025/Trạm phòng tương lai/Mùa 3`, 6), `${FOLDER}/s9`),
  };

  // ── Section 10 ──
  console.log('\n=== Section 10: Hoạt động thiện nguyện ===');
  const s10 = {
    trungthu: await uploadAll(pick(`${B}/Hoạt động thiện nguyện/2024/Tháng 9 Trung Thu Phú Yên`, 4), `${FOLDER}/s10`),
    tiepbuoc: await uploadAll(pick(`${B}/Hoạt động thiện nguyện/2024/Tháng 9 Tiếp bước đến trường`, 5), `${FOLDER}/s10`),
    vogiaCu:  await uploadAll(pick(`${B}/Hoạt động thiện nguyện/2024/Tháng 11 TPHCM - Người vô gia cư`, 4), `${FOLDER}/s10`),
    tieuHoc:  await uploadAll(pick(`${B}/Hoạt động thiện nguyện/2024/Tháng 9 Trăng Sáng 1/Tiểu học Hồ Văn Nhánh`, 4), `${FOLDER}/s10`),
    thcs:     await uploadAll(pick(`${B}/Hoạt động thiện nguyện/2024/Tháng 9 Trăng Sáng 1/THCS Vĩnh Ngươu`, 4), `${FOLDER}/s10`),
    thamDuc:  await uploadAll(pick(`${B}/Hoạt động thiện nguyện/2025/Trăng sáng mùa 2/Mái ấm Tâm Đức`, 6), `${FOLDER}/s10`),
  };

  // ── Section 11 ──
  console.log('\n=== Section 11: Đào tạo dược sĩ ===');
  const s11 = {
    all: await uploadAll(pick(`${B}/Đào tạo dược sĩ`, 15), `${FOLDER}/s11`),
  };

  console.log('\n=== All uploads done. Building content... ===\n');

  const contentMap = {
    'about-content-8':  buildContent8(s8),
    'about-content-9':  buildContent9(s9),
    'about-content-10': buildContent10(s10),
    'about-content-11': buildContent11(s11),
  };

  for (const [key, html] of Object.entries(contentMap)) {
    let doc = await Settings.findOne({ key });
    if (doc) {
      doc.value = html;
      await doc.save();
    } else {
      await Settings.create({ key, value: html });
    }
    console.log(`✓ Saved ${key} (${html.length} chars)`);
  }

  console.log('\nDone!');
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
