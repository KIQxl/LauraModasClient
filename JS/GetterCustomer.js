const table = document.querySelector("#customers");

GetCustomers();

async function GetCustomers(){

    const url = 'https://localhost:7191/v1/LauraModas/customers'
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

    console.log(customers);

    RenderBuys(customers)
}

function RenderBuys(customersList){
    table.textContent = "";

    customersList.forEach(customer => {

        let html =
            `<tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.buys.length}</td>
                <td>${customer.installment.numberOfInstallments}</td>
                <td>${customer.installment.installmentValue.toFixed(2)}</td>
                <td>${customer.installment.remainingValue.toFixed(2)}</td>
        </tr>`

    table.innerHTML += html   
    });
}