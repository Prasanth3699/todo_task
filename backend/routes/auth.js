const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
// router.post("/google-login", authController.googleLogin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // On success, the req.user object will contain both the user and the token
    res.json({ token: req.user.token });
    res.redirect("/dashboard"); //want to add dashboard
  }
);

module.exports = router;
