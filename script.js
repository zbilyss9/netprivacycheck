const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeBtn = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
});
