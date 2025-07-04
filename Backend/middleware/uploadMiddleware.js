import multer from 'multer';

// Set up storage configuration for multer
const storage = multer.diskStorage({    
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
    }
});
//fielter to accept only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml','image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};

const upload = multer({storage,fileFilter });

export default upload;
