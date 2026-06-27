/* MENU OPEN/CLOSE */
const menuBtn = document.getElementById("menu-btn");
const menuPanel = document.getElementById("menu-panel");
const closeBtn = document.getElementById("close-menu");

menuBtn.addEventListener("click", () => {
    menuPanel.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    menuPanel.classList.remove("open");
});

/* IP DATA LOADER */
async function loadIPData() {
    const ipBox = document.getElementById("ip-result");
    const locBox = document.getElementById("location-result");
    const ispBox = document.getElementById("isp-result");
    const asnBox = document.getElementById("asn-result");
    const tzBox = document.getElementById("timezone-result");

    try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        ipBox.textContent = data.ip || "Unknown";
        locBox.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
        ispBox.textContent = data.org || "Unknown";
        asnBox.textContent = data.asn || "Unknown";
        tzBox.textContent = data.timezone || "Unknown";

    } catch (err) {
        ipBox.textContent = "Error loading IP";
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", loadIPData);
