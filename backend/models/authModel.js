const db = require("../config/db");



const findUserByEmail = (email,callback)=>{


    const query =
    "SELECT * FROM users WHERE email=?";


    db.query(
        query,
        [email],
        callback
    );

};



const createUser = (
    username,
    email,
    password,
    callback
)=>{


    const query =
    `
    INSERT INTO users
    (username,email,password)
    VALUES (?,?,?)
    `;


    db.query(
        query,
        [
            username,
            email,
            password
        ],
        callback
    );


};



module.exports = {

    findUserByEmail,

    createUser

};