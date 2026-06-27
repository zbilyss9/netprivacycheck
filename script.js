// DESIGN MODE — NO FUNCTIONALITY

function initDesignPlaceholders() {
    document.getElementById('public-ip').innerText = "Waiting...";
    document.getElementById('webrtc-ip').innerText = "Waiting...";
    document.getElementById('dns-country').innerText = "Waiting...";
    document.getElementById('fingerprint').innerText = "Waiting...";
    document.getElementById('vpn-status').innerText = "Waiting...";
    document.getElementById('device-meta').innerText = "Waiting...";
    document.getElementById('connection-meta').innerText = "Waiting...";
    document.getElementById('security-headers').innerText = "Waiting...";
    document.getElementById('doh-status').innerText = "Waiting...";
    document.getElementById('webrtc-block').innerText = "Waiting...";
    document.getElementById('summary').innerText = "Waiting...";
}

initDesignPlaceholders();
