function loadAdminProducts() {
    const container = document.getElementById("adminProducts");

    let products = JSON.parse(localStorage.getItem("products")) || [];

    container.innerHTML = "";

    products.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
    <h3>${p.name}</h3>
    <p>${p.price}</p>
    <button class="btn" onclick="deleteProduct(${index})">Delete</button>
    `;

        container.appendChild(div);
    });
}

function addProduct() {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;
    const desc = document.getElementById("desc").value;

    if (!name || !price) {
        alert("Fill all fields!");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({ name, price, image, description: desc });

    localStorage.setItem("products", JSON.stringify(products));

    loadAdminProducts();

    alert("Product Added!");
}

function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    products.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(products));

    loadAdminProducts();
}

document.addEventListener("DOMContentLoaded", loadAdminProducts);