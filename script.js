async function fetchIPData() {
    try {
        const response = await fetch('https://ipapi.co');
        const data = await response.json();
        
        document.getElementById('public-ip').innerText = `${data.ip} (${data.org})`;
        document.getElementById('dns-country').innerText = `${data.city}, ${data.region}, ${data.country_name}`;
    } catch (error) {
        document.getElementById('public-ip').innerText = "Failed to detect IP";
        document.getElementById('dns-country').innerText = "Failed to route location";
    }
}

function testWebRTC() {
    const webrtcElement = document.getElementById('webrtc-ip');
    
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    
    if (!window.RTCPeerConnection) {
        webrtcElement.innerText = "Not Supported by Browser (Secure)";
        return;
    }

    const rtc = new RTCPeerConnection({ iceServers: [{ urls: "stun:://google.com" }] });
    rtc.createDataChannel(""); 
    
    rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
    
    rtc.onicecandidate = (ice) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
            if (webrtcElement.innerText === "Scanning Browser...") {
                webrtcElement.innerText = "No WebRTC Leak Detected";
            }
            return;
        }
        
        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9:]+)/gi;
        const candidate = ice.candidate.candidate;
        const ipAddresses = candidate.match(ipRegex);

        if (ipAddresses) {
            ipAddresses.forEach(ip => {
                if (ip.includes('.') || ip.includes(':')) {
                    webrtcElement.innerText = ip;
                }
            });
        }
    };
}

fetchIPData();
testWebRTC();
