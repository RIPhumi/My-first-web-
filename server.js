const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual Discord webhook URL
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1358647203111108618/1STfJwglobS2Yl1FOou4D-6rZZRRGGPBDRV7SP9YhddrI_8YzImKsTXsr2bgxTLOQSsl';

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `New visitor IP: ${ip}` })
    });
  } catch (error) {
    console.error('Failed to send IP to Discord:', error);
  }

  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
