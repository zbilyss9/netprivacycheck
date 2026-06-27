// DESIGN MODE — NO FUNCTIONALITY

function initDesignPlaceholders() {
    const ids = [
        'public-ip', 'webrtc-ip', 'dns-country', 'fingerprint',
        'vpn-status', 'device-meta', 'connection-meta',
        'security-headers', 'doh-status', 'webrtc-block', 'summary'
    ];

    ids.forEach(id => {
        document.getElementById(id).innerText = "Waiting...";
    });
}

initDesignPlaceholders();
