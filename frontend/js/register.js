const registerForm =
document.getElementById("registerForm");


registerForm.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();



    const username =
    document.getElementById("username").value;



    const email =
    document.getElementById("email").value;



    const password =
    document.getElementById("password").value;



    try{


        const response =
        await fetch(
        "http://localhost:5000/api/auth/register",
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },


            body:JSON.stringify({

                username,
                email,
                password

            })

        });



        const data =
        await response.json();



        const message =
        document.getElementById("message");



        if(data.success){


            message.innerHTML =
            "Registration successful ✅";


            setTimeout(()=>{

                window.location.href="login.html";

            },1500);


        }
        else{


            message.innerHTML =
            data.message;


        }



    }
    catch(error){


        console.log(error);


        document.getElementById("message")
        .innerHTML =
        "Server error";


    }


});