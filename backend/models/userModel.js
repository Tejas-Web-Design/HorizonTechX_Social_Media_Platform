const db = require("../config/db");


const getAllUsers = (callback)=>{

    const query = "SELECT * FROM users";


    db.query(query,(err,result)=>{

        if(err){
            callback(err,null);
            return;
        }


        callback(null,result);

    });

};

const getUserById = (id, callback)=>{


    const query =
    `
    SELECT 
    id,
    username,
    email,
    bio,
    profile_image,
    created_at
    FROM users
    WHERE id=?
    `;


    db.query(
        query,
        [id],
        callback
    );


};

const updateUserProfile = (
    id,
    username,
    bio,
    callback
)=>{


    const query = 
    `
    UPDATE users
    SET username=?,
        bio=?
    WHERE id=?
    `;


    db.query(
        query,
        [
            username,
            bio,
            id
        ],
        callback
    );


};

const updateProfileImage = (
    id,
    image,
    callback
)=>{


    const query =

    `
    UPDATE users
    SET profile_image=?
    WHERE id=?
    `;


    db.query(

        query,

        [
            image,
            id
        ],

        callback

    );


};


const searchUsers = (keyword, callback) => {

    const query = `
        SELECT
            id,
            username,
            email,
            bio,
            profile_image
        FROM users
        WHERE username LIKE ?
        OR email LIKE ?
        ORDER BY username ASC
    `;

    const search = `%${keyword}%`;

    db.query(

        query,

        [search, search],

        callback

    );

};




module.exports = {

    getAllUsers,
    getUserById,
    updateUserProfile,
    updateProfileImage,
    searchUsers

};