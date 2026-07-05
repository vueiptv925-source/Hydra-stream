import { providers, buildUrl } from './providers.js';
import { extractDirectVideo, cleanUrl } from './adBlocker.js';

// ذاكرة تخزين مؤقتة
const memoryCache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // ساعة واحدة

export const getStreams = async (params) => {
  const cacheKey = `${params.type}:${params.id}:${params.season}:${params.episode}`;

  // التحقق من الكاش
  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.sources;
    }
  }

  console.log(`🔄 جاري تجهيز المصادر لـ ${params.id}...`);

  // بناء الروابط مع محاولة استخراج الفيديو المباشر
  const sources = await Promise.all(
    providers.map(async (provider) => {
      const embedUrl = buildUrl(provider, params);
      
      // محاولة استخراج الفيديو المباشر
      let videoUrl = await extractDirectVideo(embedUrl);
      
      // تنظيف الرابط من معاملات التتبع
      videoUrl = cleanUrl(videoUrl);
      
      // تحديد نوع الرابط (مباشر أم تضمين)
      const isDirect = videoUrl !== embedUrl;
      const isM3u8 = videoUrl.includes('.m3u8');
      const isMp4 = videoUrl.includes('.mp4');
      
      let type = 'embed';
      let label = provider.label;
      
      if (isM3u8) {
        type = 'hls';
        label = `${provider.label} (مباشر HLS)`;
      } else if (isMp4) {
        type = 'mp4';
        label = `${provider.label} (مباشر MP4)`;
      } else if (isDirect) {
        type = 'direct';
        label = `${provider.label} (مباشر)`;
      }

      return {
        id: provider.id,
        label: label,
        url: videoUrl,
        embedUrl: embedUrl, // الرابط الأصلي كخيار احتياطي
        type: type, // embed / hls / mp4 / direct
        status: 'ready',
        adFree: isDirect // إذا كان مباشراً، فهو خالٍ من الإعلانات
      };
    })
  );

  // ترتيب المصادر: الخالية من الإعلانات أولاً
  const sortedSources = sources.sort((a, b) => {
    if (a.adFree && !b.adFree) return -1;
    if (!a.adFree && b.adFree) return 1;
    return 0;
  });

  // تخزين النتيجة في الكاش
  memoryCache.set(cacheKey, {
    timestamp: Date.now(),
    sources: sortedSources
  });

  console.log(`✅ تم تجهيز ${sources.length} مصدراً (${sortedSources.filter(s => s.adFree).length} خالية من الإعلانات)`);
  return sortedSources;
};
