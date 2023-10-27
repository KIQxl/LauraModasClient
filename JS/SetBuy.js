const modal_set_buy = document.querySelector("#set-buy-modal");
const form_set_buy = document.querySelector("#set-buy-form");
const btn_set_buy = document.querySelector("#btn-set-buy");
const close_set_buy_modal = document.querySelector("#btn-cancel-set-buy");

let setBuyId

async function SetBuy(id){
    
    modal_set_buy.showModal();

    const url = `${baseURL}/Buys/getBuy/${id}`
    const token = localStorage.getItem("token")

    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts)
    const buy = await res.json();

    form_set_buy.setName.value = buy.name;
    form_set_buy.setDescription.value = buy.description;
    form_set_buy.setDateOfPayment.value = buy.dateOfPayment;
    
    setBuyId = id
}

btn_set_buy.addEventListener("click", async (e)=>{
    e.preventDefault();

    const settedBuy = {
        Name: form_set_buy.setName.value,
        Description: form_set_buy.setDescription.value,
        DateOfPayment: form_set_buy.setDateOfPayment.value
    }

    const url = `${baseURL}/Buys/alterBuy/${setBuyId}`
    const token = localStorage.getItem("token")

    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios.put(url, settedBuy, opts);

    if(res.status === 201){

        alert("Compra alterada com sucesso!")
        window.location.href = "../Pages/Buys.html"
    } else {
        alert(`Houve um erro: ${res.data}`)
    }
});

close_set_buy_modal.addEventListener("click", (e)=>{

    e.preventDefault();
    modal_set_buy.close();
})
