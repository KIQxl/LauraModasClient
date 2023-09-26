async function DeleteBuy(id){

    const url = `https://localhost:7191/v1/LauraModas/Buys/deleteBuy/${id}`;
    const token = localStorage.getItem("token")
    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios.delete(url, opts);

    if(res.status === 200){

        alert("Compra deletada com sucesso!")
        window.location.href = "../Pages/Buys.html"
    } else {
        alert(`Houve um erro: ${res.data}`)
    }
}

// function DeleteBuyQuest(id){
//     const popup = document.querySelector("#delete-buy-dialog");

//     popup.showModal();

//     return id;
// }