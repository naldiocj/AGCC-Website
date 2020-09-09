const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const destPath = path.resolve(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "uploads"
);
let isvalid = true;
module.exports = {
  dest: destPath,

  fileFilter: (req, file, cb) => {
    const match = ["png", "jpeg", "jpg"];
    const mimetype = file.mimetype.split("/")[1];
    if (!match.includes(mimetype)) {
      isvalid = false;
      cb(new Error(`Type ${mimetype} invalid`));
    }
    cb(null, true);
  },
  storage: new multer.diskStorage({
    destination: (req, file, cb) => {
      if (isvalid) cb(null, destPath);
    },
    filename: (req, file, cb) => {
      // crypto.randomBytes(16, (err, hash) => {
      //   if (err) cb(err);
      //   // file.key = `${hash.toString("hex")}-${file.originalname}`;
      //   // cb(null, file.key);

      // });

      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
