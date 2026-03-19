document.addEventListener("DOMContentLoaded", () => {

    const authArea = document.getElementById("authArea");
    const user = localStorage.getItem("currentUser");

    // ===== AUTH =====
    if (authArea) {
        if (user) {
            authArea.innerHTML = `
        <div class="profile-menu" id="profileMenu">
          <img src="https://i.pravatar.cc/40?u=${user}">

          <div class="dropdown" id="dropdownMenu">
            <a href="#">👤 ${user}</a>
            <a href="admin.html">Dashboard</a>
            <a href="#" id="logoutBtn">Logout</a>
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

    // ===== LOGOUT =====
    document.addEventListener("click", (e) => {
        if (e.target.id === "logoutBtn") {
            localStorage.clear();
            location.reload();
        }
    });

    // ===== MENU =====
    const toggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (toggle && navbar) {
        toggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });
    }

    // ===== NOTIFICATION =====
    document.addEventListener("click", (e) => {
        const btn = document.getElementById("notifBtn");
        const menu = document.getElementById("notifMenu");

        if (btn && btn.contains(e.target)) {
            menu.classList.toggle("show");
        } else if (menu) {
            menu.classList.remove("show");
        }
    });

});