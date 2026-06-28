let lastScroll = 0;
const compactHeader = document.getElementById("compactHeader");

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > lastScroll && current > 10) {
        // scrolling DOWN → show compact header
        compactHeader.classList.add("visible");
    } else {
        // scrolling UP → hide compact header
        compactHeader.classList.remove("visible");
    }

    lastScroll = current;
});
