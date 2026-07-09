const db = require("../config/db");

const createPost = (userId, caption, callback) => {

    const query = `
        INSERT INTO posts (user_id, caption)
        VALUES (?, ?)
    `;

    db.query(
        query,
        [userId, caption],
        callback
    );

};

const getAllPosts = (callback) => {

    const query = `
        SELECT
            posts.id,
            posts.caption,
            posts.image,
            posts.created_at,
            users.id AS user_id,
            users.username,
            users.profile_image,
            users.bio
        FROM posts
        INNER JOIN users
        ON posts.user_id = users.id
        ORDER BY posts.created_at DESC
    `;

    db.query(query, callback);

};

const getPostCount = (userId, callback) => {

    const query = `
        SELECT COUNT(*) AS totalPosts
        FROM posts
        WHERE user_id = ?
    `;

    db.query(query, [userId], callback);

};

const getPostsByUser = (userId, callback) => {

    const query = `
        SELECT
            posts.*,
            users.username,
            users.profile_image
        FROM posts
        INNER JOIN users
            ON posts.user_id = users.id
        WHERE posts.user_id = ?
        ORDER BY posts.created_at DESC
    `;

    db.query(query, [userId], callback);

};

const deletePost = (postId, userId, callback) => {

    const query = `
        DELETE FROM posts
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(
        query,
        [postId, userId],
        callback
    );

};

const updatePost = (postId, userId, caption, callback) => {

    const query = `
        UPDATE posts
        SET caption = ?
        WHERE id = ?
        AND user_id = ?
    `;

    db.query(
        query,
        [caption, postId, userId],
        callback
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