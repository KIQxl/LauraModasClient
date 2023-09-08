const btn_menu = document.querySelector("#show-menu");
const menu = document.querySelector("#menu");

btn_menu.addEventListener("click", (e) => {
    
    e.preventDefault();
    
    menu.classList.toggle('ative');
});