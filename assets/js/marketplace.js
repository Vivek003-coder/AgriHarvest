document.addEventListener("DOMContentLoaded", () => {

    const authArea = document.getElementById("authArea");
    const user = localStorage.getItem("currentUser");

    /* ================= AUTH UI ================= */
    if (authArea) {
        if (user) {
            authArea.innerHTML = `
                <div class="user-box">

                    <img src="https://i.pravatar.cc/40?u=${user}" 
                         class="user-img" 
                         id="userImg">

                    <div class="user-dropdown" id="userDropdown">
                        <p class="user-name">👤 ${user}</p>
                        <a href="profile.html">👤 Profile</a>
                        <a href="cart.html">🛒 My Cart</a>
                        <a href="admin.html">📊 Dashboard</a>
                        <a href="#" id="logoutBtn">🚪 Logout</a>
                    </div>

                </div>
            `;
        } else {
            authArea.innerHTML = `
                <a href="login.html" class="nav-btn">Login</a>
                <a href="signup.html" class="nav-btn signup">Signup</a>
            `;
        }
    }

    /* ================= LOGOUT ================= */
    document.addEventListener("click", (e) => {
        if (e.target.id === "logoutBtn") {
            localStorage.removeItem("currentUser");
            location.reload();
        }
    });

    /* ================= MOBILE MENU ================= */
    const toggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (toggle && navbar) {
        toggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    /* ================= DROPDOWNS ================= */
    document.addEventListener("click", (e) => {

        const userImg = document.getElementById("userImg");
        const userDropdown = document.getElementById("userDropdown");

        const notifBtn = document.getElementById("notifBtn");
        const notifMenu = document.getElementById("notifMenu");

        /* USER MENU */
        if (userImg && userImg.contains(e.target)) {
            userDropdown.classList.toggle("show");
        } else if (userDropdown && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove("show");
        }

        /* NOTIFICATION MENU */
        if (notifBtn && notifBtn.contains(e.target)) {
            notifMenu.classList.toggle("show");
        } else if (notifMenu && !notifMenu.contains(e.target)) {
            notifMenu.classList.remove("show");
        }
    });

    /* ================= CART ================= */
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartEl = document.getElementById("cartCount");

    function updateCartUI() {
        if (cartEl) cartEl.textContent = cart.length;
    }

    updateCartUI();

    /* BUY BUTTON FIX (IMPORTANT) */
    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            cart.push({ name, price });
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartUI();
            showToast("🛒 Added to cart");
        });
    });

    /* CART PAGE NAVIGATION */
    const cartBtn = document.getElementById("cartBtn");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }

    /* ================= TOAST ================= */
    function showToast(msg) {
        let toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = msg;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 100);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

});