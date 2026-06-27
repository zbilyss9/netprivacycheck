console.log("NetPrivacyCheck loaded.");

// Simple module loader (future‑proof)
async function loadModule(name) {
    try {
        const module = await import(`./assets/scripts/${name}.js`);
        module.run();
    } catch (err) {
        console.warn(`Module ${name} not found or not ready.`);
    }
}

// Example: auto‑load modules when user clicks a card
document.querySelectorAll(".tool-card").forEach(card => {
    card.addEventListener("click", () => {
        const toolName = card.querySelector("h2").innerText
            .toLowerCase()
            .replace(" ", "")
            .replace("test", "");

        loadModule(toolName);
    });
});
