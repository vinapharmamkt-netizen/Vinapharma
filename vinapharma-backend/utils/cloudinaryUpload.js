const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function createUpload(folder, sizeMB = 20) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `vinapharma/${folder}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    },
  });

  return multer({
    storage,
    limits: { fileSize: sizeMB * 1024 * 1024 },
  });
}

// Trả về URL Cloudinary (đã là https tuyệt đối)
function fileUrl(req, file) {
  return file.path;
}

module.exports = { createUpload, fileUrl };
