export async function onRequest(context) {
    const request = context.request;
    
    // Fallback safe parameter mapping using official Cloudflare serverless properties
    const cfData = request.cf || {};
    
    // Read the client properties cleanly from the secure network layer
    const publicIp = request.headers.get("CF-Connecting-IP") || "Unknown Address";
    const city = cfData.city || "Cloudflare Edge";
    const country = cfData.country || "US";
    const asnOrg = cfData.asOrganization || "Private ISP Network";
    
    // Standard secure logic to identify network relays and routing nodes
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
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store, no-cache, must-revalidate"
        }
    });
}
