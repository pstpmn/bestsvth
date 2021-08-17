const multer = require('multer');

const imageFilter = (req, file, cb) => {
    let extArray = file.originalname.split(".");
    if (extArray.length !== 2) {
        req.body.fileValidationError = 'ไฟล์ผิดปกติ โปรดตรวจสอบอีกครั้ง';
        return cb(null, false);
    }
    if (extArray[extArray.length - 1] === 'png' || extArray[extArray.length - 1] === 'jpg' || extArray[extArray.length - 1] === 'jpeg'
        || extArray[extArray.length - 1] === 'gif') {
        cb(null, true);

    } else {
        req.body.fileValidationError = 'ชนิดไฟล์ไม่ถูกต้อง';
        return cb(null, false);
    }
}
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'categoryImg') {
            cb(null, __basedir + "/src/public/img/category");
        } else {
            cb(null, __basedir + "/src/public/img/servers");
        }
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        cb(null, `${Date.now()}.${extArray[extArray.length - 1]}`);
    }
})


let uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;