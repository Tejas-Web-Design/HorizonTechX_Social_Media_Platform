const API_URL = "https://socialconnect-backend-g784.onrender.com/api";


const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}


const payload = JSON.parse(

    atob(token.split(".")[1])

);

const currentUserId = payload.id;

// ----------------------
// Navigation
// ----------------------

document
.getElementById("profileBtn")
.addEventListener("click", () => {

    window.location.href = "profile.html";

});

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "login.html";

});

const usersBtn = document.getElementById("usersBtn");

if(usersBtn){

    usersBtn.addEventListener("click",()=>{

        window.location.href="users.html";

    });

}

const captionInput = document.getElementById("caption");

const postBtn = document.getElementById("postBtn");

const charCount = document.getElementById("charCount");

captionInput.addEventListener("input",()=>{

    const length = captionInput.value.length;

    charCount.innerHTML = `${length} / 300`;

    postBtn.disabled = length === 0;

});


// ----------------------
// Load Posts
// ----------------------

async function loadPosts(){

    const response = await fetch(

        `${API_URL}/posts`

    );

    const data = await response.json();

const container = document.getElementById("postsContainer");

if(data.posts.length === 0){

    container.innerHTML = `

        <div class="empty-feed">

            No posts yet. Be the first to share something!

        </div>

    `;

    return;

}

container.innerHTML = `

    <h2>News Feed</h2>

`;

    data.posts.forEach(post=>{

        container.innerHTML += `

        <div class="post-card">
            <div class="post-header">

    <img

        src="${
            post.profile_image
            ? `${API_URL}/uploads/${post.profile_image}`
            : "https://via.placeholder.com/50"
        }"

        class="post-avatar"

        style="cursor:pointer"

        onclick="openProfile(${post.user_id})"

    >

    <div class="post-user-details">

        <h3

            style="cursor:pointer"

            onclick="openProfile(${post.user_id})"

        >

            ${post.username}

        </h3>

        <p class="post-user-bio">

            ${post.bio || "No bio available"}

        </p>

        <small>

            ${new Date(post.created_at).toLocaleString()}

        </small>

    </div>

</div>

            <p class="post-caption">

                ${post.caption}

            </p>
            ${post.user_id === currentUserId ? `

<div class="post-actions">

    <button
        class="edit-btn"
        onclick="editPost(${post.id}, \`${post.caption.replace(/`/g, "\\`")}\`)"
    >

        ✏️ Edit

    </button>

    <button
        class="delete-btn"
        onclick="deletePost(${post.id})"
    >

        🗑 Delete

    </button>

</div>

` : ""}

            <div class="post-actions">

                <button

                    onclick="toggleLike(${post.id})"

                >

                    ❤️ Like

                </button>

                <span id="likes-${post.id}">

                    0 Likes

                </span>

                <button

                    onclick="toggleComments(${post.id})"

                >

                    💬 Comment

                </button>

            </div>

            <div

                id="comments-${post.id}"

                class="comments-section"

                style="display:none;"

            >

                <div class="comment-input">

                    <input

                        type="text"

                        id="comment-input-${post.id}"

                        placeholder="Write a comment..."

                    >

                    <button

                        onclick="addComment(${post.id})"

                    >

                        Post

                    </button>

                </div>

                <div

                    id="comment-list-${post.id}"

                >

                </div>

            </div>

        </div>

        `;

        loadLikeCount(post.id);

    });

}

loadPosts();

// ----------------------
// Like Count
// ----------------------

async function loadLikeCount(postId){

    const response = await fetch(

        `${API_URL}/likes/count/${postId}`

    );

    const data = await response.json();

    const likeSpan = document.getElementById(

        `likes-${postId}`

    );

    if(likeSpan){

        likeSpan.innerHTML = `${data.totalLikes} Likes`;

    }

}

// ----------------------
// Create Post
// ----------------------

document
.getElementById("postBtn")
.addEventListener("click", async()=>{

    const caption = document

        .getElementById("caption")

        .value

        .trim();

    if(caption===""){

        alert("Write something first.");

        return;

    }
    postBtn.innerHTML = "Posting...";

postBtn.disabled = true;
    const response = await fetch(

        `${API_URL}/posts`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify({

                caption

            })

        }

    );

    const data = await response.json();

    if(data.success){

    captionInput.value = "";

    charCount.innerHTML = "0 / 300";

    postBtn.innerHTML = "Share Post";

    postBtn.disabled = true;

    loadPosts();

}

    else{

    postBtn.innerHTML = "Share Post";

    postBtn.disabled = false;

    alert(data.message);

}

});

// ----------------------
// Like / Unlike
// ----------------------

async function toggleLike(postId){

    const response = await fetch(

        `${API_URL}/likes/${postId}`,

        {

            method:"POST",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    if(response.ok){

        loadLikeCount(postId);

        return;

    }

    if(data.message==="You already liked this post"){

        await fetch(

            `${API_URL}/likes/${postId}`,

            {

                method:"DELETE",

                headers:{

                    Authorization:`Bearer ${token}`

                }

            }

        );

        loadLikeCount(postId);

    }

}
// ----------------------
// Add Comment
// ----------------------

async function addComment(postId){

    const input = document.getElementById(

        `comment-input-${postId}`

    );

    const comment = input.value.trim();

    if(comment === ""){

        alert("Please write a comment.");

        return;

    }

    const response = await fetch(

        `${API_URL}/comments/${postId}`,

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify({

                comment

            })

        }

    );

    const data = await response.json();

    if(data.success){

        input.value = "";

        loadComments(postId);

    }

}

// ----------------------
// Load Comments
// ----------------------

async function loadComments(postId){

    const response = await fetch(

        `${API_URL}/comments/${postId}`

    );

    const data = await response.json();

    const container = document.getElementById(

        `comment-list-${postId}`

    );

    container.innerHTML = "";

    if(data.comments.length === 0){

        container.innerHTML = `

            <p>No comments yet.</p>

        `;

        return;

    }

    data.comments.forEach(comment=>{

        container.innerHTML += `

            <div class="comment-card">

                <img

                    src="${
                        comment.profile_image
                        ? `${API_URL}/uploads/${comment.profile_image}`
                        : "https://via.placeholder.com/40"
                    }"

                    class="comment-avatar"

                    style="cursor:pointer"

                    onclick="openProfile(${comment.user_id})"

                >

                <div>

                    <strong

                        style="cursor:pointer"

                        onclick="openProfile(${comment.user_id})"

                    >

                        ${comment.username}

                    </strong>

                    <p>

                        ${comment.comment}

                    </p>

                    <small>

                        ${new Date(comment.created_at).toLocaleString()}

                    </small>

                </div>

            </div>

        `;

    });

}

// ----------------------
// Show / Hide Comments
// ----------------------

async function toggleComments(postId){

    const section = document.getElementById(

        `comments-${postId}`

    );

    if(section.style.display === "none"){

        section.style.display = "block";

        loadComments(postId);

    }

    else{

        section.style.display = "none";

    }

}

// ----------------------
// Open Public Profile
// ----------------------

function openProfile(userId){

    window.location.href =

    `user-profile.html?id=${userId}`;

}

async function deletePost(postId){

    const confirmDelete = confirm(

        "Are you sure you want to delete this post?"

    );

    if(!confirmDelete){

        return;

    }

    const response = await fetch(

        `${API_URL}/posts/${postId}`,

        {

            method:"DELETE",

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    if(data.success){

        loadPosts();

    }

    else{

        alert(data.message);

    }

}

async function editPost(postId, oldCaption){

    const newCaption = prompt(

        "Edit your post:",

        oldCaption

    );

    if(newCaption === null){

        return;

    }

    if(newCaption.trim() === ""){

        alert("Caption cannot be empty.");

        return;

    }

    const response = await fetch(

        `${API_URL}/posts/${postId}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json",

                Authorization:`Bearer ${token}`

            },

            body:JSON.stringify({

                caption:newCaption

            })

        }

    );

    const data = await response.json();

    if(data.success){

        loadPosts();

    }

    else{

        alert(data.message);

    }

}
// ===========================
// Search Posts
// ===========================

const searchInput = document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input", function(){

        const keyword = this.value.toLowerCase().trim();

        const cards = document.querySelectorAll(".post-card");

        cards.forEach(card=>{

            const text = card.textContent.toLowerCase();

            if(text.includes(keyword)){

                card.style.display = "";

            }

            else{

                card.style.display = "none";

            }

        });

    });

}