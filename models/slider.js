const monoose = require("mongoose");

const { Schema } = monoose;

const Slidermodel = new Schema({
  image: {
    type: String,
  },
});

module.exports = monoose.model("slider", Slidermodel);
