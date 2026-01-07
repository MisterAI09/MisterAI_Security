// Vercel / Next.js API route (Node) — proxies streams to http://135.125.109.73:9000
// يدعم Range و preflight OPTIONS و يمرّر الجسم chunk-by-chunk إلى المستعرض
export default async function handler(req, res) {
  // Allow CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range,Accept,Origin,If-Modified-Since,Cache-Control,Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { path } = req.query; // [...path] => array of path segments
    const joined = Array.isArray(path) ? path.join('/') : String(path || '');
    // build upstream URL
    const upstreamUrl = `http://135.125.109.73:9000/${joined}`;

    // forward Range header if present (important for HLS .ts segment requests)
    const forwardHeaders = {};
    if (req.headers.range) forwardHeaders['range'] = req.headers.range;
    // forward User-Agent or Origin if needed:
    if (req.headers['user-agent']) forwardHeaders['user-agent'] = req.headers['user-agent'];
    if (req.headers.origin) forwardHeaders['origin'] = req.headers.origin;

    const upstreamRes = await fetch(upstreamUrl, {
      method: 'GET',
      headers: forwardHeaders,
      // don't follow > default is fine; timeout handled by Vercel runtime
    });

    // copy selected headers from upstream to client
    const copyHeaders = ['content-type', 'content-length', 'accept-ranges', 'content-range', 'cache-control'];
    copyHeaders.forEach((h) => {
      const v = upstreamRes.headers.get(h);
      if (v) res.setHeader(h, v);
    });

    // set status same as upstream (200 or 206 for partial content)
    res.status(upstreamRes.status);

    // stream the upstream body to the response chunk-by-chunk
    const reader = upstreamRes.body?.getReader?.();
    if (!reader) {
      // fallback: read whole body
      const buf = Buffer.from(await upstreamRes.arrayBuffer());
      res.end(buf);
      return;
    }

    // stream loop
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // value is a Uint8Array
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (err) {
    console.error('Stream proxy error:', err);
    // generic error
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(502).end('Bad Gateway: failed to proxy stream');
  }
}
