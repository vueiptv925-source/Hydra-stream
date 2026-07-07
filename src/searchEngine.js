// ================================================================
// 🔍 محرك البحث والترتيب - إظهار جميع المصادر (23)
// ================================================================

import { providers, buildUrl } from './providers.js';

// ============================================================
// 1. اختبار المصدر
// ============================================================
const testSource = async (url) => {
  if (!url) return { isAlive: false, statusCode: null };
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const response = await fetch(url, {
      method: 'HEAD',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return { 
      isAlive: response.ok || response.status === 403 || response.status === 302,
      statusCode: response.status 
    };
  } catch {
    return { isAlive: false, statusCode: null };
  }
};

// ============================================================
// 2. البحث وترتيب جميع المصادر - إظهار الكل
// ============================================================
export const searchSources = async (params) => {
  const { type, id, season, episode } = params;
  
  console.log(`🔍 جاري اختبار جميع المصادر (23) عن: ${id}`);

  // اختبار جميع المصادر بدون استثناء
  const results = await Promise.all(
    providers.map(async (provider) => {
      // محاولة بناء الرابط
      let url = buildUrl(provider, { type, id, season, episode });
      
      // إذا فشل بناء الرابط، نحاول مع معرفات بديلة
      if (!url && id.startsWith('tt')) {
        const numId = parseInt(id.replace('tt', ''));
        if (!isNaN(numId)) {
          url = buildUrl(provider, { type, id: numId, season, episode });
        }
      }
      
      // اختبار المصدر (فقط إذا كان الرابط موجوداً)
      let status = { isAlive: false, statusCode: null };
      if (url) {
        status = await testSource(url);
      }
      
      // نعيد المصدر دائماً (حتى لو الرابط فارغ)
      return {
        provider: provider.id,
        label: provider.label,
        url: url || '#', // رابط افتراضي إذا كان فارغاً
        id: id,
        type: 'embed',
        isAlive: status.isAlive,
        statusCode: status.statusCode,
        hasValidUrl: !!url
      };
    })
  );

  // ============================================================
  // الترتيب: يعمل أولاً، ثم حسب الأولوية
  // ============================================================
  const priorityOrder = [
    'vidsrc.pm', 'moviesapi', 'vidcore', 'vidsrc.to', 'vidsrc.me',
    'vidsrc.mov', 'videasy', 'vidsrc.wiki', 'vidsrc.sbs', 'streamvaultsrc',
    'vidsrc.top', 'vidsrc.ru', 'vidfast.vc', 'cinemaos', '111movies',
    'vidzee', 'vidnest', 'cinesrc', 'wavembed', 'apiplayer',
    'vidzen', 'vidphantom', 'animeplay'
  ];

  results.sort((a, b) => {
    // المصادر التي تعمل أولاً
    if (a.isAlive && !b.isAlive) return -1;
    if (!a.isAlive && b.isAlive) return 1;
    
    // ثم حسب الأولوية
    const aIndex = priorityOrder.indexOf(a.provider);
    const bIndex = priorityOrder.indexOf(b.provider);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const aliveCount = results.filter(r => r.isAlive).length;
  console.log(`✅ ${aliveCount} مصدراً يعمل من أصل ${results.length}`);
  
  return results;
};

// ============================================================
// 3. البحث عن أنمي
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
    
    const status = await testSource(url);
    if (status.isAlive) {
      return {
        provider: 'animeplay',
        label: 'AnimePlay.cfd',
        url: url,
        id: id,
        type: 'anime',
        language: language,
        isAlive: true,
        statusCode: status.statusCode
      };
    }
  } catch (e) {}
  return null;
};

console.log('🔍 محرك البحث جاهز (يظهر جميع المصادر)');
