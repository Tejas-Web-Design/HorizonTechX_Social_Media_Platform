const BACKEND_URL = "https://socialconnect-backend-g784.onrender.com";
const API_URL = `${BACKEND_URL}/api`;


const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

// Logged in user
const payload = JSON.parse(atob(token.split(".")[1]));

const currentUserId = payload.id;


function renderUsers(users){

    const container = document.getElementById("usersList");

    container.innerHTML = "";

    if(users.length === 0){

        container.innerHTML = `

            <h3 style="text-align:center; margin-top:30px;">

                No users found.

            </h3>

        `;

        return;

    }

    users.forEach(user => {

        // Don't show yourself
        if(user.id === currentUserId){

            return;

        }

        container.innerHTML += `

            <div class="user-card">

                <img
    src="${
        user.profile_image
        ? `${BACKEND_URL}/uploads/${user.profile_image}`
        : "https://via.placeholder.com/80"
    }"
    class="user-avatar"
    onclick="openProfile(${user.id})"
    style="cursor:pointer"
>

                <div class="user-info">

                    <h3
    style="cursor:pointer"
    onclick="openProfile(${user.id})"
>

    ${user.username}

</h3>

                    <p>${user.bio || "No bio available"}</p>

                </div>

                <button
                    id="follow-btn-${user.id}"
                    onclick="toggleFollow(${user.id})"
                >

                    Follow

                </button>

            </div>

        `;

        loadFollowStatus(user.id);

    });

}

// ===========================
// Load All Users
// ===========================
async function loadUsers(){

    const response = await fetch(

        `${API_URL}/users`

    );

    const data = await response.json();

    renderUsers(data.users);

}

loadUsers();

// ===========================
// Load Follow Status
// ===========================

async function loadFollowStatus(userId) {

    const response = await fetch(

        `${API_URL}/follow/check/${userId}`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    const btn = document.getElementById(`follow-btn-${userId}`);

    if (!btn) return;

    if (data.following) {

        btn.innerHTML = "Following";

        btn.style.background = "#10b981";

    } else {

        btn.innerHTML = "Follow";

        btn.style.background = "#2563eb";

    }

}


// ===========================
// Follow / Unfollow
// ===========================

async function toggleFollow(userId) {

    const btn = document.getElementById(`follow-btn-${userId}`);

    if (btn.innerHTML === "Follow") {

        const response = await fetch(

            `${API_URL}/follow/${userId}`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (data.success) {

            btn.innerHTML = "Following";

            btn.style.background = "#10b981";

        } else {

            alert(data.message);

        }

    } else {

        const response = await fetch(

            `${API_URL}/follow/${userId}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        const data = await response.json();

        if (data.success) {

            btn.innerHTML = "Follow";

            btn.style.background = "#2563eb";

        } else {

            alert(data.message);

        }

    }

}

document
.getElementById("searchInput")
.addEventListener("input", async function () {

    const keyword = this.value.trim();

    const response = await fetch(

        `${API_URL}/users/search?keyword=${keyword}`

    );

    const data = await response.json();

    renderUsers(data.users);

});


function openProfile(userId){

    window.location.href =
    `user-profile.html?id=${userId}`;

}