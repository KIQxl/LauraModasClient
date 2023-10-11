const modal_set_customer = document.querySelector("#set-customer")
const btn_set_customer = document.querySelector("#btn-set-customer")
const set_customer_form = document.querySelector("#set-customer-form")
const close_set_customer_modal = document.querySelector("#btn-cancel-set-customer");

let setCustomerId;

btn_set_customer.addEventListener("click", async (e)=>{

    e.preventDefault();

    const settedCustomer = {
        Name: set_customer_form.setName.value,
        Phone: set_customer_form.setPhone.value
    };

    const url = `https://localhost:7191/v1/LauraModas/Customers/alterCustomer/${setCustomerId}`
    const token = localStorage.getItem("token")

    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios.put(url, settedCustomer, opts);

    if(res.status === 201){

        alert("Cliente alterado com sucesso!")
        window.location.href = "../Pages/Customers.html"
    } else {
        alert(`Houve um erro: ${res.data}`)
    }
})

async function SetCustomer(id){
    
    modal_set_customer.showModal();

    const url = `https://localhost:7191/v1/LauraModas/Customers/getCustomerById/${id}`
    const token = localStorage.getItem("token")

    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts)
    const customer = await res.json();

    set_customer_form.setName.value = customer.name;
    set_customer_form.setPhone.value = customer.phone;

    setCustomerId = id
}

close_set_customer_modal.addEventListener("click", (e)=>{

    e.preventDefault();
    modal_set_customer.close();
})
