const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const METABASE_URL = process.env.METABASE_URL || 'https://bi.starkoms.com';

app.use(cors({ origin: '*' }));
app.use(express.json());

// Health check
app.get('/', (req, res) => res.json({ status: 'ok', proxy: METABASE_URL }));

// Proxy genérico: reenvía cualquier ruta /api/* a Metabase
app.all('/api/*', async (req, res) => {
  const targetUrl = `${METABASE_URL}${req.path}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;

  try {
    const headers = { 'Content-Type': 'application/json' };
    if (req.headers['x-metabase-session']) {
      headers['X-Metabase-Session'] = req.headers['x-metabase-session'];
    }

    const fetchOptions = { method: req.method, headers };
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT} → ${METABASE_URL}`));
