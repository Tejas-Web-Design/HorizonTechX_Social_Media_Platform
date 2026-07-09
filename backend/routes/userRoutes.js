const express = require("express");

const router = express.Router();


const userController = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");


router.get("/", userController.getUsers);

router.get(
    "/profile",
    auth,
    userController.getProfile
);

router.get(

    "/search",

    userController.searchUsers

);

router.get(
    "/:id",
    userController.getUserById
);

router.put(
    "/profile",
    auth,
    userController.updateProfile
);

router.put(
"/profile/image",
auth,
upload.single("profile_image"),
userController.uploadProfileImage
);





module.exports = router;