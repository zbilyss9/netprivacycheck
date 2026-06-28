// DESIGN MODE — NO FUNCTIONALITY

function initDesignPlaceholders() {
    const ids = [
        'public-ip', 'dns-country', 'vpn-status', 'connection-meta',
        'webrtc-ip', 'webrtc-block', 'fingerprint', 'device-meta',
        'security-headers', 'doh-status', 'summary'
    ];

    ids.forEach(id => {
        document.getElementById(id).innerText = "Waiting...";
    });
}

initDesignPlaceholders();


// ⭐ SAFE COMPACT HEADER — DOES NOT HIDE TOOLS ⭐

let lastScroll = 0;
const compactHeader = document.getElementById("compactHeader");

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > lastScroll && current > 5) {
        // scrolling DOWN → show compact header
        compactHeader.classList.add("visible");
    } else {
        // scrolling UP → hide compact header
        compactHeader.classList.remove("visible");
    }

    lastScroll = current;
});
