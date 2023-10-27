const userName = document.querySelector("#userName");
const reports = document.querySelector("#reports")
const records = document.querySelector("#records")
const control_products = document.querySelector("#control-products")
const totalValueTh = document.querySelector("#totalValue");
const search_form_reports = document.querySelector("#search-form-reports") 
const search_form_records = document.querySelector("#search-form-records") 
const btn_search_by_data_range_reports = document.querySelector("#btn-search-by-data-range-reports")
const span_reports = document.querySelector("#empty-reports")
const span_records = document.querySelector("#empty-records")

userName.innerHTML = localStorage.getItem("user")

// exibir modal

const reports_modal = document.querySelector("#reports-modal");
const records_modal = document.querySelector("#records-modal");
const productControl_modal = document.querySelector("#product-control-modal")
function ShowReports(){
    
    reports_modal.showModal();

    span_reports.innerHTML = '';
    
}

async function ShowRecords(){

    records_modal.showModal();

    records.innerHTML = '';
    span_records.innerHTML = '';

    const url = `${baseURL}/BuyLogs/getLogs`
    const token = localStorage.getItem("token")
    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    const res = await fetch(url, opts);
    const logs = await res.json();

    logs.forEach(log => {
        
        const html = `
        <tr>
        <th>${log.customerName}</th>
        <th>${log.customerId}</th>
        <th>${log.paymentValue.toFixed(2)}</th>
        <th>${log.dateOfPayment}</th>
        <th>${log.nameOfProduct}</th>
      </tr>
    `

    records.innerHTML += html;
    });
}

async function ShowProductControl(){
    productControl_modal.showModal();

    const url = `${baseURL}/Lots/getLots`
    const token = localStorage.getItem("token")
    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await fetch(url, opts);
    const lots = await res.json();

    lots.forEach(lot => {
        const html = `<tr>
                        <th>${lot.id}</th>
                        <th>${lot.category}</th>
                        <th>${lot.quantity}</th>
                        <th>${lot.value}</th>
                        <th>${lot.amountValue}</th>
                        <th>${lot.date}</th>
        </tr>`

        control_products.innerHTML += html;
    });
}

// Relatórios --------------------------------------------------

btn_search_by_data_range_reports.addEventListener("click", async (e)=>{
    e.preventDefault();

    const dateRange = {
        InitialDate: search_form_reports.initialDate.value,
        FinalDate: search_form_reports.finalDate.value
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
        span_reports.innerHTML = '';
        
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

        reports.innerHTML = '';
        span_reports.innerHTML = '*Nenhuma compra dentro dessas datas';
        totalValueTh.innerHTML = '0';
    }
})

// -------------------------------------------------------------------------------------------------------

// - Registros -------------------------------------------------------------------------------------------

const btn_search_by_data_range_records = document.querySelector("#btn-search-by-data-range-records");

btn_search_by_data_range_records.addEventListener("click", async (e)=>{

    e.preventDefault();

    const dateRange = {
        InitialDate: search_form_records.initialDate.value,
        FinalDate: search_form_records.finalDate.value
    }

    const url = `https://localhost:7191/v1/LauraModas/BuyLogs/getLogsByDate`
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
    const logs = await res.json();

    if(logs.length != 0){

        records.innerHTML = '';
        span_records.innerHTML = '';

        logs.forEach(log => {
            const html = `
            <tr>
            <th>${log.customerName}</th>
            <th>${log.customerId}</th>
            <th>${log.paymentValue.toFixed(2)}</th>
            <th>${log.dateOfPayment}</th>
            <th>${log.nameOfProduct}</th>
          </tr>
        `

            records.innerHTML += html;
        });
    }
    else {
        records.innerHTML = '';
        span_records.innerHTML = '*Nenhum registro dentro dessas datas';
    }
})

// -------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------

// Controle de produtos --------------------------------------------------------------------------------------

const btn_create_lot = document.querySelector("#btn-create-lot-product");
const create_lot_form = document.querySelector("#create-form-product-control");

btn_create_lot.addEventListener("click", async (e) =>{
    e.preventDefault();

    const lot = {
        Category: create_lot_form.category.value,
        Quantity: create_lot_form.quantity.value,
        Value: create_lot_form.value.value
    }

    const url = `https://localhost:7191/v1/LauraModas/Lots/createLot`
    const token = localStorage.getItem("token")
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(lot)
    };
    
    const res = await fetch(url, opts);
    
    if(res.status == 200){
        alert("Lote de produtos cadastrado")

        window.location.href = "../Pages/Home.html"
    }
    else {
        alert(`Ops! Houve um erro ${res.message}`)
    };
});

// --------------------------------------------------------------------------------------------------------

const btn_clear_table_records = document.querySelector("#btn-clear-table-records");

btn_clear_table_records.addEventListener("click", (e)=>{

    e.preventDefault();

    records_modal.close();

})

const btn_clear_table_reports = document.querySelector("#btn-clear-table-reports")

btn_clear_table_reports.addEventListener("click", (e) =>{
    e.preventDefault();

    reports.innerHTML = '';
    totalValueTh.innerHTML = '';

    reports_modal.close();
});

const btn_close_product_control = document.querySelector("#btn-close-products-control");

btn_close_product_control.addEventListener("click", async (e)=>{

    e.preventDefault();

    productControl_modal.close();
})
