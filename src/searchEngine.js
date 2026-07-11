// ================================================================
// 🔍 محرك البحث - ترتيب ثابت + علامات العمل (✅ / ❌)
// ================================================================

import { providers, buildUrl } from './providers.js';

// ============================================================
// 1. اختبار المصدر (مهلة 800ms)
// ============================================================
const testSource = async (url) => {
  if (!url) return { isAlive: false, statusCode: null };
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 800);
    
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
// 2. البحث عن المصادر (ترتيب ثابت، بدون تغيير)
// ============================================================
export const searchSources = async (params) => {
  const { type, id, season, episode } = params;
  
  console.log(`⚡ اختبار المصادر (ترتيب ثابت) عن: ${id}`);

  // اختبار جميع المصادر بالتوازي
  const results = await Promise.all(
    providers.map(async (provider) => {
      let url = buildUrl(provider, { type, id, season, episode });
      
      if (!url && id.startsWith('tt')) {
        const numId = parseInt(id.replace('tt', ''));
        if (!isNaN(numId)) {
          url = buildUrl(provider, { type, id: numId, season, episode });
        }
      }
      
      const status = await testSource(url);
      
      return {
        provider: provider.id,
        label: provider.label,
        url: url || '#',
        id: id,
        isAlive: status.isAlive,
        statusCode: status.statusCode,
        // نحافظ على الترتيب الأصلي من providers.js
        originalIndex: providers.indexOf(provider)
      };
    })
  );

  // ترتيب حسب originalIndex (نفس الترتيب في providers.js)
  results.sort((a, b) => a.originalIndex - b.originalIndex);

  const aliveCount = results.filter(r => r.isAlive).length;
  console.log(`✅ ${aliveCount} مصدراً يعمل من أصل ${results.length}`);
  console.log(`📊 الترتيب النهائي (ثابت): ${results.map(r => r.provider).join(' → ')}`);

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

console.log('⚡ محرك البحث جاهز (ترتيب ثابت + علامات العمل)');
