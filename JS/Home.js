const userName = document.querySelector("#userName");
const reports = document.querySelector("#reports")
const totalValueTh = document.querySelector("#totalValue");

userName.innerHTML = localStorage.getItem("user")

// exibir/fechar modal

const reports_modal = document.querySelector("#reports-modal")

function ShowReports(){
    
    reports_modal.showModal();
}

const search_form = document.querySelector("#search-form")
const btn_search_by_data_range = document.querySelector("#btn-search-by-data-range")

btn_search_by_data_range.addEventListener("click", async (e)=>{
    e.preventDefault();

    const dateRange = {
        InitialDate: search_form.initialDate.value,
        FinalDate: search_form.finalDate.value
    }

    const url = `https://localhost:7191/v1/LauraModas/Buys/getBuyByDateRange`
    const token = localStorage.getItem("token")
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dateRange)
    };

    const res = await fetch(url, opts);
    const buys = await res.json();

    if(buys.length != 0){

        reports.innerHTML = '';
        totalValueTh.innerHTML = '';

        let totalValue = 0;

        buys.forEach(buy => {
            const html = `<tr>
                            <th>${buy.customerModel.name}</th>
                            <th>${buy.name}</th>
                            <th>${buy.dateOfPayment}</th>
                            <th>${buy.remainingValue.toFixed(2)}</th>
            </tr>`

            reports.innerHTML += html;

            totalValue += buy.remainingValue;
        });

        totalValueTh.innerHTML += totalValue.toFixed(2);
    }
    else {
        reports.innerHTML = 'Nenhuma compra dentro dessas datas';
        totalValueTh = '0';
    }
})

const btn_clear_table = document.querySelector("#btn-clear-table")

btn_clear_table.addEventListener("click", (e) =>{
    e.preventDefault();

    reports.innerHTML = '';
    totalValueTh.innerHTML = '';

    reports_modal.close();
})
