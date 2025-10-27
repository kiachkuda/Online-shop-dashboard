const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, './public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({
    storage, limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    },
});

function multerErrorHandler(
  err,
  req,
  res,
  next
) {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    let message = '';

    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File too large. Max size is 1MB.';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files. Max 5 images allowed.';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = `Unexpected field: ${err.field}. Check your form-data key name.`;
        break;
       
      default:
        message = `Multer error: ${err.message}`;
    }

    return res.status(400).json({
      error: message,
    });
  } else if (err) {
    // Handle other errors
    return res.status(500).json({
     
      error: err.message || 'Unknown upload error',
    });
  }

  next();
}

module.exports = {  upload, multerErrorHandler };