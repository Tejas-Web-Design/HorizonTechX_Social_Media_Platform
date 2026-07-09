const db = require("../config/db");

const addLike = (userId, postId, callback) => {

    const query = `
        INSERT INTO likes (user_id, post_id)
        VALUES (?, ?)
    `;

    db.query(
        query,
        [userId, postId],
        callback
    );

};
const removeLike = (userId, postId, callback) => {

    const query = `
        DELETE FROM likes
        WHERE user_id = ?
        AND post_id = ?
    `;

    db.query(
        query,
        [userId, postId],
        callback
    );

};

const getLikeCount = (postId, callback) => {

    const query = `
        SELECT COUNT(*) AS totalLikes
        FROM likes
        WHERE post_id = ?
    `;

    db.query(query, [postId], callback);

};

module.exports = {

    addLike,
    removeLike,
    getLikeCount

};