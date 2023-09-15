const multer = require("multer");
const { ApiError } = require("../utils/utiles");

const multerOptions = () => {
  const storage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("onley image alllowed", 400));
    }
  };
  const upload = multer({ storage, fileFilter: multerFilter });
  return upload;
};

const uploadSingleImage = (fildName) => multerOptions().single(fildName);
module.exports = uploadSingleImage;
