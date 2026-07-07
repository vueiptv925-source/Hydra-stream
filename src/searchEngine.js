// ================================================================
// 🔍 محرك البحث التلقائي - نسخة سريعة
// ================================================================

import { providers, buildUrl } from './providers.js';

// ============================================================
// 1. اختبار المصدر بسرعة (مهلة 1.5 ثانية فقط)
// ============================================================
const testSource = async (url) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5 ثانية فقط
    
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok || response.status === 403 || response.status === 302;
  } catch {
    return false;
  }
};

// ============================================================
// 2. البحث في المصادر بالتوازي (أسرع)
// ============================================================
export const searchSources = async (params) => {
  const { type, id, season, episode } = params;
  const searchIds = generateSearchIds(id);
  
  console.log(`🔍 بحث سريع عن: ${id}`);

  // نأخذ فقط أول 5 مصادر (لتسريع البحث)
  const topProviders = providers
    .filter(p => p.id !== 'animeplay')
    .slice(0, 8); // نقتصر على 8 مصادر فقط لضمان السرعة

  // تشغيل جميع الاختبارات بالتوازي
  const results = await Promise.all(
    topProviders.map(async (provider) => {
      // تجربة أول معرف فقط (نتجاوز الباقي للسرعة)
      const searchId = searchIds[0] || id;
      const testParams = { type, id: searchId, season, episode };
      const url = buildUrl(provider, testParams);
      if (!url) return null;
      
      const isValid = await testSource(url);
      if (isValid) {
        return {
          provider: provider.id,
          label: provider.label,
          url: url,
          id: searchId,
          type: 'embed',
          quality: 'auto'
        };
      }
      return null;
    })
  );

  // تصفية النتائج الفارغة
  const validResults = results.filter(r => r !== null);
  
  // ترتيب حسب الأولوية
  const priorityOrder = ['vidsrc.pm', 'moviesapi', 'vidcore', 'vidsrc.to', 'vidsrc.me'];
  validResults.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a.provider);
    const bIndex = priorityOrder.indexOf(b.provider);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  console.log(`✅ تم العثور على ${validResults.length} مصدراً (سريع)`);
  return validResults;
};

// ============================================================
// 3. توليد معرفات بحث (مبسطة للسرعة)
// ============================================================
const generateSearchIds = (id) => {
  const ids = [id];
  // فقط نحاول التحويل إذا كان id يبدأ بـ tt
  if (id.startsWith('tt')) {
    const num = id.replace('tt', '');
    if (!isNaN(num)) {
      ids.push(parseInt(num));
    }
  }
  return ids;
};

// ============================================================
// 4. البحث عن أنمي (سريع)
// ============================================================
export const searchAnime = async (params) => {
  const { id, season, episode, language = 'sub', source = 's-2' } = params;
  
  try {
    const animeProvider = providers.find(p => p.id === 'animeplay');
    if (!animeProvider) return null;
    
    const url = animeProvider.buildUrl({
      type: 'tv',
      id: id,
      season: season,
      episode: episode,
      animeSource: source,
      language: language
    });
    
    if (!url) return null;
    
    const isValid = await testSource(url);
    if (isValid) {
      return {
        provider: 'animeplay',
        label: 'AnimePlay.cfd',
        url: url,
        id: id,
        type: 'anime',
        quality: 'auto',
        language: language
      };
    }
  } catch (e) {
    // تجاهل الأخطاء
  }
  return null;
};
