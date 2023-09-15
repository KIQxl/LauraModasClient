const form_login = document.querySelector("#form-login");
const btn_login = document.querySelector("#btn-login");

btn_login.addEventListener("click", (e)=> {
    e.preventDefault();

    login(form_login);
})

function login(form){
    const login = {
        Username : form.username.value,
        Password : form.password.value
    }
    
    const url = 'https://localhost:7191/v1/LauraModas/user/login'
    
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    };

    axios.post(url, login)
        .then((res) => {
            localStorage.setItem("token", res.data.token);

            if(res.status === 200){
                window.location.href = "../Pages/Home.html"
            }
        })
        .catch((error) => {
            console.log(error);
        });
}