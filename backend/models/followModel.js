const db = require("../config/db");

const followUser = (followerId, followingId, callback) => {

    const query = `
        INSERT INTO followers
        (follower_id, following_id)
        VALUES (?, ?)
    `;

    db.query(
        query,
        [followerId, followingId],
        callback
    );

};

const unfollowUser = (followerId, followingId, callback) => {

    const query = `
        DELETE FROM followers
        WHERE follower_id = ?
        AND following_id = ?
    `;

    db.query(
        query,
        [followerId, followingId],
        callback
    );

};

const getFollowersCount = (userId, callback) => {

    const query = `
        SELECT COUNT(*) AS totalFollowers
        FROM followers
        WHERE following_id = ?
    `;

    db.query(query, [userId], callback);

};

const getFollowingCount = (userId, callback) => {

    const query = `
        SELECT COUNT(*) AS totalFollowing
        FROM followers
        WHERE follower_id = ?
    `;

    db.query(query, [userId], callback);

};

const isFollowing = (followerId, followingId, callback) => {

    const query = `
        SELECT *
        FROM followers
        WHERE follower_id = ?
        AND following_id = ?
    `;

    db.query(
        query,
        [followerId, followingId],
        callback
    );

};



module.exports = {

    followUser,
    unfollowUser,
    getFollowersCount,
    getFollowingCount,
    isFollowing

};