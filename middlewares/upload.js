const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "./images");
  },
  filename: function (req, file, cd) {
    cd(null, Date.now() + " " + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
