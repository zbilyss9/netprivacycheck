document.addEventListener("DOMContentLoaded", () => {
    // Fire all tests asynchronously to prevent blocking mobile screens
    fetchNetworkData();
    calculateFingerprint();
    checkWebRTC();
    getLocalDeviceInfo();
});

// 1. NETWORK & CLOUDFLARE EDGE DATA
async function fetchNetworkData() {
    try {
        // You can fetch a free geolocation API or use a Cloudflare Worker
        const res = await fetch('https://ipapi.co');
        const data = await res.json();
        
        document.getElementById('public-ip').innerText = data.ip || "Unknown";
        document.getElementById('dns-country').innerText = `${data.city}, ${data.country_name}`;
        
        // Basic ASN VPN flagging logic
        const isVpn = data.org.toLowerCase().includes("hosting") || data.org.toLowerCase().includes("vpn");
        document.getElementById('vpn-status').innerText = isVpn ? "⚠️ VPN/Proxy Detected" : "🔒 Secure (Residential)";
        document.getElementById('connection-meta').innerText = `Provider: ${data.org}`;
    } catch (err) {
        document.getElementById('public-ip').innerText = "Failed to load";
    }
}

// 2. CLIENT-SIDE CANVAS FINGERPRINTING
function calculateFingerprint() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125,1,62,20);
        ctx.fillStyle = "#069";
        ctx.fillText("PrivacyShieldAudit", 2, 15);
        
        // Convert canvas image data to a quick hash string
        const b64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        let hash = 0;
        for (let i = 0; i < b64.length; i++) {
            hash = (hash << 5) - hash + b64.charCodeAt(i);
            hash |= 0;
        }
        document.getElementById('fingerprint').innerText = `ID: ${Math.abs(hash)}`;
    } catch (e) {
        document.getElementById('fingerprint').innerText = "Blocked / Failed";
    }
}

// 3. WEBRTC LEAK DETECTION
function checkWebRTC() {
    const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    if (!RTCPeerConnection) {
        document.getElementById('webrtc-block').innerText = "🔒 Blocked (Protected)";
        document.getElementById('webrtc-ip').innerText = "None Detected";
        return;
    }

    document.getElementById('webrtc-block').innerText = "⚠️ Exposed / Active";
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:://google.com" }] });
    pc.createDataChannel("");
    pc.createOffer().then(offer => pc.setLocalDescription(offer));
    pc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) return;
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9:]+)/gi;
        const ipAddress = ipRegex.exec(ice.candidate.candidate)[1];
        document.getElementById('webrtc-ip').innerText = ipAddress;
    };
}

// 4. DEVICE INFO METADATA
function getLocalDeviceInfo() {
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Cores` : "Unknown";
    document.getElementById('device-meta').innerText = `${screenRes} (${cores})`;
}
