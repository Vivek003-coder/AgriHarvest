/* ================= LOGIN ================= */
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const remember = document.getElementById("rememberMe").checked;
    const error = document.getElementById("error");

    if (!username || !password) {
        error.innerText = "⚠️ Please fill all fields";
        return;
    }

    let role = "user";

    const savedUser = localStorage.getItem("registeredUser");
    const savedPass = localStorage.getItem("registeredPass");

    if (username === "vk" && password === "123") {
        role = "admin";
    }
    else if (username === savedUser && password === savedPass) {
        role = "user";
    }
    else {
        error.innerText = "❌ Invalid username or password";
        return;
    }

    // SAVE
    localStorage.setItem("currentUser", username);
    localStorage.setItem("role", role);

    if (remember) {
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.removeItem("isLoggedIn");
    } else {
        sessionStorage.setItem("isLoggedIn", "true");
        localStorage.removeItem("isLoggedIn");
    }

    // REDIRECT SAFE
    redirectUser(role);
}


/* ================= SIGNUP ================= */
function signup() {
    const user = document.getElementById("newUser").value.trim();
    const pass = document.getElementById("newPass").value.trim();
    const msg = document.getElementById("msg");

    if (!user || !pass) {
        msg.innerText = "⚠️ Fill all fields";
        return;
    }

    localStorage.setItem("registeredUser", user);
    localStorage.setItem("registeredPass", pass);

    msg.innerText = "✅ Account created! Now login";
}


/* ================= FORGOT PASSWORD ================= */
function forgotPassword() {
    const user = prompt("Enter your username:");

    const savedUser = localStorage.getItem("registeredUser");
    const savedPass = localStorage.getItem("registeredPass");

    if (user === savedUser) {
        alert("🔐 Your password is: " + savedPass);
    } else {
        alert("❌ User not found!");
    }
}


/* ================= AUTO LOGIN ================= */
window.addEventListener("load", () => {
    const localLogin = localStorage.getItem("isLoggedIn");
    const sessionLogin = sessionStorage.getItem("isLoggedIn");

    if (localLogin === "true" || sessionLogin === "true") {
        const role = localStorage.getItem("role");

        // ONLY redirect from login/signup pages
        const path = window.location.pathname;

        if (path.includes("login.html") || path.includes("signup.html")) {
            redirectUser(role);
        }
    }
});


/* ================= PAGE PROTECTION ================= */
function protectPage(requiredRole = null) {
    const user = localStorage.getItem("currentUser");
    const role = localStorage.getItem("role");

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (requiredRole && role !== requiredRole) {
        alert("⛔ Access denied");
        window.location.href = "../index.html";
    }
}


/* ================= REDIRECT FUNCTION ================= */
function redirectUser(role) {
    if (role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "../index.html";
    }
}


/* ================= LOGOUT ================= */
function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isLoggedIn");

    window.location.href = "../index.html";
}

/* ================= RENDER USER UI ================= */
function renderUserUI() {
    const authArea = document.getElementById("authArea");
    const user = localStorage.getItem("currentUser");

    if (!authArea) return;

    if (user) {
        authArea.innerHTML = `
        <div class="user-box">

        <img src="https://i.pravatar.cc/40?u=${user}" 
            class="user-img" 
            id="userImg">

            <div class="user-dropdown" id="userDropdown">

            <div class="user-header">
                <img src="https://i.pravatar.cc/50?u=${user}">
                <div>
                <strong>${user}</strong>
                <p class="sub">Welcome back 👋</p>
                </div>
            </div>

            <a href="profile.html">👤 Profile</a>
            <a href="cart.html">🛒 My Cart</a>
            <a href="#">⚙️ Settings</a>
            <a href="#">🔔 Notifications</a>
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