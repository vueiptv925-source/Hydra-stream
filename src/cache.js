// ================================================================
// 📦 التخزين المؤقت - دمج البحث والترتيب ومنع الإعلانات
// ================================================================

import { providers, buildUrl } from './providers.js';
import { getAdFreeVideo } from './advancedAdBlocker.js';
import { searchSources, searchAnime } from './searchEngine.js';

const memoryCache = new Map();
const CACHE_TTL = 2 * 60 * 60 * 1000; // ساعتين

export const getStreams = async (params) => {
  const { type, id, season, episode } = params;
  const cacheKey = `${type}:${id}:${season}:${episode}`;

  // التحقق من الكاش
  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      console.log(`✅ من الكاش: ${cacheKey}`);
      return entry.sources;
    }
  }

  console.log(`🔄 جاري البحث والترتيب ومنع الإعلانات عن: ${id}`);

  let sources = [];

  // البحث في جميع المصادر (أفلام ومسلسلات)
  if (type === 'movie' || type === 'tv') {
    const searchParams = { type, id, season, episode };
    const searchResults = await searchSources(searchParams);
    
    // تطبيق منع الإعلانات مع الحفاظ على الترتيب
    const processedResults = await Promise.all(
      searchResults.map(async (result) => {
        // محاولة إزالة الإعلانات فقط للمصادر الحية
        let adFreeUrl = result.url;
        let adFree = false;
        
        if (result.isAlive) {
          adFreeUrl = await getAdFreeVideo(result.url, result.provider);
          adFree = adFreeUrl !== result.url;
        }
        
        return {
          ...result,
          url: adFreeUrl,
          adFree: adFree,
          status: result.isAlive ? '✅ يعمل' : '❌ لا يعمل'
        };
      })
    );
    
    sources = processedResults;
  }

  // البحث عن أنمي
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
        status: '✅ يعمل'
      });
    }
  }

  // خطة احتياطية (إذا لم نجد أي مصدر)
  if (sources.length === 0) {
    console.warn('⚠️ استخدام القائمة الاحتياطية');
    const allSources = providers.map((provider) => {
      const url = buildUrl(provider, params);
      return {
        provider: provider.id,
        label: provider.label,
        url: url,
        id: id,
        type: 'embed',
        adFree: false,
        status: '⚠️ غير مختبر',
        isAlive: false
      };
    });
    sources = allSources;
  }

  // ترتيب نهائي
  sources.sort((a, b) => {
    // المصادر الحية أولاً
    if (a.isAlive && !b.isAlive) return -1;
    if (!a.isAlive && b.isAlive) return 1;
    // ثم حسب الأولوية
    return (a.priority || 999) - (b.priority || 999);
  });

  // تخزين في الكاش
  memoryCache.set(cacheKey, {
    timestamp: Date.now(),
    sources: sources
  });

  const aliveCount = sources.filter(s => s.isAlive).length;
  console.log(`✅ ${aliveCount} مصدراً يعمل من أصل ${sources.length}`);
  return sources;
};

export const clearCache = () => {
  memoryCache.clear();
  console.log('🧹 تم تنظيف الكاش');
};
