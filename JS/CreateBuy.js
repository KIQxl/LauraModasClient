const form_create_buy = document.querySelector("#buy-form");
const select_customer = document.querySelector("#select-customer");

function CreateBuy(){

    CustomersSelect();

    const buy = DataBuy(form_create_buy);

    SendBuy(buy);
}

function DataBuy(form){

    const buy = {
        Name : form.Name.value,
        Value : form.Value.value,
        Description : form.Description.value,
        CustomerModelId : form.CustomerModelId.value
    };

    return buy;
}

async function SendBuy(buy){

    const url = `https://localhost:7191/v1/LauraModas/Buys/postBuy`
    const token = localStorage.getItem("token")
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(buy)
    };

    const res = await fetch(url, opts);

    if(res.status == 201){
        alert("Compra cadastrada")
        window.location.href = "../Pages/Buys.html"
    }
    else {
        alert(`Ops! Houve um erro. -- código do erro: ${res.status}`)
    }
}


async function CustomersSelect(){
    const url = `https://localhost:7191/v1/LauraModas/Customers`
    const token = localStorage.getItem("token")

    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts);
    const customers = await res.json();
    const customersAsc = customers.sort((a, b) => a.name.localeCompare(b.name));
   
    select_customer.textContent = ''

     customersAsc.forEach(customer => {

        let html = `<option value="${customer.id}">${customer.name}</option>`

        select_customer.innerHTML += html;
     })
}