const Follow = require("../models/followModel");

const followUser = (req, res) => {

    const followerId = req.user.id;

    const followingId = parseInt(req.params.userId);

    // Prevent following yourself
    if (followerId === followingId) {

        return res.status(400).json({

            success: false,
            message: "You cannot follow yourself"

        });

    }

    Follow.followUser(

        followerId,
        followingId,

        (err) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {

                    return res.status(400).json({

                        success: false,
                        message: "Already following this user"

                    });

                }

                return res.status(500).json({

                    success: false,
                    message: "Database error"

                });

            }

            res.json({

                success: true,
                message: "User followed successfully"

            });

        }

    );

};

const unfollowUser = (req, res) => {

    const followerId = req.user.id;

    const followingId = parseInt(req.params.userId);

    Follow.unfollowUser(followerId, followingId, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                message: "Follow record not found"

            });

        }

        res.json({

            success: true,
            message: "User unfollowed successfully"

        });

    });

};

const getFollowersCount = (req, res) => {

    const userId = req.params.userId;

    Follow.getFollowersCount(userId, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        res.json({

            success: true,
            totalFollowers: result[0].totalFollowers

        });

    });

};

const getFollowingCount = (req, res) => {

    const userId = req.params.userId;

    Follow.getFollowingCount(userId, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        res.json({

            success: true,
            totalFollowing: result[0].totalFollowing

        });

    });

};

const isFollowing = (req, res) => {

    const followerId = req.user.id;

    const followingId = req.params.userId;

    Follow.isFollowing(

        followerId,

        followingId,

        (err, result)=>{

            if(err){

                return res.status(500).json({

                    success:false,

                    message:"Database error"

                });

            }

            res.json({

                success:true,

                following:result.length > 0

            });

        }

    );

};

module.exports = {

    followUser,
    unfollowUser,
    getFollowersCount,
    getFollowingCount,
    isFollowing

};