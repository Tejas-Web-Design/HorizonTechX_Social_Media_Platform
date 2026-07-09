 const Like = require("../models/likeModel");

const addLike = (req, res) => {

    const userId = req.user.id;

    const postId = req.params.postId;

    Like.addLike(userId, postId, (err) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {

                return res.json({

                    success: false,
                    message: "You already liked this post"

                });

            }

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        res.json({

            success: true,
            message: "Post liked successfully"

        });

    });

};

const removeLike = (req, res) => {

    const userId = req.user.id;

    const postId = req.params.postId;

    Like.removeLike(userId, postId, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Like not found"

            });

        }

        res.json({

            success: true,
            message: "Like removed successfully"

        });

    });

};

const getLikeCount = (req, res) => {

    const postId = req.params.postId;

    Like.getLikeCount(postId, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        res.json({

            success: true,
            totalLikes: result[0].totalLikes

        });

    });

};

module.exports = {

    addLike,
    removeLike,
    getLikeCount

};