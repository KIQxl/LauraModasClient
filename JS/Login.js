const form_login = document.querySelector("#form-login");
const btn_login = document.querySelector("#btn-login");
const popup_erro = document.querySelector("#popup-error-login");
const close_modal_error_login = document.querySelector("#btn-close-modal");

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
        headers: {
            'Content-Type': 'application/json'
        },
    };

    axios.post(url, login, opts)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.user.userName);
            if(res.status === 200){
                window.location.href = "../Pages/Home.html"
            }      
        })
        .catch((error) => {

            const p_erro = document.querySelector("#error-message");

            p_erro.innerHTML = error.message

            popup_erro.showModal();
        });
}

close_modal_error_login.addEventListener("click", (e)=>{
    
    e.preventDefault();

    popup_erro.close();

    form_login.reset();
});