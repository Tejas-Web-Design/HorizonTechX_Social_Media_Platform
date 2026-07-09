const express = require("express");

const router = express.Router();

const postController = require("../controllers/postController");

const auth = require("../middleware/authMiddleware");

router.post(

    "/",

    auth,

    postController.createPost

);

router.get(

    "/",

    postController.getAllPosts

);

router.get(
    "/count/:userId",
    postController.getPostCount
);

router.get(
    "/user/:userId",
    postController.getPostsByUser
);

router.delete(
    "/:id",
    auth,
    postController.deletePost
);

router.put(
    "/:id",
    auth,
    postController.updatePost
);

module.exports = router;