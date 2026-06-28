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
