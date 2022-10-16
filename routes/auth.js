const express = require("express");
const { body } = require("express-validator");
const upload = require("../middlewares/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/userControler");

router.post(
  "/regster",

  upload.single("avatar"),
  registerUser
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  loginUser
);

router.get("/logout", logout);

router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put(
  "/updateprofile",
  upload.single("avatar"),
  isAuthenticatedUser,
  updateProfile
);
router.get("/me", isAuthenticatedUser, getUserProfile);
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// router.get('/admin/user/:id',isAuthenticatedUser,authorizeRoles('admin'),getUserDetails)

module.exports = router;
