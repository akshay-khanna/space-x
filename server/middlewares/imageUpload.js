import multer from "multer";

const { BYTES_LIMIT } = process.env;
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/uploads/`);
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    let arrFileName = file.originalname.split(".");
    let ext = arrFileName.pop();
    cb(null, arrFileName.join(".") + "-" + datetimestamp + "." + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    let { mimetype } = file;
    if (
      mimetype !== "image/jpg" &&
      mimetype !== "image/png" &&
      mimetype !== "image/jpeg"
    ) {
      return callback(
        new Error("Only images are allowed with extension *.png *.jpg *.jpeg")
      );
    }
    callback(null, true);
  },
  limits: {
    fileSize: Number(BYTES_LIMIT) * 1000,
  },
});

export { upload };
