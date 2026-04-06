/**
 * seed-about-content.js
 * Cập nhật nội dung 8 section Giới thiệu từ tài liệu PDF bàn giao
 */
require('dotenv').config();
const mongoose = require('mongoose');

const Settings = mongoose.model('Settings', new mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed
}));

const IMGS = {
  s0: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424404/vinapharma/about/s0/sethivjr6mwpwycnk9zg.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424406/vinapharma/about/s0/pfz4sdguhgifu18iqmgi.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424408/vinapharma/about/s0/sm5nv5se2pyenxnidhhh.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424409/vinapharma/about/s0/tjpu8crahpltsb5lkq78.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424410/vinapharma/about/s0/xy6nhwaf1a68prfrz9kq.jpg',
  ],
  s1: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424412/vinapharma/about/s1/taxy3d9ofza6whlsyfh2.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424414/vinapharma/about/s1/a5xkllkubtw4ih2a3gou.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424415/vinapharma/about/s1/hh5bishfuitj0cu1dt5d.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424416/vinapharma/about/s1/qnd9uxzk2jcgfdtqcvfy.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424418/vinapharma/about/s1/jmykmmyuky3m1tj4zcdx.jpg',
  ],
  s2: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424419/vinapharma/about/s2/gc2ubnotimfqwhki0dcb.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424421/vinapharma/about/s2/yhjeaq5j6ndfp3de1cz1.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424424/vinapharma/about/s2/feqvcaxewwmrexn8kg1u.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424426/vinapharma/about/s2/t7mzendlu0k5yszlua6n.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424428/vinapharma/about/s2/rkedu1w6rpjhp74gppmi.jpg',
  ],
  s3: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424555/vinapharma/about/s3/pr7oemcdrcib4yjoz2qg.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424557/vinapharma/about/s3/sprf8bt3lwpas1htyrls.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424560/vinapharma/about/s3/ltjmu87mzm8ecmgk4y66.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424562/vinapharma/about/s3/ztvzrghz9wtnx60ruds2.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424564/vinapharma/about/s3/sbrcijt7t5xg0iu3yhdl.jpg',
  ],
  s4: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424567/vinapharma/about/s4/mopntptadwuw6jmvocqx.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424570/vinapharma/about/s4/dzdfou81kb9dhijgoefx.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424572/vinapharma/about/s4/oavebymxghr2vkw8fabe.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424574/vinapharma/about/s4/hj2eryeymboi0k8dgbav.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424577/vinapharma/about/s4/trrfbyqyduv265vnvn5s.jpg',
  ],
  s5: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424580/vinapharma/about/s5/qnazwr0lxqqhvqq5j1bg.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424581/vinapharma/about/s5/ikg676iank38eamrmd8e.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424583/vinapharma/about/s5/of0ncouox6jdezx5s0nu.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424584/vinapharma/about/s5/rllunaserloipqujrupm.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424586/vinapharma/about/s5/zqoim9lflprdi2xlwezd.jpg',
  ],
  s6: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424589/vinapharma/about/s6/skkkqs5p8sazbaftirmo.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424591/vinapharma/about/s6/a6owk9kczgz5yc8gkmjv.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424593/vinapharma/about/s6/gmynzravlrsneuviujx0.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424595/vinapharma/about/s6/gnqdr6wvh8elc9k8ztnj.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424597/vinapharma/about/s6/ymolhqepxxldmjah9ufr.jpg',
  ],
  s7: [
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424599/vinapharma/about/s7/bnvxlf93upzlwl0tvxxz.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424602/vinapharma/about/s7/a809wvsq5up6or3aaf3g.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424605/vinapharma/about/s7/byrd1tlaksrgevah3snj.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424607/vinapharma/about/s7/uyguufrn8mmwbmnzev9p.jpg',
    'https://res.cloudinary.com/dvxrs3dtg/image/upload/v1774424610/vinapharma/about/s7/xgrkqesqnxb2uyg7cpkq.jpg',
  ],
};

const img = (url) =>
  `<p><img src="${url}" style="width:100%;max-width:820px;border-radius:.7rem;margin:1rem 0;display:block" /></p>`;

