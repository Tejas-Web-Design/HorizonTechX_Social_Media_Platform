const Comment = require("../models/commentModel");

const addComment = (req, res) => {

    const userId = req.user.id;

    const postId = req.params.postId;

    const { comment } = req.body;

    if (!comment || comment.trim() === "") {

        return res.status(400).json({

            success: false,
            message: "Comment cannot be empty"

        });

    }

    Comment.addComment(

        userId,

        postId,

        comment,

        (err) => {

            if (err) {

                return res.status(500).json({

                    success: false,

                    message: "Database error"

                });

            }

            res.json({

                success: true,

                message: "Comment added successfully"

            });

        }

    );

};

const getCommentsByPost = (req, res) => {

    const postId = req.params.postId;

    Comment.getCommentsByPost(postId, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        res.json({

            success: true,
            comments: result

        });

    });

};

module.exports = {

    addComment,
    getCommentsByPost

};