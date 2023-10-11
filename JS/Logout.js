const btn_logout = document.querySelector("#btn-logout");

btn_logout.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "../Index.html"
});