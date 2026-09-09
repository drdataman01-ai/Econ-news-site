/* ------------------------------------------------------------------
   Cloudflare Worker: Finnhub quote proxy

   Purpose: your site's browser-side JS (watchlist.js) calls THIS
   worker instead of Finnhub directly. The worker attaches the real
   Finnhub API key server-side (as a Cloudflare "secret", never
   visible in any code you deploy) and forwards the request. The
   browser — and anyone using view-source or the Network tab on your
   site — only ever sees this worker's URL, never the actual key.

   SETUP (one-time):
   1. Sign up free at https://dash.cloudflare.com/sign-up
   2. In the Cloudflare dashboard, go to Workers & Pages > Create >
      Create Worker. Give it a name, e.g. "kuonomics-quote-proxy".
   3. Replace the default starter code with everything in this file,
      then click Deploy.
   4. Set your Finnhub key as a SECRET (not a plain variable) so it
      never shows up in the dashboard UI after you save it:
        - In the worker's settings, go to Settings > Variables and
          Secrets > Add.
        - Name: FINNHUB_API_KEY
        - Value: your actual Finnhub key
        - Type: make sure it's set to "Secret", not "Text" — this
          encrypts it and hides it from view after saving.
   5. After deploying, Cloudflare gives you a URL like:
        https://kuonomics-quote-proxy.YOUR-SUBDOMAIN.workers.dev
      Copy that — you'll paste it into watchlist.js next.
   6. Update ALLOWED_ORIGIN below to your actual site's URL before
      deploying, so only your site can use this worker.
------------------------------------------------------------------- */

const ALLOWED_ORIGIN = 'https://kuonomics.com'; // <-- change if your live URL differs

function corsHeaders(){
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

export default {
  async fetch(request, env){
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS'){
      return new Response(null, { headers: corsHeaders() });
    }

    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol');

    // Basic validation — stock symbols are short and alphanumeric
    // (this also blocks someone trying to abuse this endpoint to
    // proxy arbitrary requests through your Finnhub key)
    if (!symbol || !/^[A-Za-z0-9.\-]{1,10}$/.test(symbol)){
      return new Response(JSON.stringify({ error: 'Invalid or missing symbol' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    if (!env.FINNHUB_API_KEY){
      return new Response(JSON.stringify({ error: 'Server not configured: missing API key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }

    const finnhubUrl = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${env.FINNHUB_API_KEY}`;

    try {
      const finnhubRes = await fetch(finnhubUrl);
      const data = await finnhubRes.json();
      return new Response(JSON.stringify(data), {
        status: finnhubRes.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30', // light caching — reduces calls if multiple visitors load the same symbol within 30s
          ...corsHeaders()
        }
      });
    } catch(e){
      return new Response(JSON.stringify({ error: 'Upstream request failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }
  }
};
