export async function onRequest(context) {
    const request = context.request;
    const cf = request.cf; // Access Cloudflare Edge geolocation data blocks

    // Parse network parameters natively directly from edge headers
    const publicIp = request.headers.get("cf-connecting-ip") || "Unknown Address";
    const city = cf ? cf.city : "Unknown City";
    const country = cf ? cf.country : "UN";
    const asnOrg = cf ? cf.asOrganization : "Unknown Provider";
    
    // Evaluate if network metadata maps back to database hosting lines
    const orgLower = asnOrg.toLowerCase();
    const isVpn = orgLower.includes("vpn") || orgLower.includes("hosting") || orgLower.includes("servers") || orgLower.includes("datacenter");

    const payload = {
        ip: publicIp,
        location: `${city}, ${country}`,
        provider: asnOrg,
        vpnStatus: isVpn ? "⚠️ VPN Connection Active" : "❌ Leak (Residential IP)"
    };

    return new Response(JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
}
