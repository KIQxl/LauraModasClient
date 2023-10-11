const modal_installments = document.querySelector("#show-installments");
const installment_form = document.querySelector("#installment-form");

async function DisplayInstallments(id){

    try{
        const url = `https://localhost:7191/v1/LauraModas/Installment/getInstallment/${id}`
        const token = localStorage.getItem("token")

        const opts = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const res = await fetch(url, opts);

        const installment = await res.json();

        showDataInstallment(installment);

    } catch(erro){
        alert(`Ops, houve um problema, tente novamente. - ${erro}`);
    }
    
}

function showDataInstallment(installment){

    modal_installments.showModal();

    installment_form.Id.value = installment.customerId;
    installment_form.Name.value = installment.customer.name;
    installment_form.Phone.value = installment.customer.phone;
    installment_form.NumberOfInstallments.value = installment.numberOfInstallments;
    installment_form.InstallmentValue.value = `R$ ${installment.installmentValue.toFixed(2)}`;
    installment_form.RemainingValue.value = `R$ ${installment.remainingValue.toFixed(2)}`;
    installment_form.TotalValue.value = `R$ ${installment.totalValue.toFixed(2)}`;
    installment_form.dateOfPayment.value = installment.dateOfPayment;
};

async function Parcel(){

    const customerId = installment_form.Id.value;
    const numberOfInstallments = installment_form.NumberOfInstallments.value;
    const dateOfPayment = installment_form.dateOfPayment.value;

    const createInstallment = {
        CustomerId: customerId,
        NumberOfInstallments: numberOfInstallments,
        DateOfPayment: dateOfPayment
    }

    const url = `https://localhost:7191/v1/LauraModas/Installment/parcel`
    const token = localStorage.getItem("token")

        const opts = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        const installmentView = await axios.post(url, createInstallment, opts);

        if(installmentView.status === 200){
            alert("Valor reparcelado com sucesso");
            window.location.href = "../Pages/Customers.html";
        }
        else {
            alert(`Ops! Houve um erro ${installmentView.status}`)
        }
};

async function Pay(){
    const customerId = installment_form.Id.value;

    const url = `https://localhost:7191/v1/LauraModas/Installment/pay/${customerId}`
    const token = localStorage.getItem("token")

        const opts = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

    const res = await axios.post(url,opts)

    if(res.status === 200){
        alert("Pagamento bem sucedido");
        window.location.href = "../Pages/Customers.html";
    }
    else {
        alert(`Ops! Houve um erro ${res.status}`)
    }
};

const btn_cancel_show_customer = document.querySelector("#btn-cancel-show-customers");

btn_cancel_show_customer.addEventListener("click", (e) =>{
    e.preventDefault();

    modal_installments.close();
})