const table = document.querySelector("#buys");

GetBuys();

async function GetBuys(){

    const url = 'https://localhost:7191/v1/LauraModas/Buys'
    const token = localStorage.getItem("token")

    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts);

    const buys = await res.json();
    RenderBuys(buys)
}

function RenderBuys(buysList){
    table.textContent = "";

    buysList.forEach(buy => {

        let html =
            `<tr>
                <td>${buy.id}</td>
                <td>${buy.name}</td>
                <td>${buy.value},00</td>
                <td>${buy.customerModel.name}</td>
                <td data-id="${buy.id}">
                    <button class="btn-table" onclick=DisplayBuy(${buy.id})>
                        <i class="bi bi-search"></i>
                    </button>
                </td>
                <td data-id="${buy.id}">
                    <button class="btn-table" onclick="SetBuy(${buy.id})">
                    <i class="bi bi-gear-fill"></i>
                    </button>
                </td>
                <td data-id="${buy.id}">
                    <button class="btn-table" onclick="DeleteBuy(${buy.id})">
                    <i class="bi bi-x-square"></i>
                    </button>
                </td>
        </tr>`

    table.innerHTML += html   
    });
}

