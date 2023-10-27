const form_create_customer = document.querySelector("#customer-form");
const btn_add_customer = document.querySelector("#btn-add-customer");
const btn_add_customer_modal = document.querySelector("#btn-add-customer-modal")
const add_customer_modal = document.querySelector("#add-customer-modal")
const closeModal = document.querySelector("#btn-cancel");

btn_add_customer_modal.addEventListener("click", (e)=>{
    e.preventDefault();

    add_customer_modal.showModal();
})

closeModal.addEventListener("click", (e) => {
    e.preventDefault();

    add_customer_modal.close();
});

btn_add_customer.addEventListener("click", (e)=>{

    e.preventDefault();
    const customer = DataCustomer(form_create_customer);

    SendCustomer(customer);
})

async function SendCustomer(customer){
    const url = `${baseURL}/Customers/postCustomer`

    const token = localStorage.getItem("token")
    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios.post(url, customer, opts);

    if(res.status === 201){

        alert("Usuário Cadastrado com Sucesso")

        window.location.href = "../Pages/Customers.html"
    }
    else {
        alert(`Ops! Houve um erro ${res.message}`)
    }
}

function DataCustomer(form){

    const customer = {
        Name : form.Name.value,
        Phone : form.Phone.value
    };
    
    return customer;
}