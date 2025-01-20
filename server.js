const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // لتقديم الملفات الثابتة من مجلد "public"

// نقطة نهاية لتوليد QR Code
app.post('/generate', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: '   enter url to create QR Code' });
  }

  try {
    const qrCodeData = await QRCode.toDataURL(text); // توليد QR Code كصورة Base64
    res.json({ qrCode: qrCodeData });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء توليد QR Code' });
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
