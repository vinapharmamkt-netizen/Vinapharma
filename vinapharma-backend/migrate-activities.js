/**
 * migrate-activities.js
 * Chuyển bài 9-12 (index 8-11) từ about-sections sang activities-sections
 * Và copy nội dung about-content-8..11 → activities-content-0..3
 * Sau đó cắt about-sections xuống còn 8 bài đầu (index 0-7)
 */
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!MONGO_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

const settingsSchema = new mongoose.Schema({ key: String, value: mongoose.Schema.Types.Mixed }, { timestamps: true });
const Settings = mongoose.model('Settings', settingsSchema);

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // ── 1. Load about-sections ──
  const aboutSetting = await Settings.findOne({ key: 'about-sections' });
  if (!aboutSetting || !Array.isArray(aboutSetting.value)) {
    console.error('about-sections not found or not an array');
    process.exit(1);
  }
  const allSections = aboutSetting.value;
  console.log(`about-sections total: ${allSections.length}`);

  if (allSections.length < 9) {
    console.error('Less than 9 sections — nothing to migrate');
    process.exit(1);
  }

  // ── 2. Extract sections 8-11 → activities ──
  const keepSections  = allSections.slice(0, 8);
  const moveSections  = allSections.slice(8);   // indices 8,9,10,11,...

  // Fix hrefs to point to hoat-dong-chi-tiet.html
  const activitiesSections = moveSections.map(function(s, i) {
    return Object.assign({}, s, { href: 'hoat-dong-chi-tiet.html?id=' + i });
  });

  console.log(`Sections to keep in about:     ${keepSections.length}`);
  console.log(`Sections to move to activities: ${activitiesSections.length}`);
  activitiesSections.forEach(function(s, i) {
    console.log(`  activities[${i}]: "${s.title}"`);
  });

  // ── 3. Copy content: about-content-8..11 → activities-content-0..N ──
  for (let i = 0; i < moveSections.length; i++) {
    const srcKey = 'about-content-' + (8 + i);
    const dstKey = 'activities-content-' + i;
    const src = await Settings.findOne({ key: srcKey });
    if (src && src.value) {
      await Settings.findOneAndUpdate(
        { key: dstKey },
        { key: dstKey, value: src.value },
        { upsert: true, new: true }
      );
      console.log(`Copied ${srcKey} → ${dstKey}`);
    } else {
      console.log(`No content found for ${srcKey}, skipping`);
    }
  }

  // ── 4. Save activities-sections ──
  await Settings.findOneAndUpdate(
    { key: 'activities-sections' },
    { key: 'activities-sections', value: activitiesSections },
    { upsert: true, new: true }
  );
  console.log('Saved activities-sections');

  // ── 5. Update about-sections to only keep first 8 ──
  aboutSetting.value = keepSections;
  await aboutSetting.save();
  console.log('Updated about-sections → now has ' + keepSections.length + ' sections');

  // ── 6. (Optional) Delete old about-content-8..11 ──
  for (let i = 0; i < moveSections.length; i++) {
    const oldKey = 'about-content-' + (8 + i);
    await Settings.deleteOne({ key: oldKey });
    console.log('Deleted ' + oldKey);
  }

  console.log('\n✓ Migration complete!');
  await mongoose.disconnect();
}

run().catch(function(err) {
  console.error(err);
  process.exit(1);
});
