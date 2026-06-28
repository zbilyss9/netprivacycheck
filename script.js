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


// ⭐ ADDED: COMPACT HEADER SCROLL LOGIC ⭐
let lastScroll = 0;
const compactHeader = document.getElementById("compactHeader");

window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current < lastScroll && current > 80) {
        // scrolling UP → show compact header
        compactHeader.classList.add("visible");
    } else {
        // scrolling DOWN → hide compact header
        compactHeader.classList.remove("visible");
    }

    lastScroll = current;
});
// ⭐ END OF ADDED CODE ⭐
