const form_create_customer = document.querySelector("#customer-form");

function CreateCustomer(){

    const customer = DataCustomer(form_create_customer);

    SendCustomer(customer);
}

async function SendCustomer(customer){
    const url = `https://localhost:7191/v1/LauraModas/Customers/postCustomer`

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