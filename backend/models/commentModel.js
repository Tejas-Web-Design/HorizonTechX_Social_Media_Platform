const db = require("../config/db");

const addComment = (userId, postId, comment, callback) => {

    const query = `
        INSERT INTO comments
        (user_id, post_id, comment)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [userId, postId, comment],
        callback
    );

};

const getCommentsByPost = (postId, callback) => {

    const query = `
        SELECT
            comments.id,
            comments.comment,
            comments.created_at,
            comments.user_id,
            users.username,
            users.profile_image
        FROM comments
        INNER JOIN users
            ON comments.user_id = users.id
        WHERE comments.post_id = ?
        ORDER BY comments.created_at ASC
    `;

    db.query(query, [postId], callback);

};

module.exports = {

    addComment,
    getCommentsByPost

};