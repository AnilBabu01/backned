// slider for admin
const Slider = require("../models/slider");
const fs = require("fs");
exports.addsliderImg = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(files);

    const url = req.protocol + "://" + req.get("host");

    const silder = await Slider.create({
      image: url + "/images/" + req.files[0].filename,
    });

    res.status(200).json({
      success: true,
      silder: silder,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getsilder = async (req, res) => {
  try {
    const silderimg = await Slider.find();

    if (!silderimg) {
      res.status(404).json({
        sataus: false,
        msg: "no found",
      });
    }

    res.status(200).json({
      sataus: true,
      images: silderimg,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteimg = async (req, res) => {
  try {
    const img = await Slider.findById(req.params.id);
    if (!img) {
      res.status(404).json({ sataus: false, msg: "img not found" });
    }
    if (img) {
      var str = img.image.substring(22);
      fs.unlinkSync(str);
      console.log("successfully deleted /tmp/hello", str);
    }
    console.log(img.image);
    img.remove();
    res.status(200).json({ sataus: true, msg: "img deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
