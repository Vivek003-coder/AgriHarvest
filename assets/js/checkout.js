function placeOrder() {

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!name || !address) {
        alert("Fill all details");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        id: Date.now(),
        items: cart,
        name,
        address,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("✅ Order Placed!");
    window.location.href = "profile.html";
}