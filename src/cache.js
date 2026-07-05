import { providers, buildUrl } from './providers.js';
import { extractDirectVideo } from './adBlocker.js';

const memoryCache = new Map();
const CACHE_TTL = 60 * 60 * 1000;

export const getStreams = async (params) => {
  const cacheKey = `${params.type}:${params.id}:${params.season}:${params.episode}`;

  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.sources;
    }
  }

  console.log(`🔄 جاري تجهيز المصادر لـ ${params.id}...`);

  const sources = await Promise.all(
    providers.map(async (provider) => {
      const embedUrl = buildUrl(provider, params);
      
      // محاولة سريعة لاستخراج الفيديو المباشر (بحد أقصى 1.5 ثانية)
      const videoUrl = await extractDirectVideo(embedUrl);
      
      return {
        id: provider.id,
        label: videoUrl !== embedUrl ? `${provider.label} (مباشر)` : provider.label,
        url: videoUrl,
        embedUrl: embedUrl,
        status: 'ready',
        adFree: videoUrl !== embedUrl // إذا اختلف الرابط، فهذا يعني أنه مباشر
      };
    })
  );

  // ترتيب المصادر: الخالية من الإعلانات أولاً
  const sortedSources = sources.sort((a, b) => {
    if (a.adFree && !b.adFree) return -1;
    if (!a.adFree && b.adFree) return 1;
    return 0;
  });

  memoryCache.set(cacheKey, {
    timestamp: Date.now(),
    sources: sortedSources
  });

  console.log(`✅ تم تجهيز ${sources.length} مصدراً (${sortedSources.filter(s => s.adFree).length} خالية من الإعلانات)`);
  return sortedSources;
};
