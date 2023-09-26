const table_init = document.querySelector("#customers");

GetCustomers();

async function GetCustomers(){

    const url = 'https://localhost:7191/v1/LauraModas/Customers'
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

    RenderCustomers(customersAsc)
}

function RenderCustomers(customersList){
    table_init.textContent = "";

    customersList.forEach(customer => {

        let html =
            `<tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.buys.length}</td>
                <td data-id="${customer.id}">
                    <button class="btn-table" onclick=DisplayInstallments(${customer.id})>
                        <i class="bi bi-search"></i>
                    </button>
                </td>
                <td data-id="${customer.id}">
                    <button class="btn-table" onclick="SetCustomer(${customer.id})">
                    <i class="bi bi-gear-fill"></i>
                    </button>
                </td>
                <td data-id="${customer.id}">
                    <button type="button" class="btn-table" onclick="DeleteCustomer(${customer.id})">
                    <i class="bi bi-x-square"></i>
                    </button>
                </td>
        </tr>`

    table_init.innerHTML += html   
    });
}

const input_search_customer = document.querySelector("#search-customer");

input_search_customer.addEventListener("input", async (e)=>{
    e.preventDefault();

    const data_from_input = {
        Name: input_search_customer.value
    }

    const url = `https://localhost:7191/v1/LauraModas/Customers/getCustomerByName`
    const token = localStorage.getItem("token")

    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data_from_input)
    };

    const res = await fetch(url, opts);
    const customers = await res.json();

    const customersAsc = customers.sort((a, b) => a.name.localeCompare(b.name));

    RenderCustomers(customersAsc)
});