const CONTENTS = [

  // ── 0. Về VinaPharma ──────────────────────────────────────────
  `<h2>Câu chuyện thành lập</h2>
<p>VinaPharma được thành lập vào năm 2018 với định hướng xây dựng một doanh nghiệp phân phối trong lĩnh vực chăm sóc sức khỏe theo tiêu chuẩn chuyên nghiệp, minh bạch và phát triển bền vững. Ngay từ những ngày đầu, công ty lựa chọn tập trung vào các nhóm sản phẩm có giá trị sử dụng thiết thực, phù hợp với nhu cầu chăm sóc sức khỏe ngày càng cao của người Việt.</p>
<p>Từ nền tảng đó, VinaPharma từng bước phát triển danh mục phân phối gồm thực phẩm chức năng, dược mỹ phẩm và các sản phẩm bổ sung hỗ trợ sức khỏe đến từ những thương hiệu uy tín trong và ngoài nước. Chúng tôi không theo đuổi tăng trưởng bằng sự dàn trải, mà chú trọng xây dựng năng lực chọn lọc sản phẩm, phát triển mạng lưới đối tác nhà thuốc và gìn giữ niềm tin dài hạn trên thị trường.</p>
<p>Hành trình của VinaPharma đúc rút nên một niềm tin rõ ràng: những giá trị tốt cho sức khỏe chỉ thật sự có ý nghĩa khi được đưa đến đúng nơi, đúng nhu cầu và bằng một hệ thống phân phối đáng tin cậy.</p>
${img(IMGS.s0[0])}
<h2>Triết lý vận hành</h2>
<p>Tại VinaPharma, chúng tôi tin rằng một doanh nghiệp trong lĩnh vực chăm sóc sức khỏe chỉ có thể phát triển bền vững khi đặt chất lượng, uy tín và trách nhiệm làm nền tảng cho mọi quyết định.</p>
<p>Triết lý vận hành của chúng tôi bắt đầu từ việc lựa chọn sản phẩm một cách thận trọng, ưu tiên những thương hiệu có nguồn gốc rõ ràng, tiêu chuẩn sản xuất nghiêm ngặt và giá trị sử dụng phù hợp với thị trường Việt Nam. Trên nền tảng đó, VinaPharma xây dựng quan hệ hợp tác với đối tác bằng tinh thần minh bạch, nhất quán và cùng phát triển lâu dài.</p>
<p>Chúng tôi không xem phân phối là một hoạt động trung gian đơn thuần. Với VinaPharma, phân phối là quá trình kết nối giá trị: kết nối thương hiệu với thị trường, kết nối sản phẩm với hệ thống nhà thuốc, và kết nối giải pháp chăm sóc sức khỏe với người tiêu dùng một cách đúng đắn, bền vững và có trách nhiệm.</p>
${img(IMGS.s0[1])}
<h2>Mạng lưới đối tác</h2>
<p>VinaPharma phát triển mạng lưới hợp tác trên nền tảng của sự tin cậy, tính chọn lọc và định hướng đồng hành dài hạn. Đối tác của chúng tôi là các nhà thuốc lâu đời trải dài từ Nam ra Bắc, cùng những đơn vị và đội ngũ dược sĩ tận tâm đang trực tiếp góp phần đưa các giải pháp chăm sóc sức khỏe chất lượng đến gần hơn với người tiêu dùng.</p>
<p>Hiện nay, VinaPharma đã có mặt tại 24/34 tỉnh thành (sau sáp nhập), từng bước mở rộng độ phủ thị trường theo hướng bền vững và có chiều sâu. Chúng tôi coi mỗi mối quan hệ hợp tác không chỉ là một điểm phân phối, mà là một phần trong hệ sinh thái phát triển chung, nơi sự chuyên nghiệp, sự thấu hiểu thị trường và tinh thần đồng hành được đặt lên hàng đầu.</p>
<p>Với VinaPharma, mạng lưới đối tác không chỉ phản ánh quy mô hiện diện, mà còn thể hiện chất lượng của niềm tin mà chúng tôi đã và đang xây dựng trên thị trường.</p>
${img(IMGS.s0[2])}
<h2>Định vị thương hiệu</h2>
<p>VinaPharma được định vị là đối tác phân phối đáng tin cậy trong lĩnh vực chăm sóc sức khỏe, kết nối các thương hiệu chất lượng trong và ngoài nước với hệ thống nhà thuốc Việt Nam bằng năng lực chọn lọc sản phẩm, am hiểu thị trường và cam kết đồng hành dài hạn.</p>
<p>Chúng tôi theo đuổi hình ảnh của một doanh nghiệp phân phối chuyên nghiệp, minh bạch và có trách nhiệm — nơi mỗi sản phẩm được đưa ra thị trường không chỉ đáp ứng yêu cầu về chất lượng, mà còn phù hợp với nhu cầu thực tế của người tiêu dùng và giá trị tư vấn của nhà thuốc.</p>
<p>Tuyên bố định vị: <em>VinaPharma — Vì một Việt Nam khỏe đẹp.</em> Đây không chỉ là thông điệp thương hiệu, mà là định hướng xuyên suốt trong cách chúng tôi lựa chọn sản phẩm, phát triển đối tác và xây dựng giá trị bền vững cho cộng đồng.</p>
${img(IMGS.s0[3])}
<h2>Sứ mạng, tầm nhìn, giá trị cốt lõi</h2>
<p><strong>Sứ mạng:</strong> VinaPharma mang sứ mạng đưa những sản phẩm chăm sóc sức khỏe chất lượng, an toàn và phù hợp đến gần hơn với người Việt thông qua hệ thống phân phối chuyên nghiệp, minh bạch và bền vững.</p>
<p><strong>Tầm nhìn đến năm 2030:</strong> VinaPharma hướng tới trở thành một trong những doanh nghiệp phân phối sản phẩm chăm sóc sức khỏe uy tín tại Việt Nam, sở hữu mạng lưới đối tác nhà thuốc rộng khắp, danh mục thương hiệu chọn lọc chất lượng cao và năng lực đồng hành đủ mạnh để phát triển bền vững cùng thị trường.</p>
<p><strong>Giá trị cốt lõi:</strong></p>
<ul style="padding-left:1.4rem;color:#555;font-size:.9rem;line-height:1.9">
  <li><strong>Chính trực</strong> — đề cao sự minh bạch, trung thực và nhất quán trong mọi mối quan hệ hợp tác.</li>
  <li><strong>Chất lượng</strong> — ưu tiên những sản phẩm có nguồn gốc rõ ràng, tiêu chuẩn đáng tin cậy và giá trị sử dụng thực chất.</li>
  <li><strong>Chuyên nghiệp</strong> — theo đuổi cách làm việc bài bản, rõ ràng, hiệu quả và có trách nhiệm.</li>
  <li><strong>Đồng hành</strong> — tin vào sức mạnh của quan hệ hợp tác bền vững và giá trị lâu dài.</li>
  <li><strong>Tận tâm vì con người</strong> — mọi nỗ lực đều hướng tới lợi ích thiết thực hơn cho đối tác, khách hàng và cộng đồng.</li>
  <li><strong>Phát triển bền vững</strong> — lựa chọn tăng trưởng trên nền tảng chất lượng, trách nhiệm và giá trị dài hạn.</li>
</ul>
${img(IMGS.s0[4])}`,

  // ── 1. Đồng hành cùng sức khỏe Việt ──────────────────────────
  `<h2>Bối cảnh thị trường</h2>
<p>Nhu cầu chăm sóc sức khỏe tại Việt Nam đang dịch chuyển theo hướng chủ động, toàn diện và ngày càng chú trọng đến chất lượng. Người tiêu dùng không chỉ quan tâm đến hiệu quả sản phẩm, mà còn đặt ra yêu cầu cao hơn về nguồn gốc, độ an toàn, tiêu chuẩn sản xuất và giá trị sử dụng lâu dài.</p>
<p>Song song với đó, hệ thống nhà thuốc ngày nay không còn đơn thuần là điểm bán. Đây là nơi người tiêu dùng tìm kiếm sự tư vấn đáng tin cậy, những giải pháp phù hợp và sự an tâm trong từng lựa chọn chăm sóc sức khỏe. Điều này đòi hỏi doanh nghiệp phân phối phải có năng lực lựa chọn sản phẩm tốt hơn, phối hợp thị trường chặt chẽ hơn và đồng hành với đối tác một cách chuyên nghiệp hơn.</p>
<p>Trong bối cảnh ấy, VinaPharma xác định vai trò của mình không chỉ là đưa sản phẩm ra thị trường, mà là góp phần xây dựng một hệ sinh thái phân phối chất lượng, nơi thương hiệu tốt, nhà thuốc uy tín và nhu cầu thật của người tiêu dùng được kết nối đúng cách.</p>
${img(IMGS.s1[0])}
<h2>Vai trò của VinaPharma</h2>
<p>VinaPharma giữ vai trò là cầu nối giữa các thương hiệu chăm sóc sức khỏe uy tín trong và ngoài nước với hệ thống nhà thuốc Việt Nam. Chúng tôi lựa chọn phát triển theo hướng có chiều sâu, tập trung vào những nhóm sản phẩm phù hợp với nhu cầu thị trường, đồng thời bảo đảm sự rõ ràng trong chất lượng, nguồn gốc và định hướng phân phối.</p>
<p>Chúng tôi hiểu rằng trong lĩnh vực chăm sóc sức khỏe, giá trị của một doanh nghiệp không chỉ nằm ở danh mục sản phẩm, mà còn nằm ở cách sản phẩm được đưa ra thị trường. Vì vậy, VinaPharma chú trọng xây dựng một hệ thống phân phối có trách nhiệm, gắn với tính minh bạch trong hợp tác, sự chuyên nghiệp trong vận hành và khả năng đồng hành lâu dài cùng đối tác.</p>
<p>Thông qua cách tiếp cận đó, VinaPharma mong muốn góp phần giúp thị trường tiếp cận gần hơn với những giải pháp chăm sóc sức khỏe an toàn, đáng tin cậy và phù hợp hơn với người Việt.</p>
${img(IMGS.s1[1])}
<h2>Cách chúng tôi lựa chọn và phân phối</h2>
<p>Tại VinaPharma, việc lựa chọn sản phẩm luôn bắt đầu từ tiêu chí chất lượng. Chúng tôi ưu tiên hợp tác cùng các thương hiệu có uy tín, được sản xuất tại những nhà máy đạt nhiều chứng nhận quốc tế và có nền tảng phát triển rõ ràng tại các thị trường trong và ngoài nước.</p>
<p>Trên cơ sở đó, công ty xây dựng danh mục phân phối theo hướng chọn lọc, tập trung vào những sản phẩm có giá trị sử dụng thiết thực, phù hợp với xu hướng chăm sóc sức khỏe hiện đại và nhu cầu thực tế của người tiêu dùng Việt Nam. Chúng tôi không theo đuổi số lượng bằng mọi giá, mà để cao tính phù hợp, tính bền vững và khả năng phát triển lâu dài trong hệ thống nhà thuốc.</p>
<p>Ở khâu phân phối, VinaPharma chú trọng xây dựng mạng lưới đối tác có chiều sâu, lấy sự tin cậy và đồng hành làm nền tảng. Chúng tôi phối hợp cùng nhà thuốc và dược sĩ bằng cách làm việc rõ ràng, thông tin đầy đủ và định hướng hợp tác bền vững, nhằm bảo đảm mỗi sản phẩm khi đến tay thị trường đều được đặt trong một hệ giá trị đúng đắn.</p>
${img(IMGS.s1[2])}
<h2>Giá trị mang lại cho đối tác và thị trường</h2>
<p>Đối với đối tác thương hiệu, VinaPharma mang đến một nền tảng phân phối đáng tin cậy, giúp sản phẩm được tiếp cận thị trường qua một hệ thống nhà thuốc có chọn lọc, được xây dựng trên sự hiểu biết thực tế và mối quan hệ hợp tác lâu dài.</p>
<p>Đối với nhà thuốc, chúng tôi là đối tác đồng hành trong việc đưa ra những lựa chọn sản phẩm chất lượng, phù hợp với nhu cầu người tiêu dùng và giá trị tư vấn tại điểm bán. VinaPharma coi sự rõ ràng trong thông tin, sự ổn định trong hợp tác và tinh thần hỗ trợ thực chất là yếu tố quan trọng để tạo nên niềm tin bền vững.</p>
<p>Đối với thị trường và cộng đồng, VinaPharma hướng đến việc góp phần lan tỏa những giải pháp chăm sóc sức khỏe an toàn, thiết thực và phù hợp hơn, để mỗi lựa chọn chăm sóc sức khỏe hằng ngày của người Việt được xây dựng trên nền tảng tin cậy hơn.</p>
${img(IMGS.s1[3])}
<h2>Định hướng phát triển</h2>
<p>Trong chặng đường phía trước, VinaPharma tiếp tục theo đuổi định hướng phát triển dựa trên ba nền tảng: chất lượng chọn lọc, hệ thống phân phối đáng tin cậy và quan hệ hợp tác bền vững. Đây là cơ sở để công ty mở rộng quy mô một cách chắc chắn, đồng thời giữ vững giá trị cốt lõi trong mọi hoạt động.</p>
<p>Chúng tôi sẽ tiếp tục mở rộng độ phủ thị trường theo hướng hiệu quả, tăng cường chiều sâu hợp tác với nhà thuốc và lựa chọn thêm những thương hiệu có tiêu chuẩn phù hợp với nhu cầu chăm sóc sức khỏe ngày càng cao tại Việt Nam. Với VinaPharma, phát triển không chỉ là tăng trưởng về số lượng, mà là gia tăng tác động tích cực đối với đối tác, người tiêu dùng và cộng đồng.</p>
${img(IMGS.s1[4])}`,

  // ── 2. Các trụ cột hoạt động ──────────────────────────────────
  `<h2>Thực phẩm chức năng và sản phẩm bổ sung hỗ trợ sức khỏe</h2>
<p>Đây là một trong những trụ cột hoạt động quan trọng của VinaPharma, phản ánh định hướng đồng hành cùng nhu cầu chăm sóc sức khỏe chủ động ngày càng cao của người Việt. Chúng tôi tập trung phát triển những nhóm sản phẩm có giá trị sử dụng thiết thực, phù hợp với xu hướng phòng ngừa, hỗ trợ và nâng cao chất lượng sống trong đời sống hiện đại.</p>
<p>Danh mục được lựa chọn theo hướng chọn lọc, ưu tiên những thương hiệu uy tín trong và ngoài nước, có nền tảng chất lượng rõ ràng, nguồn gốc minh bạch và tiêu chuẩn sản xuất nghiêm ngặt. VinaPharma đặc biệt chú trọng đến tính phù hợp của sản phẩm chăm sóc với hệ thống phân phối và đặc thù của thị trường Việt Nam.</p>
<p>Thông qua trụ cột này, chúng tôi mong muốn mang đến cho hệ thống nhà thuốc và người tiêu dùng những giải pháp chăm sóc sức khỏe đáng tin cậy hơn, góp phần nâng cao sự chủ động trong việc chăm sóc bản thân và gia đình mỗi ngày.</p>
${img(IMGS.s2[0])}
<h2>Dược mỹ phẩm và giải pháp chăm sóc toàn diện</h2>
<p>Bên cạnh các sản phẩm hỗ trợ sức khỏe, VinaPharma phát triển trụ cột dược mỹ phẩm như một phần trong định hướng chăm sóc toàn diện, nơi vẻ đẹp và sức khỏe được nhìn nhận trong một mối liên kết bền vững. Chúng tôi tin rằng nhu cầu làm đẹp hiện đại không chỉ dừng ở tính thẩm mỹ, mà còn gắn với sự an toàn, sự lành tính và giá trị chăm sóc lâu dài.</p>
<p>VinaPharma ưu tiên hợp tác với những thương hiệu dược mỹ phẩm có uy tín, được phát triển trên nền tảng nghiên cứu và tiêu chuẩn sản xuất rõ ràng. Các sản phẩm trong danh mục được lựa chọn với định hướng phù hợp với nhu cầu thị trường, hỗ trợ nhà thuốc mở rộng thêm những giải pháp chăm sóc cá nhân có chất lượng và tính ứng dụng cao.</p>
<p>Thông qua trụ cột này, chúng tôi hướng đến việc góp phần đưa những lựa chọn chăm sóc sắc đẹp và chăm sóc cá nhân đáng tin cậy đến gần hơn với người tiêu dùng, đồng thời gia tăng giá trị cho hệ thống nhà thuốc trong bối cảnh nhu cầu thị trường ngày càng đa dạng.</p>
${img(IMGS.s2[1])}
<h2>Hệ thống phân phối và đồng hành cùng nhà thuốc</h2>
<p>Hệ thống phân phối là trụ cột tạo nên bản sắc riêng của VinaPharma trong hành trình phát triển. Chúng tôi không chỉ chú trọng sản phẩm, mà còn đặc biệt coi trọng cách sản phẩm được đưa đến thị trường thông qua một mạng lưới đối tác có chọn lọc, có chiều sâu và được xây dựng trên nền tảng tin.</p>
<p>VinaPharma hiện diện tại 24/34 tỉnh thành sau sáp nhập, hợp tác cùng các nhà thuốc lâu đời trải dài từ Nam ra Bắc và đồng hành với những đội ngũ dược sĩ tận tâm trong hoạt động tư vấn, giới thiệu và chăm sóc khách hàng tại điểm bán. Đây là nền tảng quan trọng giúp công ty bảo đảm tính ổn định trong phân phối và sự phù hợp trong triển khai thị trường.</p>
<p>Chúng tôi đã có mối quan hệ hợp tác, cùng phát triển với các đối tác tại: Cà Mau, An Giang, Cần Thơ, Vĩnh Long, Đồng Tháp, Thành phố Hồ Chí Minh, Tây Ninh, Đồng Nai, Lâm Đồng, Khánh Hòa, Đắk Lắk, Gia Lai, Quảng Ngãi, Đà Nẵng, Huế, Nghệ An, Thanh Hóa, Ninh Bình, Hưng Yên, Phú Thọ, Thủ đô Hà Nội, Quảng Ninh, Bắc Ninh và Hải Phòng.</p>
${img(IMGS.s2[2])}
<h2>Nguyên tắc phát triển các trụ cột hoạt động</h2>
<p>Mỗi trụ cột hoạt động của VinaPharma đều được phát triển trên cùng một nền tảng nguyên tắc: chọn lọc kỹ lưỡng, vận hành chuyên nghiệp và đồng hành bền vững. Đây là cơ sở để chúng tôi bảo đảm rằng sự mở rộng của doanh nghiệp luôn đi cùng với chất lượng và trách nhiệm.</p>
<p>Trong lựa chọn sản phẩm, VinaPharma ưu tiên giá trị sử dụng thực chất, nguồn gốc rõ ràng và khả năng phát triển dài hạn trên thị trường. Trong vận hành phân phối, chúng tôi đề cao sự minh bạch, tính nhất quán và hiệu quả trong phối hợp cùng đối tác. Trong hợp tác thị trường, chúng tôi tin vào sức mạnh của niềm tin và sự bền vững tạo nên nền tảng phát triển chung.</p>
<p>Nhờ đó, các trụ cột hoạt động của VinaPharma không phát triển rời rạc, mà được kết nối trong một hệ giá trị chung, cùng hướng đến mục tiêu mang lại nhiều giải pháp chăm sóc sức khỏe chất lượng hơn cho cộng đồng.</p>
${img(IMGS.s2[3])}
<h2>Định hướng mở rộng trong tương lai</h2>
<p>Trong giai đoạn tiếp theo, VinaPharma tiếp tục mở rộng các trụ cột hoạt động theo hướng có chọn lọc và phù hợp với xu thế phát triển của thị trường chăm sóc sức khỏe. Chúng tôi tập trung nâng cao chất lượng danh mục sản phẩm, mở rộng chiều sâu hợp tác với nhà thuốc và tăng cường năng lực phân phối trên nền tảng bền vững.</p>
<p>Định hướng này cho phép VinaPharma không chỉ gia tăng quy mô hiện diện, mà còn tiếp tục củng cố vai trò là đối tác phân phối đáng tin cậy trong lĩnh vực chăm sóc sức khỏe tại Việt Nam.</p>
${img(IMGS.s2[4])}`,

  // ── 3. Ban lãnh đạo ────────────────────────────────────────────
  `<h2>Chief Executive Officer</h2>
<p><strong>Ông Nguyễn Tấn Đạt – Giám đốc điều hành (CEO).</strong></p>
<p>Trong vai trò Chief Executive Officer, Ông Nguyễn Tấn Đạt giữ trọng trách dẫn dắt định hướng phát triển của VinaPharma trên nền tảng chuyên nghiệp, minh bạch và bền vững. Dưới sự điều hành của ông, công ty kiên định theo đuổi chiến lược xây dựng năng lực phân phối có chiều sâu, phát triển hệ thống đối tác đáng tin cậy và lựa chọn những giá trị chăm sóc sức khỏe phù hợp với nhu cầu thị trường Việt Nam.</p>
<p>Tại VinaPharma, vai trò của CEO không chỉ giới hạn trong việc hoạch định chiến lược kinh doanh, mà còn là người định hình tư duy phát triển dài hạn cho doanh nghiệp. Điều đó được thể hiện qua sự chú trọng vào chất lượng danh mục, tính nhất quán trong hợp tác và định hướng tạo dựng niềm tin bền vững với nhà thuốc, đối tác và cộng đồng.</p>
<p>Với tinh thần điều hành lấy trách nhiệm làm nền tảng, Ông Nguyễn Tấn Đạt cùng VinaPharma tiếp tục theo đuổi mục tiêu xây dựng một doanh nghiệp phân phối đáng tin cậy trong lĩnh vực chăm sóc sức khỏe, góp phần mang những giải pháp chất lượng đến gần hơn với người Việt.</p>
${img(IMGS.s3[0])}
<h2>Thông điệp từ CEO</h2>
<blockquote style="border-left:3px solid #cc1f1f;padding:.9rem 1.3rem;background:#fff5f5;border-radius:0 .6rem .6rem 0;margin:1rem 0;font-style:italic;color:#444;line-height:1.85">"Chúng tôi tin rằng giá trị bền vững trong lĩnh vực chăm sóc sức khỏe phải được xây dựng từ niềm tin. Niềm tin vào chất lượng sản phẩm, niềm tin trong hợp tác và niềm tin mà thị trường dành cho một doanh nghiệp luôn theo đuổi sự minh bạch, chuyên nghiệp và trách nhiệm. Tại VinaPharma, chúng tôi lựa chọn phát triển trên nền tảng của sự chọn lọc và đồng hành dài hạn. Mỗi bước đi của công ty đều hướng đến việc kết nối những giải pháp chăm sóc sức khỏe chất lượng với hệ thống nhà thuốc Việt Nam một cách đúng đắn, hiệu quả và bền vững hơn. Chúng tôi trân trọng sự tin tưởng của đối tác, của đội ngũ dược sĩ và của thị trường trong suốt hành trình phát triển. Đó cũng chính là động lực để VinaPharma tiếp tục nỗ lực, tiếp tục hoàn thiện và tiếp tục theo đuổi mục tiêu vì một Việt Nam khỏe đẹp hơn."</blockquote>
<p style="font-weight:700;color:#cc1f1f">Ông Nguyễn Tấn Đạt – Giám đốc điều hành</p>
${img(IMGS.s3[1])}
<h2>Vai trò lãnh đạo trong định hướng phát triển</h2>
<p>Dưới sự dẫn dắt của CEO, VinaPharma theo đuổi một mô hình phát triển có trọng tâm, trong đó chất lượng, tính bền vững và giá trị dài hạn luôn được đặt lên trước tốc độ mở rộng đơn thuần. Cách tiếp cận này giúp công ty duy trì sự nhất quán trong lựa chọn sản phẩm, trong xây dựng hệ thống phân phối và trong phát triển quan hệ hợp tác với thị trường.</p>
<p>Vai trò lãnh đạo tại VinaPharma được thể hiện qua việc giữ vững định hướng phát triển rõ ràng, điều phối các trụ cột hoạt động theo cùng một hệ giá trị và bảo đảm rằng mỗi quyết định kinh doanh đều gắn với uy tín thương hiệu. Đây là nền tảng để công ty tiếp tục mở rộng hiện diện mà vẫn giữ được bản sắc của một doanh nghiệp phân phối đáng tin cậy.</p>
<p>Thông qua định hướng lãnh đạo đó, VinaPharma không chỉ đạt mục tiêu tăng trưởng, mà còn hướng đến việc tạo ra tác động tích cực hơn cho đối tác, hệ thống nhà thuốc và cộng đồng.</p>
${img(IMGS.s3[2])}
<h2>Triết lý lãnh đạo</h2>
<p>Triết lý lãnh đạo tại VinaPharma được xây dựng trên ba nền tảng: chính trực trong hợp tác, kỷ luật trong vận hành và bền vững trong phát triển. Đây là những nguyên tắc xuyên suốt giúp công ty giữ vững sự rõ ràng trong định hướng và sự nhất quán trong hành động.</p>
<p>Trong một thị trường đòi hỏi ngày càng cao về chất lượng và trách nhiệm, VinaPharma lựa chọn cách phát triển chắc chắn, lấy niềm tin làm nền tảng thay vì theo đuổi những kết quả ngắn hạn. Từ việc chọn lựa thương hiệu, phát triển hệ thống đối tác cho đến triển khai thị trường, triết lý lãnh đạo luôn hướng đến giá trị thực và lợi ích lâu dài cho tất cả các bên đồng hành.</p>
<p>Chính sự nhất quán trong tư duy lãnh đạo đã góp phần định hình nên phong cách phát triển của VinaPharma: điềm tĩnh, chuẩn mực, chuyên nghiệp và có trách nhiệm với thị trường.</p>
${img(IMGS.s3[3])}
<h2>Định hướng trong giai đoạn tiếp theo</h2>
<p>Trong giai đoạn tiếp theo, Ban lãnh đạo VinaPharma tiếp tục tập trung vào việc củng cố chất lượng danh mục, mở rộng chiều sâu hợp tác với hệ thống nhà thuốc và nâng cao năng lực phân phối trên nền tảng bền vững. Đây là định hướng giúp công ty giữ vững bản sắc của một doanh nghiệp phát triển bằng sự chọn lọc, trách nhiệm và giá trị dài hạn.</p>
<p>Cùng với đó, VinaPharma sẽ tiếp tục hoàn thiện hơn nữa nền tảng vận hành, gia tăng hiệu quả phối hợp với đối tác và mở rộng tác động tích cực đến thị trường chăm sóc sức khỏe tại Việt Nam. Mục tiêu của chúng tôi không chỉ là tăng trưởng quy mô, mà là xây dựng một hành trình phát triển đủ vững để được tin cậy lâu dài.</p>
${img(IMGS.s3[4])}`,

  // ── 4. Con người VinaPharma ────────────────────────────────────
  `<h2>Con người là nền tảng phát triển</h2>
<p>Tại VinaPharma, chúng tôi xem con người là nền tảng cốt lõi trong mọi hoạt động phát triển. Trong lĩnh vực chăm sóc sức khỏe, nơi niềm tin đóng vai trò đặc biệt quan trọng, chất lượng của một doanh nghiệp không chỉ được thể hiện qua sản phẩm hay hệ thống phân phối, mà còn được thể hiện qua đội ngũ đứng phía sau từng quyết định, từng mối quan hệ hợp tác và từng giá trị mang ra thị trường.</p>
<p>Đội ngũ VinaPharma được xây dựng trên tinh thần làm việc nghiêm túc, tận tâm và có trách nhiệm. Chúng tôi đề cao sự chủ động, tính chuyên nghiệp và khả năng phối hợp chặt chẽ giữa các bộ phận để bảo đảm mọi hoạt động của công ty đều vận hành trên cùng một chuẩn mực.</p>
<p>Chính từ nền tảng con người đó, VinaPharma từng bước tạo dựng bản sắc của một doanh nghiệp phát triển bằng sự tin cậy, sự chuẩn mực và định hướng đồng hành dài hạn với đối tác.</p>
${img(IMGS.s4[0])}
<h2>Tinh thần làm việc tại VinaPharma</h2>
<p>Tinh thần làm việc tại VinaPharma được xây dựng trên ba yếu tố chính: chính trực trong cách hành xử, kỷ luật trong cách vận hành và tận tâm trong cách đồng hành cùng đối tác. Đây là những giá trị được duy trì xuyên suốt trong môi trường làm việc để mỗi thành viên VinaPharma đều tiếp cận từng nhiệm vụ mỗi ngày.</p>
<p>Chúng tôi tin rằng sự chuyên nghiệp không chỉ nằm ở kết quả cuối cùng, mà còn thể hiện trong cách lắng nghe, cách phối hợp, cách giữ cam kết và cách tạo dựng niềm tin trong từng tương tác. Vì vậy, mỗi thành viên của VinaPharma đều được kỳ vọng làm việc với thái độ rõ ràng, có trách nhiệm và hướng đến giá trị dài hạn.</p>
<p>Tinh thần đó giúp đội ngũ VinaPharma giữ sự nhất quán trong hành động, đồng thời tạo nên một môi trường làm việc có chiều sâu, nơi mỗi cá nhân đều góp phần vào chất lượng chung của doanh nghiệp.</p>
${img(IMGS.s4[1])}
<h2>Văn hóa đồng hành và trách nhiệm</h2>
<p>VinaPharma xây dựng văn hóa doanh nghiệp trên nền tảng đồng hành và trách nhiệm. Chúng tôi tin rằng một tập thể mạnh không chỉ được tạo nên từ năng lực chuyên môn, mà còn từ cách các cá nhân cùng chia sẻ mục tiêu chung, cùng giữ chuẩn mực chung và cùng chịu trách nhiệm với giá trị mà doanh nghiệp theo đuổi.</p>
<p>Trong nội bộ, văn hóa đồng hành giúp các bộ phận phối hợp chặt chẽ hơn, hỗ trợ nhau hiệu quả hơn và cùng hướng về một cách làm việc nhất quán. Trong quan hệ với đối tác, tinh thần trách nhiệm giúp đội ngũ VinaPharma luôn đặt sự rõ ràng, tính đáng tin cậy và sự bền vững lên hàng đầu.</p>
<p>Đó cũng là nền tảng để công ty duy trì chất lượng hợp tác, nâng cao hiệu quả vận hành và phát triển trên một hệ giá trị có chiều sâu, thay vì tăng trưởng theo hướng ngắn hạn và rời rạc.</p>
${img(IMGS.s4[2])}
<h2>Phát triển đội ngũ cùng sự phát triển của doanh nghiệp</h2>
<p>VinaPharma tin rằng sự phát triển của doanh nghiệp cần song hành với sự trưởng thành của đội ngũ. Vì vậy, chúng tôi chú trọng xây dựng một môi trường làm việc nơi mỗi cá nhân có thể nâng cao năng lực, mở rộng góc nhìn và phát triển cùng định hướng chung của công ty.</p>
<p>Chúng tôi đề cao tinh thần học hỏi, khả năng thích ứng với nhu cầu thị trường và sự chủ động trong công việc. Trong một lĩnh vực thay đổi liên tục như chăm sóc sức khỏe, việc phát triển đội ngũ không chỉ giúp nâng cao hiệu quả vận hành, mà còn tạo ra năng lực đồng hành tốt hơn với đối tác và thị trường.</p>
<p>Khi đội ngũ được phát triển đúng hướng, doanh nghiệp cũng có nền tảng để mở rộng bền vững. Đó là lý do VinaPharma luôn xem đầu tư vào con người là đầu tư vào giá trị dài hạn của chính mình.</p>
${img(IMGS.s4[3])}
<h2>Cùng nhau tạo nên giá trị cho thị trường và cộng đồng</h2>
<p>Tại VinaPharma, mỗi thành viên trong đội ngũ đều là một phần của hành trình mang những giải pháp chăm sóc sức khỏe chất lượng đến gần hơn với người Việt. Dù ở vị trí nào, mỗi cá nhân cũng đang góp phần tạo nên niềm tin cho đối tác, sự ổn định cho hệ thống phân phối và giá trị tích cực hơn cho thị trường.</p>
<p>Chúng tôi tin rằng tác động của doanh nghiệp không được tạo nên bởi vài thông điệp đẹp, mà được hình thành từ chất lượng làm việc mỗi ngày của cả một tập thể. Khi đội ngũ cùng chia sẻ một hệ giá trị chung, cùng làm việc với tinh thần trách nhiệm và cùng hướng về lợi ích dài hạn, doanh nghiệp mới có thể phát triển vững vàng và có ích thực sự cho cộng đồng.</p>
<p>Con người VinaPharma vì vậy không chỉ là nguồn lực vận hành, mà là cốt lõi tạo nên uy tín, bản sắc và tương lai phát triển của doanh nghiệp.</p>
${img(IMGS.s4[4])}`,

  // ── 5. Hành trình phát triển ───────────────────────────────────
  `<h2>Khởi đầu với định hướng rõ ràng</h2>
<p>VinaPharma được thành lập vào năm 2018 với mục tiêu xây dựng một doanh nghiệp hoạt động trong lĩnh vực phân phối sản phẩm chăm sóc sức khỏe theo định hướng chuyên nghiệp, minh bạch và bền vững. Ngay từ giai đoạn đầu, công ty đã lựa chọn con đường phát triển dựa trên chất lượng danh mục, uy tín hợp tác và khả năng đồng hành lâu dài cùng thị trường.</p>
<p>Thay vì mở rộng theo hướng dàn trải, VinaPharma tập trung đặt nền móng cho một hệ thống phát triển có chiều sâu. Điều đó được thể hiện qua việc lựa chọn những nhóm sản phẩm phù hợp với nhu cầu thực tế, xây dựng quan hệ hợp tác có chọn lọc và duy trì phong cách vận hành nhất quán ngay từ những bước đi đầu tiên trên thị trường Việt Nam.</p>
<p>Chính định hướng rõ ràng từ đầu đã tạo nên nền tảng để VinaPharma phát triển ổn định, từng bước mở rộng hiện diện và giữ được bản sắc của một doanh nghiệp chú trọng giá trị dài hạn.</p>
${img(IMGS.s5[0])}
<h2>Từng bước mở rộng năng lực và hệ thống đối tác</h2>
<p>Trên nền tảng ban đầu, VinaPharma từng bước mở rộng danh mục hoạt động trong lĩnh vực thực phẩm chức năng, dược mỹ phẩm và các sản phẩm bổ sung hỗ trợ sức khỏe. Song song với đó, công ty chú trọng phát triển năng lực lựa chọn thương hiệu, tổ chức phân phối và xây dựng sự hiện diện phù hợp với đặc thù của thị trường Việt Nam.</p>
<p>Một trong những dấu ấn quan trọng trong hành trình phát triển của VinaPharma là việc hình thành và mở rộng mạng lưới đối tác nhà thuốc trải dài từ Nam ra Bắc. Đây không chỉ là sự gia tăng về độ phủ, mà còn là quá trình tích lũy niềm tin và thiết lập những mối quan hệ hợp tác có chất lượng, dựa trên sự thấu hiểu, tính ổn định và tinh thần đồng hành.</p>
<p>Thông qua quá trình đó, VinaPharma dần khẳng định được vai trò của mình như một doanh nghiệp phân phối đáng tin cậy, có khả năng kết nối những thương hiệu chất lượng với hệ thống nhà thuốc theo cách bền vững và có chiều sâu.</p>
${img(IMGS.s5[1])}
<h2>Củng cố nền tảng phát triển bền vững</h2>
<p>Cùng với sự mở rộng về hiện diện thị trường, VinaPharma liên tục củng cố các nền tảng vận hành để bảo đảm sự phát triển không chỉ được đo bằng quy mô, mà còn được bảo đảm bằng chất lượng. Công ty chú trọng giữ vững tính nhất quán trong lựa chọn sản phẩm, trong hợp tác với đối tác và trong cách triển khai hệ thống phân phối.</p>
<p>Sự phát triển bền vững của VinaPharma được xây dựng trên ba yếu tố: chọn lọc kỹ lưỡng, vận hành chuyên nghiệp và quan hệ hợp tác dài hạn. Nhờ đó, mỗi giai đoạn phát triển của công ty đều gắn liền với sự củng cố nội lực, thay vì chỉ tập trung vào mở rộng bề mặt hiện diện.</p>
<p>Đây cũng là cách VinaPharma định hình bản sắc thương hiệu của mình: phát triển chắc chắn, giữ chuẩn mực rõ ràng và tạo dựng niềm tin qua từng giai đoạn của hành trình.</p>
${img(IMGS.s5[2])}
<h2>Hành trình phát triển qua các năm</h2>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2018</strong> — VinaPharma chính thức được thành lập, đặt nền móng cho định hướng phát triển trong lĩnh vực phân phối sản phẩm chăm sóc sức khỏe.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2019</strong> — Từng bước xây dựng hệ thống đối tác và mở rộng hoạt động phân phối theo hướng chọn lọc, ổn định và phù hợp với nhu cầu thị trường.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2020</strong> — Phát triển thêm danh mục thực phẩm chức năng, dược mỹ phẩm và các sản phẩm bổ sung hỗ trợ sức khỏe từ các thương hiệu uy tín ngoài nước. Đầu tư, phát triển và nhập khẩu các sản phẩm, thiết bị y tế trong mùa dịch.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2021</strong> — Nhờ sự chuẩn bị và có được nguồn cung, dự trữ cần thiết. VinaPharma đã đồng hành cùng quý nhà thuốc vượt qua giai đoạn Covid-19 vô cùng khó khăn.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2022</strong> — Mở rộng hợp tác với các thương hiệu đến từ nhiều thị trường phát triển, đồng thời tăng cường năng lực lựa chọn và phân phối sản phẩm chất lượng.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2023</strong> — Gia tăng sự hiện diện trên thị trường, phát triển chiều sâu hệ thống đối tác và tiếp tục khẳng định vai trò doanh nghiệp đồng hành nhà thuốc Việt Nam.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2024</strong> — Tiếp tục nâng cao chất lượng hợp tác, mở rộng độ phủ và củng cố niềm tin với các đối tác, dược sĩ và hệ thống nhà thuốc trên toàn quốc.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2025</strong> — Hoàn thiện hơn nữa năng lực phân phối, phát triển danh mục theo hướng bền vững và gia tăng giá trị đồng hành cùng thị trường chăm sóc sức khỏe.</p>
<p style="margin-bottom:.5rem"><strong style="color:#cc1f1f">2026</strong> — VinaPharma hiện diện tại 24/34 tỉnh thành sau sáp nhập, tiếp tục khẳng định định hướng phát triển vì một Việt Nam khỏe đẹp.</p>
${img(IMGS.s5[3])}
<h2>Hướng đến chặng đường tiếp theo</h2>
<p>Bước sang giai đoạn tiếp theo, VinaPharma tiếp tục phát triển trên nền tảng những giá trị đã được xây dựng trong suốt hành trình vừa qua: chất lượng, uy tín, sự chọn lọc và tinh thần đồng hành dài hạn. Công ty sẽ tiếp tục mở rộng theo hướng phù hợp với nhu cầu thị trường, đồng thời giữ vững sự nhất quán trong định vị thương hiệu và chuẩn mực vận hành.</p>
<p>Hành trình phía trước của VinaPharma không chỉ là câu chuyện của tăng trưởng, mà là hành trình tiếp tục mở rộng tác động tích cực đối với đối tác, hệ thống nhà thuốc và cộng đồng. Với định hướng đó, mỗi bước phát triển tiếp theo sẽ tiếp tục được xây dựng trên nền tảng bền vững, có trách nhiệm và đáng tin cậy.</p>
${img(IMGS.s5[4])}`,

  // ── 6. VinaPharma qua những con số ────────────────────────────
  `<h2>Những chỉ số nổi bật</h2>
<table style="width:100%;border-collapse:collapse;font-size:.88rem;margin:1rem 0">
  <thead>
    <tr style="background:#cc1f1f;color:#fff">
      <th style="padding:.7rem 1rem;text-align:center;width:30%">Chỉ số</th>
      <th style="padding:.7rem 1rem;text-align:left">Ý nghĩa</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#fff5f5"><td style="padding:.65rem 1rem;text-align:center;font-weight:800;color:#cc1f1f;font-size:1.1rem">2018</td><td style="padding:.65rem 1rem;color:#444">Năm thành lập</td></tr>
    <tr style="background:#fff"><td style="padding:.65rem 1rem;text-align:center;font-weight:800;color:#cc1f1f;font-size:1.1rem">24/34</td><td style="padding:.65rem 1rem;color:#444">Tỉnh thành hiện diện sau sáp nhập</td></tr>
    <tr style="background:#fff5f5"><td style="padding:.65rem 1rem;text-align:center;font-weight:800;color:#cc1f1f;font-size:1.1rem">1100+</td><td style="padding:.65rem 1rem;color:#444">Đối tác đồng hành</td></tr>
    <tr style="background:#fff"><td style="padding:.65rem 1rem;text-align:center;font-weight:800;color:#cc1f1f;font-size:1.1rem">06+</td><td style="padding:.65rem 1rem;color:#444">Quốc gia xuất xứ thương hiệu trọng điểm</td></tr>
    <tr style="background:#fff5f5"><td style="padding:.65rem 1rem;text-align:center;font-weight:800;color:#cc1f1f;font-size:1.1rem">04</td><td style="padding:.65rem 1rem;color:#444">Nhóm ngành phân phối chính</td></tr>
    <tr style="background:#fff"><td style="padding:.65rem 1rem;text-align:center;font-weight:800;color:#cc1f1f;font-size:1.1rem">01</td><td style="padding:.65rem 1rem;color:#444">Định hướng thương hiệu xuyên suốt: Vì một Việt Nam khỏe đẹp</td></tr>
  </tbody>
</table>
${img(IMGS.s6[0])}
<h2>Hiện diện trên thị trường</h2>
<p>Từ năm 2018 đến nay, VinaPharma từng bước mở rộng hiện diện theo hướng ổn định và có chiều sâu. Việc có mặt tại 24/34 tỉnh thành sau sáp nhập không chỉ phản ánh độ phủ thị trường, mà còn cho thấy khả năng phát triển mạng lưới trên nền tảng chọn lọc và bền vững.</p>
<p>Sự hiện diện này được xây dựng thông qua hệ thống đối tác nhà thuốc trải dài từ Nam ra Bắc, cùng những mối quan hệ hợp tác được phát triển theo định hướng lâu dài. Với VinaPharma, quy mô hiện diện chỉ thực sự có ý nghĩa khi gắn liền với chất lượng hợp tác và niềm tin thị trường.</p>
<p>Các con số về hiện diện vì vậy không chỉ là dữ liệu tăng trưởng, mà còn là dấu hiệu cho thấy doanh nghiệp đang phát triển trên một nền tảng có chiều sâu và có khả năng đồng hành thực chất với đối tác.</p>
${img(IMGS.s6[1])}
<h2>Danh mục và xuất xứ thương hiệu</h2>
<p>VinaPharma hoạt động trong ba nhóm ngành phân phối chính gồm thực phẩm chức năng, dược mỹ phẩm và các sản phẩm bổ sung hỗ trợ sức khỏe. Đây là những nhóm ngành phản ánh định hướng phát triển gắn với nhu cầu chăm sóc sức khỏe chủ động và toàn diện của người Việt.</p>
<p>Bên cạnh đó, công ty hợp tác cùng các thương hiệu đến từ nhiều thị trường phát triển như Hoa Kỳ, Tây Ban Nha, Ba Lan, Hàn Quốc và Nhật Bản. Việc mở rộng nguồn thương hiệu theo hướng chọn lọc giúp VinaPharma duy trì được chất lượng danh mục, đồng thời mang đến cho thị trường những giải pháp đáng tin cậy và phù hợp hơn.</p>
<p>Những con số liên quan đến danh mục và xuất xứ thương hiệu không chỉ cho thấy phạm vi hợp tác của công ty, mà còn phản ánh cách VinaPharma xây dựng giá trị bằng sự lựa chọn có tiêu chuẩn và định hướng rõ ràng.</p>
${img(IMGS.s6[2])}
<h2>Năng lực hợp tác và kết nối thị trường</h2>
<p>Đằng sau mỗi con số của VinaPharma là một mạng lưới hợp tác được xây dựng bằng niềm tin, sự nhất quán và khả năng phối hợp thực tế với thị trường. Công ty phát triển cùng các nhà thuốc lâu đời, các đối tác uy tín và đội ngũ dược sĩ tận tâm, tạo nên nền tảng để sản phẩm được đưa đến đúng hệ thống phân phối, đúng nhu cầu và đúng giá trị sử dụng.</p>
<p>Năng lực kết nối thị trường của VinaPharma không nằm ở việc mở rộng theo chiều rộng đơn thuần, mà ở khả năng phát triển những mối quan hệ hợp tác có chất lượng. Đó là cơ sở để công ty duy trì sự ổn định trong hiện diện, sự phù hợp trong danh mục và sự bền vững trong tăng trưởng.</p>
<p>Với VinaPharma, mỗi chỉ số vì vậy không chỉ là kết quả, mà còn là biểu hiện của một hệ giá trị được tích lũy qua quá trình phát triển có định hướng.</p>
${img(IMGS.s6[3])}
<h2>Ý nghĩa đằng sau những con số</h2>
<p>Chúng tôi tin rằng những con số chỉ thực sự có giá trị khi phản ánh đúng bản chất phát triển của doanh nghiệp. Với VinaPharma, mỗi chỉ số không chỉ nói về quy mô, mà còn thể hiện cách công ty lựa chọn con đường phát triển: chắc chắn hơn, minh bạch hơn và có trách nhiệm hơn với thị trường.</p>
<p>Những con số về năm thành lập, độ phủ hiện diện, nhóm ngành hoạt động hay xuất xứ thương hiệu đều là phần tóm lược của một hành trình được xây dựng bằng nỗ lực bền bỉ và định hướng rõ ràng. Chúng không chỉ cho thấy công ty đã đi đến đâu, mà còn cho thấy công ty đang phát triển theo cách nào.</p>
<p>Trong giai đoạn tiếp theo, VinaPharma tiếp tục mở rộng trên nền tảng những giá trị đã được xây dựng và phản ánh qua các chỉ số hiện tại. Những con số trong tương lai của VinaPharma sẽ không chỉ lớn hơn về quy mô, mà còn mang nhiều ý nghĩa hơn về chất lượng, trách nhiệm và tác động tích cực đối với đối tác, nhà thuốc và cộng đồng.</p>
${img(IMGS.s6[4])}`,

  // ── 7. Những câu chuyện tạo tác động ──────────────────────────
  `<h2>Đồng hành cùng hệ thống nhà thuốc</h2>
<p>Một trong những tác động rõ nét nhất của VinaPharma được thể hiện qua hành trình đồng hành cùng hệ thống nhà thuốc trên toàn quốc. Chúng tôi tin rằng nhà thuốc không chỉ là điểm phân phối, mà còn là nơi hình thành niềm tin của người tiêu dùng trong từng lựa chọn chăm sóc sức khỏe.</p>
<p>Thông qua sự phối hợp với các nhà thuốc lâu đời, các đối tác uy tín và đội ngũ dược sĩ tận tâm, VinaPharma góp phần đưa những giải pháp chăm sóc sức khỏe chất lượng đến gần hơn với thị trường theo cách đúng đắn, ổn định và phù hợp với nhu cầu thực tế.</p>
<p>Mỗi mối quan hệ hợp tác được xây dựng không chỉ mang ý nghĩa thương mại, mà còn là một phần trong nỗ lực chung nhằm nâng cao chất lượng tư vấn, chất lượng tiếp cận sản phẩm và chất lượng phục vụ người tiêu dùng tại điểm bán.</p>
${img(IMGS.s7[0])}
<h2>Kết nối thương hiệu chất lượng với thị trường Việt Nam</h2>
<p>VinaPharma đóng vai trò là cầu nối giữa các thương hiệu uy tín trong và ngoài nước với hệ thống nhà thuốc Việt Nam. Tác động của sự kết nối này không chỉ nằm ở việc mở rộng danh mục sản phẩm trên thị trường, mà còn ở khả năng mang đến những lựa chọn chăm sóc sức khỏe an toàn, có nguồn gốc rõ ràng và đáng tin cậy cho người tiêu dùng Việt.</p>
<p>Chúng tôi lựa chọn hợp tác với các thương hiệu đến từ những thị trường phát triển như Hoa Kỳ, Tây Ban Nha, Ba Lan, Hàn Quốc và Nhật Bản, được sản xuất tại các nhà máy đạt nhiều chứng nhận quốc tế. Việc kết nối những giá trị đó với thị trường Việt Nam là một phần quan trọng trong định hướng phát triển dài hạn của công ty.</p>
<p>Thông qua quá trình này, VinaPharma góp phần thu hẹp khoảng cách giữa các tiêu chuẩn chất lượng quốc tế và nhu cầu chăm sóc sức khỏe trong nước, qua đó tạo thêm giá trị cho nhà thuốc, đối tác và cộng đồng.</p>
${img(IMGS.s7[1])}
<h2>Lan tỏa nhận thức về chăm sóc sức khỏe chủ động</h2>
<p>Bên cạnh hoạt động phân phối, VinaPharma hướng đến việc góp phần lan tỏa nhận thức về chăm sóc sức khỏe theo hướng chủ động, phù hợp với sự thay đổi trong nhu cầu sống khỏe và sống chất lượng của người Việt hiện đại.</p>
<p>Chúng tôi tin rằng giá trị của doanh nghiệp trong lĩnh vực chăm sóc sức khỏe không chỉ dừng lại ở việc mang sản phẩm ra thị trường, mà còn nằm ở việc đồng hành cùng đối tác và người tiêu dùng trong hành trình nâng cao hiểu biết, lựa chọn đúng đắn và xây dựng thói quen chăm sóc bản thân một cách bền vững.</p>
<p>Những câu chuyện về sản phẩm, về đối tác, về hệ thống nhà thuốc và về hành trình phát triển của doanh nghiệp vì vậy đều là những cách để VinaPharma lan tỏa nhiều hơn những giá trị tích cực đến thị trường.</p>
${img(IMGS.s7[2])}
<h2>Tác động từ những mối quan hệ bền vững</h2>
<p>VinaPharma tin rằng tác động tích cực lâu dài chỉ có thể được tạo nên từ những mối quan hệ bền vững. Đó là mối quan hệ giữa doanh nghiệp với đối tác thương hiệu, giữa hệ thống phân phối với nhà thuốc, và giữa những giá trị chăm sóc sức khỏe với người tiêu dùng.</p>
<p>Chính sự bền vững trong hợp tác giúp công ty không ngừng củng cố chất lượng vận hành, gia tăng niềm tin trên thị trường và tạo ra nền tảng để mỗi bước phát triển đều mang ý nghĩa rõ ràng hơn. Với VinaPharma, đây không chỉ là cách làm kinh doanh, mà còn là cách tạo dựng tác động một cách có trách nhiệm.</p>
<p>Nhờ những mối quan hệ được phát triển trên nền tảng uy tín và đồng hành dài hạn, VinaPharma từng bước mở rộng được giá trị của mình vượt ra ngoài phạm vi phân phối, trở thành một phần trong hệ sinh thái chăm sóc sức khỏe đáng tin cậy hơn tại Việt Nam.</p>
${img(IMGS.s7[3])}
<h2>Những câu chuyện sẽ tiếp tục được viết</h2>
<p>Hành trình tạo tác động của VinaPharma không dừng lại ở những gì đã đạt được. Trong chặng đường tiếp theo, công ty sẽ tiếp tục phát triển thêm nhiều câu chuyện mới gắn với chất lượng hợp tác, với sự đồng hành cùng hệ thống nhà thuốc và với những giá trị tích cực dành cho thị trường chăm sóc sức khỏe cộng đồng.</p>
<p>Mỗi bước phát triển mới, mỗi mối quan hệ hợp tác mới và mỗi dấu ấn mới trên thị trường đều sẽ là một phần tiếp theo trong câu chuyện của VinaPharma. Đó là câu chuyện về một doanh nghiệp kiên định với định hướng chọn lọc, chuyên nghiệp và bền vững, luôn hướng đến mục tiêu vì một Việt Nam khỏe đẹp hơn.</p>
${img(IMGS.s7[4])}`,
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');

  for (let i = 0; i < CONTENTS.length; i++) {
    await Settings.findOneAndUpdate(
      { key: `about-content-${i}` },
      { value: CONTENTS[i] },
      { upsert: true }
    );
    console.log(`✅ Saved about-content-${i}`);
  }

  await mongoose.disconnect();
  console.log('\n🎉 Done! 8 section đã được cập nhật nội dung từ PDF.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
