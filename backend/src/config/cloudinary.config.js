/* eslint-disable import/no-extraneous-dependencies */
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// setup configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// multer cloduinary setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'monitoring-evaluation-app',
  },
});

const uploadFile = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

const deleteFile = async (filename) => {
  try {
    const result = await cloudinary.uploader.destroy(filename, {
      resource_type: 'image', invalidate: true,
    });

    if (result.result === 'ok') {
      console.log('File deleted successfully.');
      return true;
    }

    console.log('Failed to delete file.');
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return error;
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};
