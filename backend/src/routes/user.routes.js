const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");
const upload = require('../middleware/upload.middleware');

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/me", authenticate, userController.getMyProfile);
router.put('/me', authenticate, upload.single('avatar'), userController.updateMyProfile);

router.get("/search", userController.searchUsers);

router.get("/:id", userController.getPublicProfile);


module.exports = router;
