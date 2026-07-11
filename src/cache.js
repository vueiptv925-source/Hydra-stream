// ================================================================
// 📦 نظام التخزين المؤقت - النسخة النهائية
// ================================================================

import { providers, buildUrl } from './providers.js';
import { getAdFreeVideo, getAdRemovalScript } from './advancedAdBlocker.js';
import { searchSources, searchAnime } from './searchEngine.js';

// ============================================================
// 📋 ذاكرة التخزين المؤقت
// ============================================================
const memoryCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // ساعة واحدة

// ============================================================
// 📋 دالة جلب المصادر مع التخزين المؤقت والبحث الديناميكي
// ============================================================
export const getStreams = async (params) => {
  const { type, id, season, episode } = params;
  const cacheKey = `${type}:${id}:${season}:${episode}`;

  // 1. التحقق من الكاش
  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      console.log(`✅ من الكاش: ${cacheKey}`);
      return entry.sources;
    }
  }

  console.log(`⚡ جاري البحث الديناميكي عن: ${id}`);

  let sources = [];

  // 2. البحث في جميع المصادر (أفلام ومسلسلات)
  if (type === 'movie' || type === 'tv') {
    const searchParams = { type, id, season, episode };
    const searchResults = await searchSources(searchParams);
    
    // 3. تطبيق نظام منع الإعلانات (17 طبقة)
    const processedResults = await Promise.all(
      searchResults.map(async (result) => {
        let adFreeUrl = result.url;
        let adFree = false;
        
        if (result.isAlive && result.url && result.url !== '#') {
          adFreeUrl = await getAdFreeVideo(result.url, result.provider);
          adFree = adFreeUrl !== result.url;
        }
        
        return {
          ...result,
          url: adFreeUrl || result.url,
          adFree: adFree,
          status: result.isAlive ? '✅ يعمل' : '❌ لا يعمل',
          // إضافة كود منع الإعلانات للعميل
          adRemovalScript: getAdRemovalScript()
        };
      })
    );
    
    sources = processedResults;
  }

  // 4. البحث عن أنمي
  if (type === 'anime' || (type === 'tv' && params.animeSource)) {
    const animeParams = { 
      id, 
      season, 
      episode, 
      language: params.language || 'sub',
      source: params.animeSource || 's-2'
    };
    const animeResult = await searchAnime(animeParams);
    if (animeResult) {
      const adFreeUrl = await getAdFreeVideo(animeResult.url, 'animeplay');
      sources.push({
        ...animeResult,
        url: adFreeUrl,
        adFree: adFreeUrl !== animeResult.url,
        status: '✅ يعمل',
        adRemovalScript: getAdRemovalScript()
      });
    }
  }

  // 5. خطة احتياطية (إذا لم نجد أي مصدر)
  if (sources.length === 0) {
    console.warn('⚠️ استخدام القائمة الاحتياطية');
    const allSources = providers.map((provider) => {
      const url = buildUrl(provider, params);
      return {
        provider: provider.id,
        label: provider.label,
        url: url || '#',
        id: id,
        type: 'embed',
        adFree: false,
        status: '⚠️ غير مختبر',
        isAlive: false,
        adRemovalScript: getAdRemovalScript()
      };
    });
    sources = allSources;
  }

  // 6. ترتيب النتائج (المصادر العاملة أولاً)
  sources.sort((a, b) => {
    if (a.isAlive && !b.isAlive) return -1;
    if (!a.isAlive && b.isAlive) return 1;
    // ثم حسب الأولوية (ترتيب المصادر في القائمة)
    const aIndex = providers.findIndex(p => p.id === a.provider);
    const bIndex = providers.findIndex(p => p.id === b.provider);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  // 7. تخزين النتيجة في الكاش
  memoryCache.set(cacheKey, {
    timestamp: Date.now(),
    sources: sources
  });

  const aliveCount = sources.filter(s => s.isAlive === true).length;
  console.log(`✅ ${aliveCount} مصدراً يعمل من أصل ${sources.length}`);
  
  return sources;
};

// ============================================================
// 📋 دالة تنظيف الكاش
// ============================================================
export const clearCache = () => {
  memoryCache.clear();
  console.log('🧹 تم تنظيف الكاش');
};

// ============================================================
// 📋 دالة حذف عنصر معين من الكاش
// ============================================================
export const removeFromCache = (key) => {
  if (memoryCache.has(key)) {
    memoryCache.delete(key);
    console.log(`🗑️ تم حذف ${key} من الكاش`);
    return true;
  }
  console.log(`⚠️ العنصر ${key} غير موجود في الكاش`);
  return false;
};

// ============================================================
// 📋 دالة الحصول على حجم الكاش
// ============================================================
export const getCacheSize = () => {
  return memoryCache.size;
};

// ============================================================
// 📋 دالة الحصول على جميع مفاتيح الكاش
// ============================================================
export const getCacheKeys = () => {
  return Array.from(memoryCache.keys());
};

console.log('📦 نظام التخزين المؤقت جاهز');
