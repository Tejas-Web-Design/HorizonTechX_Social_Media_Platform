const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

require("./config/db");

const userRoutes = require("./routes/userRoutes");

const authRoutes = require("./routes/authRoutes");

const postRoutes = require("./routes/postRoutes");

const likeRoutes = require("./routes/likeRoutes");

const commentRoutes =
require("./routes/commentRoutes");

const followRoutes = require("./routes/followRoutes");




dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);


app.use(
"/uploads",
express.static("uploads")
);


app.use("/api/posts", postRoutes);

app.use("/api/likes", likeRoutes);

app.use(
    "/api/comments",
    commentRoutes
);

app.use("/api/posts", postRoutes);
app.use("/api/follow", followRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🚀 Social Media Platform API is Running..."
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});