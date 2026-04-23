let orders = JSON.parse(localStorage.getItem("orders")) || [];

const container = document.getElementById("orders");

if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet</p>";
} else {
    orders.forEach(order => {
        container.innerHTML += `
      <div class="order">
        <h3>Order ID: ${order.id}</h3>
        <p>${order.date}</p>

        ${order.items.map(i => `<p>${i.name} - ₹${i.price}</p>`).join("")}

        <hr>
      </div>
    `;
    });
}