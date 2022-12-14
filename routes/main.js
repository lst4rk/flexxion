const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/userProfile/:id", ensureAuth, postsController.getUserProfile);

router.put("/updateProfile", ensureAuth, postsController.updateProfile)
router.put("/editProfile", ensureAuth, postsController.editProfile)

router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/newWorkout", ensureAuth, postsController.getNewWorkout);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
