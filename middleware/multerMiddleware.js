import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //set the destination where uploaded files will be stored
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname;
        //set the file name to be the original name of the file
        cb(null, fileName);
    },
});

const upload = multer({ storage });

export default upload;
