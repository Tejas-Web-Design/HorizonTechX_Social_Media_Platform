const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/authModel");



const register = async (req,res)=>{

    try{

        const {
            username,
            email,
            password
        } = req.body;



        if(!username || !email || !password){

            return res.status(400).json({

                success:false,
                message:"All fields are required"

            });

        }



        // Check existing user

        User.findUserByEmail(email,(err,result)=>{


            if(err){

                return res.status(500).json({

                    success:false,
                    message:"Database error"

                });

            }



            if(result.length > 0){

                return res.status(400).json({

                    success:false,
                    message:"Email already exists"

                });

            }



        });



        // Hash password

        const hashedPassword = await bcrypt.hash(password,10);



        User.createUser(
            username,
            email,
            hashedPassword,
            (err,result)=>{


                if(err){

                    return res.status(500).json({

                        success:false,
                        message:"User registration failed"

                    });

                }



                res.status(201).json({

                    success:true,
                    message:"User registered successfully",
                    userId:result.insertId

                });


            }
        );



    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};

const login = async (req,res)=>{

    try{

        const {
            email,
            password
        } = req.body;


        if(!email || !password){

            return res.status(400).json({

                success:false,
                message:"Email and password required"

            });

        }


        User.findUserByEmail(email, async (err,result)=>{


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


            const user = result[0];


            const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


            if(!passwordMatch){

                return res.status(401).json({

                    success:false,
                    message:"Invalid password"

                });

            }



            const token = jwt.sign(

                {
                    id:user.id,
                    email:user.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:"1d"
                }

            );



            res.json({

                success:true,

                message:"Login successful",

                token,

                user:{
                    id:user.id,
                    username:user.username,
                    email:user.email
                }

            });


        });



    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};


module.exports = {

    register,
    login

};