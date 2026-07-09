
const BACKEND_URL = "https://socialconnect-backend-g784.onrender.com";
const API_URL = `${BACKEND_URL}/api`;


const token = localStorage.getItem("token");



if(!token){

    window.location.href="login.html";

}



const profileData =
document.getElementById("profileData");



async function loadProfile(){


    try{


        const response =
        await fetch(
        `${API_URL}/users/profile`,
        {

            method:"GET",

            headers:{

                "Authorization":
                `Bearer ${token}`

            }

        });



        const data =
        await response.json();



        if(data.success){


            const user = data.user;

            const profileImage = document.getElementById("profileImage");

profileImage.src =
user.profile_image
? `${BACKEND_URL}/uploads/${user.profile_image}`
: "https://via.placeholder.com/150";

profileData.innerHTML = `

<h3>${user.username}</h3>

<p>${user.email}</p>

<p>${user.bio || "No bio yet"}</p>

<p>

Joined:
${new Date(user.created_at).toDateString()}

</p>

`;

        
loadFollowers(data.user.id);

loadFollowing(data.user.id);

loadPostCount(user.id);

loadRecentPosts(user.id);

        }
        else{


            profileData.innerHTML =
            data.message;


        }



    }
    catch(error){


        console.log(error);

        profileData.innerHTML =
        "Server error";


    }
    

}



loadProfile();

async function loadPostCount(userId){

    const response = await fetch(

        `${API_URL}/posts/count/${userId}`

    );

    const data = await response.json();

    document.getElementById("postsCount").innerHTML =
    data.totalPosts;

}

// Logout

document
.getElementById("logoutBtn")
.addEventListener(
"click",
()=>{


    localStorage.removeItem("token");

    localStorage.removeItem("user");


    window.location.href="login.html";


});

// Edit Profile

document
.getElementById("editBtn")
.addEventListener(
"click",
()=>{

    window.location.href =
    "edit-profile.html";

});

async function loadFollowers(userId){

    const response = await fetch(

        `${API_URL}/follow/followers/${userId}`

    );

    const data = await response.json();

    document.getElementById("followersCount").innerHTML =
    data.totalFollowers;

}
async function loadFollowing(userId){

    const response = await fetch(

        `${API_URL}/follow/following/${userId}`

    );

    const data = await response.json();

    document.getElementById("followingCount").innerHTML =
    data.totalFollowing;

}


async function loadRecentPosts(userId){

    try{

        const response = await fetch(

            "${API_URL}/posts"

        );

        const data = await response.json();

        const recentPosts = document.getElementById("recentPosts");

        if(!data.success){

            recentPosts.innerHTML = "<p>Unable to load posts.</p>";

            return;

        }

        const myPosts = data.posts.filter(

            post => Number(post.user_id) === Number(userId)

        );

        if(myPosts.length === 0){

            recentPosts.innerHTML = `

                <p class="no-posts">

                    You haven't created any posts yet.

                </p>

            `;

            return;

        }

        recentPosts.innerHTML = "";

        myPosts.forEach(post=>{

            recentPosts.innerHTML += `

                <div class="profile-post-card">

                    <p class="post-caption">

                        ${post.caption}

                    </p>

                    <small>

                        ${new Date(post.created_at).toLocaleString()}

                    </small>

                </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

