const API_URL = "https://socialconnect-backend-g784.onrender.com/api";



const imageInput =
document.getElementById("profileImage");


const preview =
document.getElementById("previewImage");



const token =
localStorage.getItem("token");



if(!token){

    window.location.href="login.html";

}



const usernameInput =
document.getElementById("username");


const bioInput =
document.getElementById("bio");




// Image Preview

imageInput.addEventListener("change",()=>{


    const file =
    imageInput.files[0];


    if(file){


        preview.src =
        URL.createObjectURL(file);


    }


});




// Load Existing Profile

async function loadProfile(){


    try{


        const response =
        await fetch(
        `${API_URL}/api/users/profile`,
        {


            headers:{

                Authorization:
                `Bearer ${token}`

            }


        });



        const data =
        await response.json();



        if(data.success){


            usernameInput.value =
            data.user.username;



            bioInput.value =
            data.user.bio || "";



            if(data.user.profile_image){


                preview.src =
                `${API_URL}/uploads/${data.user.profile_image}`;


            }


        }


    }
    catch(error){

        console.log(error);

    }


}



loadProfile();





// Update Profile

document
.getElementById("editProfileForm")
.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



try{


// Update username and bio

const profileResponse =
await fetch(
`${API_URL}/api/users/profile`,
{


method:"PUT",


headers:{


"Content-Type":"application/json",


Authorization:
`Bearer ${token}`


},


body:JSON.stringify({

username:
usernameInput.value,


bio:
bioInput.value


})


});



const profileData =
await profileResponse.json();





// Upload image if selected

if(imageInput.files.length > 0){


    const formData =
    new FormData();



    formData.append(
        "profile_image",
        imageInput.files[0]
    );



    const imageResponse =
    await fetch(
    `${API_URL}/api/users/profile/image`,
    {


        method:"PUT",


        headers:{


            Authorization:
            `Bearer ${token}`


        },


        body:formData


    });



    const imageData =
    await imageResponse.json();



    console.log(imageData);


}




document.getElementById("message")
.innerHTML =
profileData.message;




if(profileData.success){


    setTimeout(()=>{


        window.location.href =
        "profile.html";


    },1000);


}



}
catch(error){


    console.log(error);


    document.getElementById("message")
    .innerHTML =
    "Update failed";


}



});