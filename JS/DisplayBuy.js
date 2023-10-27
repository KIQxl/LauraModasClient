const show_buy_modal = document.querySelector("#show-buy-modal");
const show_buy_form = document.querySelector("#show-buy-form");

async function DisplayBuy(id){
    show_buy_modal.showModal();

    const url = `${baseURL}/Buys/getBuy/${id}`
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
    show_buy_form.value.value = `R$ ${buy.value.toFixed(2)}`;
    show_buy_form.remainingValue.value = `R$ ${buy.remainingValue.toFixed(2)}`;
    show_buy_form.numberOfInstallments.value = buy.numberOfInstallments;
    show_buy_form.installmentValue.value = `R$ ${buy.installmentValue.toFixed(2)}`;
    show_buy_form.date.value = buy.date;
    show_buy_form.dateOfPayment.value = buy.dateOfPayment;
    show_buy_form.description.value = buy.description;
    show_buy_form.customer.value = buy.customerModel.name;
}

async function PayBuy(){
    const buyId = show_buy_form.id.value;

    const url = `${baseURL}/Buys/payBuy/${buyId}`
    const token = localStorage.getItem("token")
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts);

    if(res.status === 200){
        alert("Pagamento bem sucedido");
        window.location.href = "../Pages/Buys.html";
    }
    else {
        alert(`Ops! Houve um erro ${res.status}`)
    }
}

async function ParcelBuy(){

    const parcelBuyRequest = {
        Id: show_buy_form.id.value,
        NumberOfInstallments: show_buy_form.numberOfInstallments.value,
        DateOfPayment: show_buy_form.dateOfPayment.value
    }

    const url = `${baseURL}/Buys/parcelBuy`
    const token = localStorage.getItem("token")
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parcelBuyRequest)
    };

    const res = await fetch(url, opts);

    if(res.status === 200){
        alert("Parcelamento bem sucedido");
        window.location.href = "../Pages/Buys.html";
    }
    else {
        alert(`Ops! Houve um erro ${res.status}`)
    }
}

const btn_cancel_show_buy = document.querySelector("#btn-cancel-show-buy");

btn_cancel_show_buy.addEventListener("click", (e)=>{

    e.preventDefault();

    show_buy_modal.close();
})