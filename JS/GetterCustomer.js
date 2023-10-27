const table_init = document.querySelector("#customers");

GetCustomers();

async function GetCustomers(){

    const url = `${baseURL}/Customers`
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
                <td data-id="${customer.id}">
                    <button class="btn-table" onclick=DisplayInstallments(${customer.id})>
                        <i class="bi bi-search"></i>
                    </button>
                </td>
                <td data-id="${customer.id}">
                    <button class="btn-table" onclick="SetCustomer(${customer.id})">
                    <i class="bi bi-person-fill-gear"></i>
                    </button>
                </td>
                <td data-id="${customer.id}">
                    <button type="button" class="btn-table" ondblclick="DeleteCustomer(${customer.id})">
                    <i class="bi bi-person-dash-fill"></i>
                    </button>
                </td>
                <td></td>
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

    const url = `${baseURL}/Customers/getCustomerByName`
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


