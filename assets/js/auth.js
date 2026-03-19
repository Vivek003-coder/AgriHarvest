// ===== LOGIN =====
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("rememberMe").checked;
    const error = document.getElementById("error");

    if (!username || !password) {
        error.innerText = "Please fill all fields";
        return;
    }

    // 🔥 DEMO USERS (ROLE BASED)
    let role = "user";

    if (username === "vk" && password === "123") {
        role = "admin";
    }

    // SAVE LOGIN
    localStorage.setItem("currentUser", username);
    localStorage.setItem("role", role);

    if (remember) {
        localStorage.setItem("isLoggedIn", "true");
    } else {
        sessionStorage.setItem("isLoggedIn", "true");
    }

    // 🔥 REDIRECT BASED ON ROLE
    if (role === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "../index.html";
    }
}

// ===== SIGNUP =====
function signup() {
    const user = document.getElementById("newUser").value;
    const pass = document.getElementById("newPass").value;
    const msg = document.getElementById("msg");

    if (!user || !pass) {
        msg.innerText = "Fill all fields";
        return;
    }

    localStorage.setItem("registeredUser", user);
    localStorage.setItem("registeredPass", pass);

    msg.innerText = "Account created! Go to login";
}

// ===== FORGOT PASSWORD =====
function forgotPassword() {
    const user = prompt("Enter your username:");

    const savedUser = localStorage.getItem("registeredUser");
    const savedPass = localStorage.getItem("registeredPass");

    if (user === savedUser) {
        alert("Your password is: " + savedPass);
    } else {
        alert("User not found!");
    }
}

// ===== AUTO LOGIN =====
window.addEventListener("load", () => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (loggedIn === "true") {
        const role = localStorage.getItem("role");

        if (role === "admin") {
            window.location.href = "admin.html";
        }
    }
});