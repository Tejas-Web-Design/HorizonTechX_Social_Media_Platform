const User = require("../models/userModel");


// Get all users
const getUsers = (req,res)=>{


    User.getAllUsers((err,result)=>{


        if(err){

            return res.status(500).json({

                success:false,
                message:"Database error"

            });

        }



        res.json({

            success:true,
            users:result

        });


    });


};



// Get logged-in user profile
const getProfile = (req,res)=>{


    const userId = req.user.id;



    User.getUserById(
        userId,
        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:"Database error"

                });

            }



            if(result.length === 0){

                return res.status(404).json({

                    success:false,
                    message:"User not found"

                });

            }



            res.json({

                success:true,

                user:result[0]

            });


        }
    );


};

const getUserById = (req, res) => {

    const id = req.params.id;

    User.getUserById(id, (err, result) => {

        if(err){

            return res.status(500).json({

                success:false,
                message:"Database error"

            });

        }

        if(result.length === 0){

            return res.status(404).json({

                success:false,
                message:"User not found"

            });

        }

        res.json({

            success:true,

            user: result[0]

        });

    });

};
const updateProfile = (req,res)=>{


    const userId = req.user.id;


    const {
        username,
        bio
    } = req.body;



    if(!username){

        return res.status(400).json({

            success:false,
            message:"Username required"

        });

    }



    User.updateUserProfile(
        userId,
        username,
        bio,
        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:"Update failed"

                });

            }



            res.json({

                success:true,

                message:"Profile updated successfully"

            });



        }
    );



};

const uploadProfileImage = (req,res)=>{


    const userId = req.user.id;


    const imagePath =
    req.file.filename;



    User.updateProfileImage(

        userId,

        imagePath,

        (err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,

                    message:"Image upload failed"

                });

            }



            res.json({

                success:true,

                message:"Profile image updated",

                image:imagePath

            });


        }

    );


};

const searchUsers = (req, res) => {

    const keyword = req.query.keyword || "";

    User.searchUsers(keyword, (err, result) => {

        if (err) {

            return res.status(500).json({

                success: false,
                message: "Database error"

            });

        }

        res.json({

            success: true,
            users: result

        });

    });

};

module.exports = {

    getUsers,
    getProfile,
    getUserById,
    updateProfile,
    uploadProfileImage,
    searchUsers

};