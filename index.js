const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/ocr', upload.single('image'), (req, res) => {
  const imgPath = req.file.path;
  const outPath = `${imgPath}-out.txt`;

  exec(`tesseract ${imgPath} ${imgPath} -l spa`, (err) => {
    if (err) {
      return res.status(500).json({ error: 'OCR failed' });
    }

    fs.readFile(`${imgPath}.txt`, 'utf8', (err, data) => {
      fs.unlinkSync(imgPath);
      fs.unlinkSync(`${imgPath}.txt`);
      if (err) return res.status(500).json({ error: 'Read failed' });
      res.json({ text: data });
    });
  });
});

app.listen(3000, () => console.log('OCR API listening on port 3000'));
