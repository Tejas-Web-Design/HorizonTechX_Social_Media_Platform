const express = require("express");

const router = express.Router();

const followController = require("../controllers/followController");

const auth = require("../middleware/authMiddleware");

router.post(

    "/:userId",

    auth,

    followController.followUser

);

router.delete(
    "/:userId",
    auth,
    followController.unfollowUser
);

router.get(
    "/followers/:userId",
    followController.getFollowersCount
);

router.get(
    "/following/:userId",
    followController.getFollowingCount
);

router.get(

    "/check/:userId",

    auth,

    followController.isFollowing

);
module.exports = router;