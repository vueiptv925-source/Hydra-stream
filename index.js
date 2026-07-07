import express from 'express';
import cors from 'cors';
import { getStreams, clearCache } from './src/cache.js';
import { searchSources } from './src/searchEngine.js';

const app = express();
app.use(cors());
app.use(express.json());

// ============================================================
// نقاط النهاية الأساسية
// ============================================================

// الصحة
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', service: 'HydraStream' });
});

// جلب المصادر (مع البحث التلقائي)
app.get('/api/stream', async (req, res) => {
  const { type, id, season, episode, language, animeSource } = req.query;

  if (!type || !id) {
    return res.status(400).json({
      success: false,
      error: 'type و id مطلوبان',
      example: '/api/stream?type=movie&id=tt1375666'
    });
  }

  const params = {
    type,
    id,
    season: season || '1',
    episode: episode || '1',
    language: language || 'sub',
    animeSource: animeSource || 's-2'
  };

  try {
    const sources = await getStreams(params);
    res.json({
      success: true,
      params,
      total: sources.length,
      sources
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================
// نقاط نهاية إضافية (البحث والتطوير)
// ============================================================

// البحث المباشر (بدون كاش)
app.post('/api/search', async (req, res) => {
  const { type, id, season, episode } = req.body;
  
  if (!type || !id) {
    return res.status(400).json({ error: 'type و id مطلوبان' });
  }

  try {
    const params = { type, id, season: season || '1', episode: episode || '1' };
    const results = await searchSources(params);
    res.json({ success: true, results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// تنظيف الكاش
app.post('/api/clear-cache', (req, res) => {
  clearCache();
  res.json({ success: true, message: 'تم تنظيف الكاش' });
});

// الجذر
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'HydraStream is running',
    endpoints: {
      health: '/api/health',
      stream: '/api/stream?type=movie&id=tt1375666',
      search: '/api/search (POST)',
      clearCache: '/api/clear-cache (POST)'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ HydraStream running on port ${PORT}`);
  console.log(`🔍 نظام البحث التلقائي ومنع الإعلانات يعمل`);
});
