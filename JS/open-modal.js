const openModal = document.querySelector("#btn-add");
const modal = document.querySelector("#add-modal");
const closeModal = document.querySelector("#btn-cancel");


openModal.addEventListener("click", (e) => {
    e.preventDefault();

    modal.showModal();
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault();

    modal.close();
});