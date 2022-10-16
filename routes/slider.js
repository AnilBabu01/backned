const express = require("express");
const upload = require("../middlewares/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

const {
  addsliderImg,
  getsilder,
  deleteimg,
} = require("../controllers/sliderControler");

router.post(
  "/admin/slider",
  upload.array("silder"),
  isAuthenticatedUser,
  authorizeRoles("admin"),
  addsliderImg
);

router.get(
  "/admin/getslider",

  getsilder
);

router.delete(
  "/admin/deleteimg/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteimg
);

module.exports = router;
