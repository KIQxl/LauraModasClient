const show_buy_modal = document.querySelector("#show-buy-modal");
const show_buy_form = document.querySelector("#show-buy-form");

async function DisplayBuy(id){
    show_buy_modal.showModal();

    const url = `https://localhost:7191/v1/LauraModas/Buys/getBuy/${id}`
    const token = localStorage.getItem("token")

    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts);
    const buy = await res.json();

    show_buy_form.id.value = buy.id;
    show_buy_form.nameProduct.value = buy.name;
    show_buy_form.value.value = buy.value;
    show_buy_form.date.value = buy.date;
    show_buy_form.description.value = buy.description;
    show_buy_form.customer.value = buy.customerModel.name;

}