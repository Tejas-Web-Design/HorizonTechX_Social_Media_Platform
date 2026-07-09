const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const commentController = require("../controllers/commentController");

router.post(

    "/:postId",

    auth,

    commentController.addComment

);

router.get(

    "/:postId",

    commentController.getCommentsByPost

);

module.exports = router;