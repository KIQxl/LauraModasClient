const table = document.querySelector("#buys");

GetBuys();

async function GetBuys(){

    const url = 'https://localhost:7191/v1/LauraModas/buys'
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
                <td>${buy.description}</td>
                <td>${buy.customerModel.name}</td>
        </tr>`

    table.innerHTML += html   
    });
}

