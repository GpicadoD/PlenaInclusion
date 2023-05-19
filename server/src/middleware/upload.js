import multer from "multer";

const imageFilter = (req, file, cb) => {
if (file.mimetype.startsWith("image")) {
    cb(null, true);
} else {
    cb("Please upload only images.", false);
}
};

var storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'resources/statict/assets/uploads');
},
filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
},
});

export const uploadFile = multer({ storage: storage, fileFilter: imageFilter });