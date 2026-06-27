// FAQ toggle
document.querySelectorAll('.faq-item h3').forEach(item => {
  item.addEventListener('click', () => {
    item.parentElement.classList.toggle('open');
  });
});

// Mock IP data for preview
document.getElementById('ip-value').textContent = "203.0.113.42";
document.getElementById('ip-location').textContent = "Athens, Greece";
document.getElementById('ip-isp').textContent = "Example ISP";

// MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
