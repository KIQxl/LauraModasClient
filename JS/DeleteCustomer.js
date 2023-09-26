async function DeleteCustomer(id){
    
    const url = `https://localhost:7191/v1/LauraModas/Customers/deleteCustomer/${id}`
    const token = localStorage.getItem("token")
    const opts = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const res = await axios.delete(url, opts);

    if(res.status === 200){
        alert("Cliente deletado com sucesso!")
        window.location.href = "../Pages/Customers.html"
    } else {
        alert(`Houve um erro: ${res.data}`)
    }
}