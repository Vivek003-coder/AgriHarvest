document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");
  const overlay = document.getElementById("overlay");
  const authArea = document.getElementById("authArea");

  const user = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");

  // ===== ROLE PROTECTION =====
  const path = window.location.pathname;
  if (path.includes("admin.html") && role !== "admin") {
    alert("Access Denied 🚫");
    window.location.href = "../index.html";
  }

  // ===== AUTH UI =====
  if (authArea) {
    if (user) {
      authArea.innerHTML = `
        <div class="profile-menu" id="profileMenu">
          <img src="https://i.pravatar.cc/40?u=${user}" alt="profile">

          <div class="dropdown" id="dropdownMenu">
            <a href="#">👤 ${user} ${role === "admin" ? "👑" : ""}</a>

            ${role === "admin"
          ? `<a href="pages/admin.html">📊 Admin Panel</a>`
          : `<a href="pages/profile.html">Profile</a>`
        }

            <a href="#" id="logoutBtn">🚪 Logout</a>
          </div>
        </div>
      `;
    } else {
      authArea.innerHTML = `
        <a href="pages/login.html" class="nav-btn">Login</a>
        <a href="pages/signup.html" class="nav-btn signup">Signup</a>
      `;
    }
  }

  // ===== GLOBAL CLICK HANDLER =====
  document.addEventListener("click", (e) => {

    // 🔓 LOGOUT
    if (e.target.id === "logoutBtn") {
      localStorage.clear();
      location.reload();
    }

    // 👤 PROFILE DROPDOWN
    const profile = document.getElementById("profileMenu");
    const dropdown = document.getElementById("dropdownMenu");

    if (profile && dropdown) {
      if (profile.contains(e.target)) {
        dropdown.classList.toggle("show");
      } else {
        dropdown.classList.remove("show");
      }
    }

    // 🔔 NOTIFICATION
    const notifBtn = document.getElementById("notifBtn");
    const notifMenu = document.getElementById("notifMenu");

    if (notifBtn && notifMenu) {
      if (notifBtn.contains(e.target)) {
        notifMenu.classList.toggle("show");
      } else {
        notifMenu.classList.remove("show");
      }
    }
  });

  // ===== NAVBAR TOGGLE =====
  if (toggle && navbar && overlay) {
    toggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    });

    document.querySelectorAll(".navbar a").forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
      });
    });
  }

  // ===== SCROLL REVEAL =====
  const cards = document.querySelectorAll(".card");

  function reveal() {
    cards.forEach(card => {
      const top = card.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) {
        card.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal();

  // ===== FAKE LOADING =====
  setTimeout(() => {
    const container = document.getElementById("cardContainer");

    if (container) {
      container.innerHTML = `
        <div class="card">
          <h3>🌱 Soil Advisory</h3>
          <p>Smart fertilizer recommendations.</p>
        </div>

        <div class="card">
          <h3>🌦 Weather Alerts</h3>
          <p>Real-time weather insights.</p>
        </div>

        <div class="card">
          <h3>🐛 Pest Detection</h3>
          <p>Identify diseases instantly.</p>
        </div>
      `;
    }
  }, 1500);

});

// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "0.5s";
    setTimeout(() => loader.remove(), 500);
  }
});

// ===== NAVBAR SHRINK =====
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");

  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// ===== NAV INDICATOR =====
const navLinks = document.querySelectorAll(".navbar a");
const indicator = document.createElement("div");
indicator.classList.add("nav-indicator");

const navbar = document.querySelector(".navbar");
if (navbar) navbar.appendChild(indicator);

function moveIndicator(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = navbar.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = rect.left - parentRect.left + "px";
}

// default active
const activeLink = document.querySelector(".navbar a.active");
if (activeLink) moveIndicator(activeLink);

// hover effect
navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => moveIndicator(link));
});



document.querySelector('.footer-top a').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
document.querySelectorAll('.footer a').forEach(link => {
  link.addEventListener('click', () => {
    link.style.opacity = "0.6";
    setTimeout(() => {
      link.style.opacity = "1";
    }, 200);
  });
});
document.querySelectorAll('.footer a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') {
      e.preventDefault();
      alert("Page coming soon 🚀");
    }
  });
});

const socket = io("http://localhost:5000");

const notifMenu = document.getElementById("notifMenu");

// receive notification
socket.on("notification", (msg) => {
  const p = document.createElement("p");
  p.textContent = msg;

  notifMenu.prepend(p);

  // optional: show popup
  alert(msg);
});

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("🛒 Added to cart");
}

document.addEventListener("click", (e) => {

  const img = document.getElementById("userImg");
  const dropdown = document.getElementById("userDropdown");

  if (img && img.contains(e.target)) {
    dropdown.classList.toggle("show");
  } else if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("show");
  }

});
