import { providers, buildUrl } from './providers.js';

// دالة لاختبار مصدر واحد
const testSource = async (provider, params) => {
  const url = buildUrl(provider, params);
  const startTime = Date.now();
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(5000) // مهلة 5 ثوانٍ
    });
    const latency = Date.now() - startTime;
    // يعتبر ناجحاً إذا كان الرد 200 أو 302 أو 403 (بعض المواقع تمنع HEAD)
    const isSuccess = [200, 302, 403].includes(response.status);
    return {
      ...provider,
      url,
      status: isSuccess ? 'ready' : 'unavailable',
      latency: isSuccess ? latency : null,
      error: isSuccess ? null : `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      ...provider,
      url,
      status: 'unavailable',
      latency: null,
      error: error.message || 'Timeout or network error'
    };
  }
};

// ذاكرة تخزين مؤقتة
const memoryCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 دقائق (لتجديد المصادر بانتظام)

export const getStreams = async (params) => {
  const cacheKey = `${params.type}:${params.id}:${params.season}:${params.episode}`;

  // 1. التحقق من الكاش
  if (memoryCache.has(cacheKey)) {
    const entry = memoryCache.get(cacheKey);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      console.log(`✅ من الكاش: ${cacheKey} (${entry.sources.filter(s => s.status === 'ready').length} مصدر جاهز)`);
      return entry.sources;
    }
  }

  console.log(`🔄 جاري اختبار المصادر لـ ${cacheKey}...`);

  // 2. اختبار جميع المصادر بالتوازي
  const testPromises = providers.map(provider => testSource(provider, params));
  const results = await Promise.all(testPromises);

  // 3. ترتيب النتائج: المصادر الجاهزة أولاً، ثم غير المتاحة
  const sortedResults = results.sort((a, b) => {
    if (a.status === 'ready' && b.status !== 'ready') return -1;
    if (a.status !== 'ready' && b.status === 'ready') return 1;
    return 0;
  });

  // 4. تخزين النتيجة في الكاش
  memoryCache.set(cacheKey, {
    timestamp: Date.now(),
    sources: sortedResults
  });

  const readyCount = sortedResults.filter(s => s.status === 'ready').length;
  console.log(`✅ تم اختبار المصادر: ${readyCount}/${providers.length} مصدر جاهز`);
  return sortedResults;
};
