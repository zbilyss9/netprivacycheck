const menuBtn = document.getElementById("menu-btn");
const menuPanel = document.getElementById("menu-panel");
const closeBtn = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
    menuPanel.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    menuPanel.classList.remove("open");
});
