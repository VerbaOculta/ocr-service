const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const app = express();
const upload = multer();

app.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const buffer = req.file.buffer;

  const result = await Tesseract.recognize(buffer, 'eng', { logger: m => console.log(m) });

  res.json({ text: result.data.text });
});
