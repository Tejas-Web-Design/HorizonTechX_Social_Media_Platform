const Post = require("../models/postModel");

const createPost = (req, res) => {

    const userId = req.user.id;

    const { caption } = req.body;

    if (!caption || caption.trim() === "") {

        return res.status(400).json({

            success: false,
            message: "Post caption is required"

        });

    }

    Post.createPost(

        userId,

        caption,

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({

                    success: false,
                    message: "Failed to create post"

                });

            }

            res.status(201).json({

                success: true,
                message: "Post created successfully"

            });

        }

    );

};


const getAllPosts = (req, res) => {

    Post.getAllPosts((err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Failed to fetch posts"

            });

        }

        res.json({

            success: true,
            posts: result

        });

    });

};

const getPostCount = (req, res) => {

    const userId = req.params.userId;

    Post.getPostCount(userId, (err, result) => {

        if(err){

            return res.status(500).json({

                success:false,
                message:"Database error"

            });

        }

        res.json({

            success:true,
            totalPosts: result[0].totalPosts

        });

    });

};

const getPostsByUser = (req, res) => {

    const userId = req.params.userId;

    Post.getPostsByUser(userId, (err, result) => {

        if(err){

            return res.status(500).json({

                success:false,
                message:"Database error"

            });

        }

        res.json({

            success:true,
            posts: result

        });

    });

};

const deletePost = (req, res) => {

    const postId = req.params.id;

    const userId = req.user.id;

    Post.deletePost(

        postId,
        userId,

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: "Database error"

                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,
                    message: "Post not found or unauthorized"

                });

            }

            res.json({

                success: true,
                message: "Post deleted successfully"

            });

        }

    );

};

const updatePost = (req, res) => {

    const postId = req.params.id;

    const userId = req.user.id;

    const { caption } = req.body;

    console.log("Post ID:", postId);
    console.log("User ID:", userId);
    console.log("Caption:", caption);

    if (!caption || caption.trim() === "") {

        return res.status(400).json({

            success: false,
            message: "Caption cannot be empty"

        });

    }

    Post.updatePost(

        postId,
        userId,
        caption,

        (err, result) => {

            if (err) {

                return res.status(500).json({

                    success: false,
                    message: "Database error"

                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,
                    message: "Post not found or unauthorized"

                });

            }

            res.json({

                success: true,
                message: "Post updated successfully"

            });

        }

    );

};

module.exports = {

    createPost,
    getAllPosts,
    getPostCount,
    getPostsByUser,
    deletePost,
    updatePost

};