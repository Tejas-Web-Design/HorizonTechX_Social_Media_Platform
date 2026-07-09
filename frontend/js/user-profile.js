const API_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

if(!token){

    window.location.href = "login.html";

}

const payload = JSON.parse(

    atob(token.split(".")[1])

);

const currentUserId = payload.id;

const params = new URLSearchParams(window.location.search);

const userId = params.get("id");

const followBtn = document.getElementById("followBtn");


async function loadUser(){

    const response = await fetch(

        `${API_URL}/users/${userId}`

    );

    const data = await response.json();

    if(!data.success){

        return;

    }

    

    const user = data.user;

    document.getElementById("profileImage").src =
user.profile_image
? `http://localhost:5000/uploads/${user.profile_image}`
: "https://via.placeholder.com/150";

document.getElementById("userProfile").innerHTML = `

    <h2>${user.username}</h2>

    <p>${user.email}</p>

    <p>${user.bio || "No bio available"}</p>

    <p>
        Joined:
        ${new Date(user.created_at).toDateString()}
    </p>

`;

    if(Number(userId) === currentUserId){

    followBtn.style.display = "none";

}
    loadPostCount(user.id);

    loadFollowers(user.id);

    loadFollowing(user.id);

    loadUserPosts(user.id);

    loadFollowStatus();

}


loadUser();

async function loadPostCount(userId){

    const response = await fetch(

        `${API_URL}/posts/count/${userId}`

    );

    const data = await response.json();

    document.getElementById("userPosts").innerHTML =
    data.totalPosts;

}

async function loadFollowers(userId){

    const response = await fetch(

        `${API_URL}/follow/followers/${userId}`

    );

    const data = await response.json();

    document.getElementById("userFollowers").innerHTML =
    data.totalFollowers;

}

async function loadFollowing(userId){

    const response = await fetch(

        `${API_URL}/follow/following/${userId}`

    );

    const data = await response.json();

    document.getElementById("userFollowing").innerHTML =
    data.totalFollowing;

}

async function loadUserPosts(userId){

    const response = await fetch(

        `${API_URL}/posts/user/${userId}`

    );

    const data = await response.json();

    const container = document.getElementById(

        "userPostsContainer"

    );

    container.innerHTML = "";

    if(data.posts.length === 0){

        container.innerHTML = `

            <p>No posts yet.</p>

        `;

        return;

    }

    data.posts.forEach(post=>{

        container.innerHTML += `

            <div class="post-card">

                <p>

                    ${post.caption}

                </p>

                <small>

                    ${new Date(post.created_at).toLocaleString()}

                </small>

            </div>

        `;

    });

}

async function loadFollowStatus(){

    const response = await fetch(

        `${API_URL}/follow/check/${userId}`,

        {

            headers:{

                Authorization:`Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    if(data.following){

        followBtn.innerHTML = "Following";

        followBtn.style.background = "#10b981";

    }

    else{

        followBtn.innerHTML = "Follow";

        followBtn.style.background = "#2563eb";

    }

}

followBtn.addEventListener(

    "click",

    async()=>{

        if(followBtn.innerHTML==="Follow"){

            await fetch(

                `${API_URL}/follow/${userId}`,

                {

                    method:"POST",

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

        }

        else{

            await fetch(

                `${API_URL}/follow/${userId}`,

                {

                    method:"DELETE",

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

        }

        loadFollowStatus();

        loadFollowers(userId);

    }

);