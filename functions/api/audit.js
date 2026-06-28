export async function onRequest(context) {
    const request = context.request;
    const cfData = request.cf || {};
    
    const publicIp = request.headers.get("CF-Connecting-IP") || "Unknown Address";
    const city = cfData.city || "Cloudflare Edge";
    const country = cfData.country || "US";
    const asnOrg = cfData.asOrganization || "Private ISP Network";
    
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
