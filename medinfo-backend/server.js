const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const User = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Python API'ye istek için

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/medinfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// İlaç modeli
export const DrugSchema = new mongoose.Schema({
  drug_name: String,
  brand_names: [String],
  active_ingredients: [String],
  excipients: [String],
  indications: String,
  dosage: String,
  side_effects: {
    common: [String],
    rare: [String],
  },
  contraindications: [String],
  drug_interactions: [String],
  prescription_status: String,
  warnings: [String],
  special_populations: {
    pregnancy: String,
    pediatric: String,
    elderly: String,
  },
  leaflet_pdf_url: String,
  source_links: [String],
  image_confidence_score: Number,
  symptomes: [String],
});
const Drug = mongoose.model('Drug', DrugSchema);

// Yeni ilaç ekleme
app.post('/api/drugs', async (req, res) => {
  try {
    const drug = new Drug(req.body);
    await drug.save();
    res.json(drug);
  } catch (err) {
    res.status(400).json({ error: 'Kayıt başarısız.' });
  }
});

// Tüm ilaçları listeleme
app.get('/api/drugs', async (req, res) => {
  const drugs = await Drug.find();
  res.json(drugs);
});

// Kayıt
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hash });
    res.json({ success: true, user: { username: user.username } });
  } catch (err) {
    res.status(400).json({ error: 'Kullanıcı adı zaten var.' });
  }
});

// Giriş
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Kullanıcı bulunamadı.' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Şifre yanlış.' });
  const token = jwt.sign({ username }, 'SECRET_KEY');
  res.json({ success: true, token, user: { username } });
});

// Fotoğrafla arama (gerçek model)
app.post('/api/drugs/photo', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Dosya yok' });

    // Dosyayı Python API'ye gönder
    const response = await axios.post('http://localhost:6000/predict', file.buffer, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });

    const predictedDrugName = response.data.drug_name;

    // MongoDB'den ilacı getir
    const drug = await Drug.findOne({ drug_name: predictedDrugName });
    if (!drug) return res.status(404).json({ error: 'İlaç bulunamadı' });

    res.json(drug);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

app.listen(5000, () => console.log('API running on http://localhost:5000'));
