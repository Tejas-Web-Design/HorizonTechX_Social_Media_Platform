const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const likeController = require("../controllers/likeController");

router.post(

    "/:postId",

    auth,

    likeController.addLike

);

router.delete(

    "/:postId",

    auth,

    likeController.removeLike

);

router.get(

    "/count/:postId",

    likeController.getLikeCount

);

module.exports = router;