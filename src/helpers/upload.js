const cloudinary = require('./cloudinary')
const path = require('path');
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage ({
  cloudinary:cloudinary,
  params : {
    folder: 'parabot',
    format: (req,file) => 'jpg',
    public_id: (req,file) => {
      const timeStamp = new Date().getTime()
      return `${timeStamp}`
    }
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000,
  },
  fileFilter: (req, file, cb) => {
    const allowExt = ['image/jpg', 'image/png', 'image/jpeg'];
    if (allowExt.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error('Extension not supported');
      cb(err, false);
    }
  },
});

module.exports = upload;