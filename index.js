const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const TOKEN = 'ISI_TOKEN_LU';
const PHONE_ID = 'ISI_PHONE_ID_LU';
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'skyline123') {
    res.send(req.query['hub.challenge']);
  } else res.sendStatus(403);
});
app.post('/webhook', async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (msg) {
    const from = msg.from;
    const text = (msg.text?.body || '').toLowerCase();
    let reply = '';
    if (text.includes('1 bulan')) {
      reply = 'Siap Bang! Mau beli AM Premium 1 Bulan Rp 5.000 ya?\n\nBoleh kirim datanya Bang, format gini aja:\nNama:\nEmail AM:\n\nNanti gw kirimin nomor pembayaran + cara bayarnya ya Bang';
    } else if (text.includes('1 tahun')) {
      reply = 'Siap Bang! Mau beli AM Premium 1 Tahun Rp 10.000 ya? Paling worth it ini Bang!\n\nBoleh kirim datanya Bang, format gini aja:\nNama:\nEmail AM:\n\nNanti gw kirimin nomor pembayaran + cara bayarnya ya Bang';
    } else if (text.includes('tanya')) {
      reply = 'Halo Bang! Santai aja, tanya-tanya dulu boleh banget\n\nMau tanya apa nih Bang?\n1. Beda 1 Bulan sama 1 Tahun apa?\n2. Cara bayarnya gimana?\n3. Garansinya gimana?';
    }
    if (reply) {
      await axios.post(`https://graph.facebook.com/v21.0/${PHONE_ID}/messages`, {
        messaging_product: 'whatsapp',
        to: from,
        text: { body: reply }
      }, { headers: { Authorization: `Bearer ${TOKEN}` } });
    }
  }
  res.sendStatus(200);
});
app.listen(3000, () => console.log('Bot jalan'));
