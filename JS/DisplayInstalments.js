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

        showDataInstallment(installment)
    } catch(erro){
        alert(`Ops, houve um problema, tente novamente. - ${erro}`)
    }
    
}

function showDataInstallment(installment){

    modal_installments.showModal();

    installment_form.Id.value = installment.customerId;
    installment_form.Name.value = installment.customer.name;
    installment_form.Phone.value = installment.customer.phone;
    installment_form.NumberOfInstallments.value = installment.numberOfInstallments;
    installment_form.InstallmentValue.value = installment.installmentValue;
    installment_form.RemainingValue.value = installment.remainingValue;
    installment_form.TotalValue.value = installment.totalValue;

}

async function Parcel(){

    const customerId = installment_form.Id.value;
    const numberOfInstallments = installment_form.NumberOfInstallments.value;

    const createInstallment = {
        CustomerId: customerId,
        NumberOfInstallments: numberOfInstallments
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
}